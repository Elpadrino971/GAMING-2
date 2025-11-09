import { API_CONFIG, API_ERRORS, type ApiResponse } from './config';

// API Client Class
class ApiClient {
  private baseURL: string;
  private timeout: number;
  private token: string | null = null;

  constructor() {
    this.baseURL = API_CONFIG.BASE_URL;
    this.timeout = API_CONFIG.TIMEOUT;
    this.loadToken();
  }

  // Token management
  private loadToken(): void {
    this.token = localStorage.getItem('auth_token');
  }

  setToken(token: string): void {
    this.token = token;
    localStorage.setItem('auth_token', token);
  }

  clearToken(): void {
    this.token = null;
    localStorage.removeItem('auth_token');
  }

  // Request helper
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<ApiResponse<T>> {
    const url = `${this.baseURL}${endpoint}`;

    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }

    const config: RequestInit = {
      ...options,
      headers,
    };

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        ...config,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        return this.handleError(response);
      }

      const data = await response.json();
      return {
        success: true,
        data,
        meta: {
          timestamp: Date.now(),
          requestId: response.headers.get('X-Request-ID') || '',
        },
      };
    } catch (error) {
      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          return {
            success: false,
            error: {
              code: API_ERRORS.TIMEOUT,
              message: 'Request timeout',
            },
          };
        }
      }

      return {
        success: false,
        error: {
          code: API_ERRORS.NETWORK_ERROR,
          message: 'Network error occurred',
          details: error,
        },
      };
    }
  }

  private async handleError(response: Response): Promise<ApiResponse> {
    let errorData;
    try {
      errorData = await response.json();
    } catch {
      errorData = { message: response.statusText };
    }

    const errorCode = this.getErrorCode(response.status);

    return {
      success: false,
      error: {
        code: errorCode,
        message: errorData.message || 'An error occurred',
        details: errorData,
      },
    };
  }

  private getErrorCode(status: number): string {
    switch (status) {
      case 401:
        return API_ERRORS.UNAUTHORIZED;
      case 403:
        return API_ERRORS.FORBIDDEN;
      case 404:
        return API_ERRORS.NOT_FOUND;
      case 422:
        return API_ERRORS.VALIDATION_ERROR;
      case 429:
        return API_ERRORS.RATE_LIMIT;
      case 500:
      case 502:
      case 503:
        return API_ERRORS.SERVER_ERROR;
      default:
        return API_ERRORS.SERVER_ERROR;
    }
  }

  // HTTP Methods
  async get<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'GET' });
  }

  async post<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  }

  async put<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PUT',
      body: JSON.stringify(data),
    });
  }

  async patch<T>(endpoint: string, data?: any): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(data),
    });
  }

  async delete<T>(endpoint: string): Promise<ApiResponse<T>> {
    return this.request<T>(endpoint, { method: 'DELETE' });
  }

  // Retry logic
  async retryRequest<T>(
    requestFn: () => Promise<ApiResponse<T>>,
    attempts: number = API_CONFIG.RETRY_ATTEMPTS
  ): Promise<ApiResponse<T>> {
    for (let i = 0; i < attempts; i++) {
      const response = await requestFn();

      if (response.success || i === attempts - 1) {
        return response;
      }

      // Exponential backoff
      await new Promise(resolve =>
        setTimeout(resolve, API_CONFIG.RETRY_DELAY * Math.pow(2, i))
      );
    }

    return {
      success: false,
      error: {
        code: API_ERRORS.SERVER_ERROR,
        message: 'Max retry attempts exceeded',
      },
    };
  }
}

// Singleton instance
export const apiClient = new ApiClient();
