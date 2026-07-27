let sharedCtx: AudioContext | null = null;

function getSharedContext(): AudioContext | null {
  try {
    if (!sharedCtx || sharedCtx.state === 'closed') {
      sharedCtx = new AudioContext();
    }
    if (sharedCtx.state === 'suspended') {
      sharedCtx.resume();
    }
    return sharedCtx;
  } catch {
    return null;
  }
}

function playBeep(ctx: AudioContext, startTime: number, duration = 0.15, frequency = 880) {
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

export function ensureAudioReady() {
  getSharedContext();
}

export async function playAlarmSound() {
  const ctx = getSharedContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  playBeep(ctx, now, 0.15, 880);
  playBeep(ctx, now + 0.25, 0.15, 880);
  playBeep(ctx, now + 0.5, 0.15, 880);
}

export function stopAlarmSound() {
  if (sharedCtx && sharedCtx.state !== 'closed') {
    sharedCtx.close().catch(() => {});
    sharedCtx = null;
  }
}

export async function testAlarmSound() {
  const ctx = getSharedContext();
  if (!ctx) return;
  const now = ctx.currentTime;
  playBeep(ctx, now, 0.1, 880);
  playBeep(ctx, now + 0.15, 0.1, 880);
  playBeep(ctx, now + 0.3, 0.1, 880);
}
