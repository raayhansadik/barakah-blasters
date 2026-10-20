/**
 * Barakah Blasters - Web Audio SFX Engine
 * Synthesizes pure procedural cricket audio effects without external asset dependencies.
 */

class CricketAudioEngine {
  constructor() {
    this.ctx = null;
    this.isMuted = localStorage.getItem('bb_sound_muted') === 'true';
    this.initialized = false;
  }

  init() {
    if (this.initialized) return;
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.initialized = true;
    } catch (e) {
      console.warn('Web Audio API not supported in this browser.', e);
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    localStorage.setItem('bb_sound_muted', this.isMuted);
    return this.isMuted;
  }

  /**
   * Procedurally synthesizes a crisp willow cricket bat hitting a leather ball ("THWACK!")
   */
  playBatStrike() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;

    // 1. Wood Impact transient (Thud)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(320, t);
    osc.frequency.exponentialRampToValueAtTime(70, t + 0.08);

    gain.gain.setValueAtTime(0.7, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.12);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.12);

    // 2. Leather & Willow "Crack" high snap (Noise burst)
    const bufferSize = this.ctx.sampleRate * 0.06;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(2400, t);
    filter.Q.setValueAtTime(3.5, t);

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.85, t);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, t + 0.06);

    noise.connect(filter);
    filter.connect(noiseGain);
    noiseGain.connect(this.ctx.destination);

    noise.start(t);
    noise.stop(t + 0.06);

    // Trigger subtle visual stadium shockwave
    this.triggerShockwave();
  }

  /**
   * Procedural crowd celebration roar swell
   */
  playCheer() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;
    const dur = 1.4;

    const bufferSize = Math.floor(this.ctx.sampleRate * dur);
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(450, t);
    filter.frequency.linearRampToValueAtTime(1400, t + 0.5);
    filter.frequency.exponentialRampToValueAtTime(350, t + dur);

    const cheerGain = this.ctx.createGain();
    cheerGain.gain.setValueAtTime(0.01, t);
    cheerGain.gain.linearRampToValueAtTime(0.28, t + 0.4);
    cheerGain.gain.exponentialRampToValueAtTime(0.001, t + dur);

    noise.connect(filter);
    filter.connect(cheerGain);
    cheerGain.connect(this.ctx.destination);

    noise.start(t);
    noise.stop(t + dur);
  }

  /**
   * UI Click feedback
   */
  playClick() {
    if (this.isMuted) return;
    this.init();
    if (!this.ctx) return;
    if (this.ctx.state === 'suspended') this.ctx.resume();

    const t = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, t);
    osc.frequency.exponentialRampToValueAtTime(400, t + 0.04);

    gain.gain.setValueAtTime(0.15, t);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(t);
    osc.stop(t + 0.04);
  }

  triggerShockwave() {
    const pulse = document.createElement('div');
    pulse.style.position = 'fixed';
    pulse.style.inset = '0';
    pulse.style.pointerEvents = 'none';
    pulse.style.zIndex = '9999';
    pulse.style.boxShadow = 'inset 0 0 80px rgba(245, 158, 11, 0.45)';
    pulse.style.transition = 'opacity 0.4s ease-out';
    pulse.style.opacity = '1';
    document.body.appendChild(pulse);

    setTimeout(() => {
      pulse.style.opacity = '0';
      setTimeout(() => pulse.remove(), 400);
    }, 50);
  }
}

window.soundEngine = new CricketAudioEngine();
