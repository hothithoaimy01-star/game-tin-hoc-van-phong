/**
 * Sound & Music Synthesizer Engine using Web Audio API
 * Generates dynamic 8-bit / modern chime sounds and ambient BGM without needing external audio files.
 */

class AudioManager {
  constructor() {
    this.ctx = null;
    this.soundEnabled = true;
    this.bgmPlaying = false;
    this.bgmInterval = null;
    this.initAudioContext();
  }

  initAudioContext() {
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (AudioContext) {
      this.ctx = new AudioContext();
    }
  }

  ensureContext() {
    if (!this.ctx) {
      this.initAudioContext();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  toggleSound() {
    this.soundEnabled = !this.soundEnabled;
    if (this.soundEnabled) {
      this.playBeep(440, 0.1);
      this.startAmbientBGM();
    } else {
      this.stopAmbientBGM();
    }
    return this.soundEnabled;
  }

  // Play a simple frequency tone
  playTone(freq, type = 'sine', duration = 0.15, gainVal = 0.1) {
    if (!this.soundEnabled) return;
    this.ensureContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(gainVal, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      console.warn("Audio play error", e);
    }
  }

  playBeep(freq = 520, duration = 0.08) {
    this.playTone(freq, 'triangle', duration, 0.08);
  }

  playKeypress() {
    if (!this.soundEnabled) return;
    // Mechanical keyboard click sound simulation
    const freqs = [350, 420, 380, 400];
    const f = freqs[Math.floor(Math.random() * freqs.length)];
    this.playTone(f, 'square', 0.04, 0.03);
  }

  playSuccess() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
    notes.forEach((freq, idx) => {
      setTimeout(() => {
        this.playTone(freq, 'sine', 0.25, 0.12);
      }, idx * 90);
    });
  }

  playError() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    this.playTone(180, 'sawtooth', 0.15, 0.15);
    setTimeout(() => {
      this.playTone(130, 'sawtooth', 0.25, 0.15);
    }, 120);
  }

  playCoin() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    this.playTone(987.77, 'sine', 0.08, 0.1); // B5
    setTimeout(() => {
      this.playTone(1318.51, 'sine', 0.3, 0.1); // E6
    }, 80);
  }

  playLevelUp() {
    if (!this.soundEnabled) return;
    this.ensureContext();
    const notes = [440, 554.37, 659.25, 880, 1108.73, 1318.51];
    notes.forEach((f, idx) => {
      setTimeout(() => {
        this.playTone(f, 'triangle', 0.28, 0.15);
      }, idx * 100);
    });
  }

  playInteract() {
    this.playTone(600, 'sine', 0.06, 0.06);
  }

  startAmbientBGM() {
    if (this.bgmPlaying || !this.soundEnabled) return;
    this.bgmPlaying = true;
    
    // Chill lofi office chords progression loop
    const chords = [
      [261.63, 329.63, 392.00], // C major
      [220.00, 261.63, 329.63], // A minor
      [174.61, 220.00, 261.63], // F major
      [196.00, 246.94, 293.66]  // G major
    ];

    let chordIdx = 0;
    this.bgmInterval = setInterval(() => {
      if (!this.soundEnabled) return;
      const currentChord = chords[chordIdx];
      currentChord.forEach(freq => {
        this.playTone(freq, 'sine', 1.8, 0.015);
      });
      chordIdx = (chordIdx + 1) % chords.length;
    }, 2400);
  }

  stopAmbientBGM() {
    this.bgmPlaying = false;
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }
}

const SoundManager = new AudioManager();
