"use client";

/** เสียงประกอบสังเคราะห์ด้วย Web Audio — ไม่ต้องโหลดไฟล์เสียง ใช้ได้ออฟไลน์ */
export type Ambient = "silence" | "bell" | "rain" | "wind";

export class AmbientPlayer {
  private ctx: AudioContext | null = null;
  private noise: AudioBufferSourceNode | null = null;
  private gain: GainNode | null = null;
  private lfo: OscillatorNode | null = null;

  private ensure(): AudioContext {
    if (!this.ctx) {
      const Ctor = window.AudioContext ?? (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new Ctor();
    }
    if (this.ctx.state === "suspended") void this.ctx.resume();
    return this.ctx;
  }

  /** ระฆังทิเบตแบบง่าย: sine หลายฮาร์มอนิกที่ค่อยๆ จางใน ~6 วินาที */
  bell(volume = 0.25) {
    const ctx = this.ensure();
    const now = ctx.currentTime;
    for (const [mult, amp] of [[1, 1], [2.76, 0.45], [5.4, 0.2]] as const) {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = "sine";
      osc.frequency.value = 432 * mult * 0.5;
      g.gain.setValueAtTime(0, now);
      g.gain.linearRampToValueAtTime(volume * amp, now + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, now + 6);
      osc.connect(g).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 6.2);
    }
  }

  start(kind: Ambient) {
    this.stopLoop();
    if (kind === "silence" || kind === "bell") return;
    const ctx = this.ensure();
    const len = ctx.sampleRate * 4;
    const buf = ctx.createBuffer(1, len, ctx.sampleRate);
    const data = buf.getChannelData(0);
    // brown-ish noise (ลมเบา) หรือ white noise ผ่าน filter (ฝน)
    let last = 0;
    for (let i = 0; i < len; i++) {
      const w = Math.random() * 2 - 1;
      last = kind === "wind" ? (last + 0.02 * w) / 1.02 : w;
      data[i] = kind === "wind" ? last * 3.5 : w;
    }
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.loop = true;
    const filter = ctx.createBiquadFilter();
    filter.type = kind === "rain" ? "highpass" : "lowpass";
    filter.frequency.value = kind === "rain" ? 1200 : 500;
    const g = ctx.createGain();
    g.gain.value = kind === "rain" ? 0.06 : 0.18;
    if (kind === "wind") {
      // ลมพัดเป็นระลอกด้วย LFO
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();
      lfo.frequency.value = 0.08;
      lfoGain.gain.value = 0.08;
      lfo.connect(lfoGain).connect(g.gain);
      lfo.start();
      this.lfo = lfo;
    }
    src.connect(filter).connect(g).connect(ctx.destination);
    src.start();
    this.noise = src;
    this.gain = g;
  }

  private stopLoop() {
    try {
      this.noise?.stop();
      this.lfo?.stop();
    } catch {
      /* already stopped */
    }
    this.noise = null;
    this.lfo = null;
    this.gain = null;
  }

  stop() {
    this.stopLoop();
  }

  close() {
    this.stopLoop();
    void this.ctx?.close();
    this.ctx = null;
  }
}
