// Native Web Audio API Sound & Haptic Feedback Engine for AnuragOS
// Zero external file dependencies, ultra-low latency, tactile retro & mechanical feel

type SoundListener = (enabled: boolean) => void;

class SoundManager {
  private ctx: AudioContext | null = null;
  private soundEnabled: boolean = true;
  private listeners: Set<SoundListener> = new Set();

  constructor() {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('anuragos_sound');
      if (saved !== null) {
        this.soundEnabled = saved === 'true';
      }
    }
  }

  private getContext(): AudioContext | null {
    if (typeof window === 'undefined') return null;
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }
    return this.ctx;
  }

  // Trigger subtle mobile haptic feedback if supported
  private triggerHaptic(pattern: number | number[] = 12) {
    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate(pattern);
      } catch {}
    }
  }

  public isEnabled(): boolean {
    return this.soundEnabled;
  }

  public setEnabled(enabled: boolean) {
    this.soundEnabled = enabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('anuragos_sound', String(enabled));
    }
    this.notify();
  }

  public toggle(): boolean {
    this.soundEnabled = !this.soundEnabled;
    if (typeof window !== 'undefined') {
      localStorage.setItem('anuragos_sound', String(this.soundEnabled));
    }
    if (this.soundEnabled) {
      this.playClick();
    }
    this.notify();
    return this.soundEnabled;
  }

  public subscribe(fn: SoundListener): () => void {
    this.listeners.add(fn);
    return () => this.listeners.delete(fn);
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.soundEnabled));
  }

  // 1. Tactile Mechanical Switch Click (Crisp click + bottom-out thud)
  public playClick() {
    if (!this.soundEnabled) return;
    this.triggerHaptic(14);
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const t = ctx.currentTime;

      // Click snap (high freq sweep)
      const clickOsc = ctx.createOscillator();
      const clickGain = ctx.createGain();
      clickOsc.type = 'sine';
      clickOsc.frequency.setValueAtTime(1400, t);
      clickOsc.frequency.exponentialRampToValueAtTime(450, t + 0.025);

      clickGain.gain.setValueAtTime(0.09, t);
      clickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.025);

      clickOsc.connect(clickGain);
      clickGain.connect(ctx.destination);

      clickOsc.start(t);
      clickOsc.stop(t + 0.03);

      // Key bottom-out body thud
      const thudOsc = ctx.createOscillator();
      const thudGain = ctx.createGain();
      thudOsc.type = 'triangle';
      thudOsc.frequency.setValueAtTime(130, t);
      thudOsc.frequency.exponentialRampToValueAtTime(55, t + 0.04);

      thudGain.gain.setValueAtTime(0.06, t);
      thudGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

      thudOsc.connect(thudGain);
      thudGain.connect(ctx.destination);

      thudOsc.start(t);
      thudOsc.stop(t + 0.045);
    } catch {}
  }

  // 2. Terminal Keystroke Typing Sound (Acoustic mechanical key with frequency jitter)
  public playKey() {
    if (!this.soundEnabled) return;
    this.triggerHaptic(8);
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const t = ctx.currentTime;
      const freq = 680 + (Math.random() - 0.5) * 240;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(180, t + 0.022);

      gain.gain.setValueAtTime(0.04, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.022);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.025);
    } catch {}
  }

  // 3. Smooth Window Open Whoosh
  public playOpen() {
    if (!this.soundEnabled) return;
    this.triggerHaptic([15, 25, 15]);
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const t = ctx.currentTime;

      // Resonant sweep whoosh
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(180, t);
      osc.frequency.exponentialRampToValueAtTime(920, t + 0.12);

      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.13);
    } catch {}
  }

  // 4. Smooth Window Close Whoosh
  public playClose() {
    if (!this.soundEnabled) return;
    this.triggerHaptic(12);
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const t = ctx.currentTime;

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(750, t);
      osc.frequency.exponentialRampToValueAtTime(140, t + 0.1);

      gain.gain.setValueAtTime(0.07, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.11);
    } catch {}
  }

  // 5. Success Chime Chord (Harmonious chime on match or verification)
  public playSuccess() {
    if (!this.soundEnabled) return;
    this.triggerHaptic([20, 50, 20]);
    try {
      const ctx = this.getContext();
      if (!ctx) return;

      const t = ctx.currentTime;
      const chord = [523.25, 659.25, 783.99, 1046.5]; // C5, E5, G5, C6

      chord.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, t + idx * 0.07);

        gain.gain.setValueAtTime(0.07, t + idx * 0.07);
        gain.gain.exponentialRampToValueAtTime(0.001, t + idx * 0.07 + 0.35);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(t + idx * 0.07);
        osc.stop(t + idx * 0.07 + 0.38);
      });
    } catch {}
  }
}

export const sound = new SoundManager();
