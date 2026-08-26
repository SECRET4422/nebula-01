/**
 * Procedural Web Audio Synthesizer Engine
 * Generates bespoke spatial micro-frequencies, harmonic drones, and interactive sound design
 * with zero external audio assets. Strictly opt-in (muted by default).
 */

class AudioSynthEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private listeners: ((muted: boolean) => void)[] = [];
  private droneOsc1: OscillatorNode | null = null;
  private droneOsc2: OscillatorNode | null = null;
  private droneGain: GainNode | null = null;
  private droneFilter: BiquadFilterNode | null = null;

  constructor() {
    // Audio remains strictly muted by default
    this.isMuted = true;
  }

  private initContext() {
    if (!this.ctx && typeof window !== 'undefined') {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    this.notify();

    if (!this.isMuted) {
      this.startAmbientDrone();
      this.playChime();
    } else {
      this.stopAmbientDrone();
    }

    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public subscribe(cb: (muted: boolean) => void) {
    this.listeners.push(cb);
    return () => {
      this.listeners = this.listeners.filter((l) => l !== cb);
    };
  }

  private notify() {
    this.listeners.forEach((cb) => cb(this.isMuted));
  }

  /**
   * Ambient generative drone that responds to scroll position
   */
  private startAmbientDrone() {
    if (this.isMuted || !this.ctx) return;
    try {
      if (this.droneOsc1) return;

      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const filter = this.ctx.createBiquadFilter();
      const gain = this.ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(55, this.ctx.currentTime); // A1 note

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(110.5, this.ctx.currentTime); // A2 slight detune

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(280, this.ctx.currentTime);
      filter.Q.setValueAtTime(4.0, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.035, this.ctx.currentTime + 2.0);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start();
      osc2.start();

      this.droneOsc1 = osc1;
      this.droneOsc2 = osc2;
      this.droneFilter = filter;
      this.droneGain = gain;
    } catch {
      // AudioContext policy fallback
    }
  }

  private stopAmbientDrone() {
    if (this.droneGain && this.ctx) {
      try {
        this.droneGain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          this.droneOsc1?.stop();
          this.droneOsc2?.stop();
          this.droneOsc1?.disconnect();
          this.droneOsc2?.disconnect();
          this.droneOsc1 = null;
          this.droneOsc2 = null;
          this.droneFilter = null;
          this.droneGain = null;
        }, 600);
      } catch {
        this.droneOsc1 = null;
        this.droneOsc2 = null;
      }
    }
  }

  /**
   * Modulate drone harmonics based on scroll progress (0.0 to 1.0)
   */
  public updateScrollAcoustics(progress: number) {
    if (this.isMuted || !this.ctx || !this.droneFilter || !this.droneOsc1) return;
    try {
      const targetFreq = 180 + progress * 420;
      this.droneFilter.frequency.setTargetAtTime(targetFreq, this.ctx.currentTime, 0.2);
      
      const basePitch = 55 + Math.sin(progress * Math.PI) * 15;
      this.droneOsc1.frequency.setTargetAtTime(basePitch, this.ctx.currentTime, 0.2);
    } catch {
      // Ignore audio glitch
    }
  }

  /**
   * High-frequency tactile micro-tick for UI hover
   */
  public playHover() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      const filter = this.ctx.createBiquadFilter();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(2400, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.04);

      filter.type = 'highpass';
      filter.frequency.setValueAtTime(1200, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.025, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.04);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.045);
    } catch {
      // Ignore
    }
  }

  /**
   * Resonant low-frequency pulse for click events
   */
  public playClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(160, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.12);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.13);
    } catch {
      // Ignore
    }
  }

  /**
   * Harmonious chime for success or milestone triggers
   */
  public playChime() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const freqs = [523.25, 659.25, 783.99, 1046.5]; // C Major chord
      freqs.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime + idx * 0.06);

        gain.gain.setValueAtTime(0.0001, this.ctx.currentTime + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.03, this.ctx.currentTime + idx * 0.06 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + idx * 0.06 + 0.6);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(this.ctx.currentTime + idx * 0.06);
        osc.stop(this.ctx.currentTime + idx * 0.06 + 0.65);
      });
    } catch {
      // Ignore
    }
  }
}

export const audioSynth = new AudioSynthEngine();
