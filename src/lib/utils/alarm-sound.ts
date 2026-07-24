let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx || audioCtx.state === 'closed') {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

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

export function ensureAudioReady() {
  getAudioContext();
}

export function playAlarmSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    playBeep(ctx, now, 0.15, 880);
    playBeep(ctx, now + 0.2, 0.15, 880);
    playBeep(ctx, now + 0.4, 0.15, 880);
  } catch {
    // AudioContext unavailable
  }
}

export function stopAlarmSound() {
  if (audioCtx && audioCtx.state !== 'closed') {
    audioCtx.close().catch(() => {});
    audioCtx = null;
  }
}

export function testAlarmSound() {
  try {
    const ctx = getAudioContext();
    const now = ctx.currentTime;
    playBeep(ctx, now, 0.1, 880);
    playBeep(ctx, now + 0.15, 0.1, 880);
    playBeep(ctx, now + 0.3, 0.1, 880);
  } catch {
    // AudioContext unavailable
  }
}
