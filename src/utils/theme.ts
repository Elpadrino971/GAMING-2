export type Theme = 'light' | 'dark' | 'auto';

const THEME_KEY = 'truthbattle_theme';

export const getTheme = (): Theme => {
  if (typeof window === 'undefined') return 'dark';

  const saved = localStorage.getItem(THEME_KEY) as Theme;
  if (saved) return saved;

  // Default to dark
  return 'dark';
};

export const setTheme = (theme: Theme) => {
  localStorage.setItem(THEME_KEY, theme);
  applyTheme(theme);
};

export const applyTheme = (theme: Theme) => {
  if (typeof window === 'undefined') return;

  const root = document.documentElement;

  // Determine actual theme (resolve 'auto')
  let actualTheme = theme;
  if (theme === 'auto') {
    actualTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  // Apply theme
  if (actualTheme === 'light') {
    root.classList.remove('dark');
    root.classList.add('light');
    root.style.setProperty('--bg-primary', '#ffffff');
    root.style.setProperty('--bg-secondary', '#f3f4f6');
    root.style.setProperty('--text-primary', '#111827');
    root.style.setProperty('--text-secondary', '#6b7280');
  } else {
    root.classList.remove('light');
    root.classList.add('dark');
    root.style.setProperty('--bg-primary', '#0f172a');
    root.style.setProperty('--bg-secondary', '#1e293b');
    root.style.setProperty('--text-primary', '#f8fafc');
    root.style.setProperty('--text-secondary', '#94a3b8');
  }
};

// Initialize theme on load
export const initTheme = () => {
  const theme = getTheme();
  applyTheme(theme);

  // Listen for system theme changes when in auto mode
  if (theme === 'auto') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
      applyTheme('auto');
    });
  }
};
