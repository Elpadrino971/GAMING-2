import { loadSettings } from './storage';

// Sound effect URLs (using Web Audio API with simple tones)
class SoundManager {
  private audioContext: AudioContext | null = null;
  private sounds: Map<string, AudioBuffer> = new Map();

  constructor() {
    if (typeof window !== 'undefined') {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
  }

  // Generate simple tones for sound effects
  private createTone(frequency: number, duration: number, type: OscillatorType = 'sine'): AudioBuffer {
    if (!this.audioContext) return null as any;

    const sampleRate = this.audioContext.sampleRate;
    const buffer = this.audioContext.createBuffer(1, sampleRate * duration, sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < buffer.length; i++) {
      const t = i / sampleRate;
      const envelope = Math.exp(-3 * t); // Decay envelope

      if (type === 'sine') {
        data[i] = Math.sin(2 * Math.PI * frequency * t) * envelope;
      } else if (type === 'square') {
        data[i] = (Math.sin(2 * Math.PI * frequency * t) > 0 ? 1 : -1) * envelope;
      } else if (type === 'triangle') {
        data[i] = (2 / Math.PI) * Math.asin(Math.sin(2 * Math.PI * frequency * t)) * envelope;
      }

      data[i] *= 0.3; // Volume adjustment
    }

    return buffer;
  }

  // Initialize sound effects
  init() {
    if (!this.audioContext) return;

    // Click sound - short beep
    this.sounds.set('click', this.createTone(800, 0.05, 'sine'));

    // Success sound - ascending tones
    const successBuffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.3, this.audioContext.sampleRate);
    const successData = successBuffer.getChannelData(0);
    for (let i = 0; i < successBuffer.length; i++) {
      const t = i / this.audioContext.sampleRate;
      const freq = 400 + (t * 1000); // Rising pitch
      const envelope = Math.exp(-5 * t);
      successData[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.3;
    }
    this.sounds.set('success', successBuffer);

    // Error sound - descending tones
    const errorBuffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.2, this.audioContext.sampleRate);
    const errorData = errorBuffer.getChannelData(0);
    for (let i = 0; i < errorBuffer.length; i++) {
      const t = i / this.audioContext.sampleRate;
      const freq = 400 - (t * 300); // Falling pitch
      const envelope = Math.exp(-8 * t);
      errorData[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.3;
    }
    this.sounds.set('error', errorBuffer);

    // Combo sound - exciting trill
    const comboBuffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.4, this.audioContext.sampleRate);
    const comboData = comboBuffer.getChannelData(0);
    for (let i = 0; i < comboBuffer.length; i++) {
      const t = i / this.audioContext.sampleRate;
      const freq = 600 + Math.sin(t * 40) * 200; // Oscillating pitch
      const envelope = Math.exp(-3 * t);
      comboData[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.4;
    }
    this.sounds.set('combo', comboBuffer);

    // Achievement sound - fanfare
    const achievementBuffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.6, this.audioContext.sampleRate);
    const achievementData = achievementBuffer.getChannelData(0);
    for (let i = 0; i < achievementBuffer.length; i++) {
      const t = i / this.audioContext.sampleRate;
      const freq = 500 + (t < 0.3 ? t * 600 : 0); // Rising then steady
      const envelope = Math.exp(-2 * t);
      achievementData[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.35;
    }
    this.sounds.set('achievement', achievementBuffer);

    // Level up sound
    const levelUpBuffer = this.audioContext.createBuffer(1, this.audioContext.sampleRate * 0.5, this.audioContext.sampleRate);
    const levelUpData = levelUpBuffer.getChannelData(0);
    for (let i = 0; i < levelUpBuffer.length; i++) {
      const t = i / this.audioContext.sampleRate;
      const freq = 300 + (t * 1200); // Fast rising
      const envelope = Math.exp(-4 * t);
      levelUpData[i] = Math.sin(2 * Math.PI * freq * t) * envelope * 0.35;
    }
    this.sounds.set('levelup', levelUpBuffer);

    // Notification sound
    this.sounds.set('notification', this.createTone(1000, 0.1, 'sine'));
  }

  // Play a sound effect
  play(soundName: string) {
    const settings = loadSettings();
    if (!settings.soundEnabled || !this.audioContext) return;

    const buffer = this.sounds.get(soundName);
    if (!buffer) return;

    const source = this.audioContext.createBufferSource();
    source.buffer = buffer;
    source.connect(this.audioContext.destination);
    source.start(0);
  }

  // Play multiple sounds in sequence
  playSequence(sounds: string[], delay: number = 0.1) {
    sounds.forEach((sound, index) => {
      setTimeout(() => this.play(sound), index * delay * 1000);
    });
  }
}

// Singleton instance
export const soundManager = new SoundManager();

// Initialize on first user interaction
let initialized = false;
export const initSounds = () => {
  if (!initialized && typeof window !== 'undefined') {
    soundManager.init();
    initialized = true;
  }
};

// Sound effect helpers
export const playClick = () => soundManager.play('click');
export const playSuccess = () => soundManager.play('success');
export const playError = () => soundManager.play('error');
export const playCombo = () => soundManager.play('combo');
export const playAchievement = () => soundManager.play('achievement');
export const playLevelUp = () => soundManager.play('levelup');
export const playNotification = () => soundManager.play('notification');
