function playBeep(ctx: AudioContext, startTime: number, duration = 0.12, frequency = 880) {
  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(frequency, startTime);

  gainNode.gain.setValueAtTime(0, startTime);
  gainNode.gain.linearRampToValueAtTime(0.6, startTime + 0.01);
  gainNode.gain.setValueAtTime(0.6, startTime + duration - 0.02);
  gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(startTime);
  oscillator.stop(startTime + duration);
}

async function createActiveContext(): Promise<AudioContext | null> {
  try {
    const ctx = new AudioContext();
    if (ctx.state === 'suspended') {
      await ctx.resume();
    }
    return ctx;
  } catch {
    return null;
  }
}

export function ensureAudioReady() {
  createActiveContext();
}

export async function playAlarmSound() {
  const ctx = await createActiveContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  playBeep(ctx, now, 0.15, 880);
  playBeep(ctx, now + 0.2, 0.15, 880);
  playBeep(ctx, now + 0.4, 0.15, 880);
  setTimeout(() => ctx.close().catch(() => {}), 2000);
}

export function stopAlarmSound() {
  // No persistent context to stop anymore — each play creates its own
}

export async function testAlarmSound() {
  const ctx = await createActiveContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  playBeep(ctx, now, 0.1, 880);
  playBeep(ctx, now + 0.15, 0.1, 880);
  playBeep(ctx, now + 0.3, 0.1, 880);
  setTimeout(() => ctx.close().catch(() => {}), 2000);
}
