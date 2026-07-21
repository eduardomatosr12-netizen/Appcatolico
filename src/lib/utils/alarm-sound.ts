let audioCtx: AudioContext | null = null;
let activeOscillators: OscillatorNode[] = [];

function getCtx(): AudioContext {
  if (!audioCtx || audioCtx.state === 'closed') {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

if (typeof window !== 'undefined') {
  const unlock = () => {
    getCtx();
    document.removeEventListener('click', unlock);
    document.removeEventListener('keydown', unlock);
    document.removeEventListener('touchstart', unlock);
  };
  document.addEventListener('click', unlock, { once: true });
  document.addEventListener('keydown', unlock, { once: true });
  document.addEventListener('touchstart', unlock, { once: true });
}

export function playAlarmSound() {
  const ctx = getCtx();
  if (ctx.state !== 'running') return;

  const playBeep = (startTime: number, frequency: number, duration: number) => {
    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.type = 'square';
    oscillator.frequency.setValueAtTime(frequency, startTime);

    gainNode.gain.setValueAtTime(0, startTime);
    gainNode.gain.linearRampToValueAtTime(0.5, startTime + 0.02);
    gainNode.gain.setValueAtTime(0.5, startTime + duration - 0.02);
    gainNode.gain.linearRampToValueAtTime(0, startTime + duration);

    oscillator.start(startTime);
    oscillator.stop(startTime + duration);
    activeOscillators.push(oscillator);
    oscillator.onended = () => {
      activeOscillators = activeOscillators.filter((o) => o !== oscillator);
    };
  };

  const now = ctx.currentTime;

  for (let seq = 0; seq < 3; seq++) {
    const seqStart = now + seq * 0.8;
    for (let i = 0; i < 3; i++) {
      playBeep(seqStart + i * 0.15, 880, 0.1);
    }
  }
}

export function stopAlarmSound() {
  activeOscillators.forEach((osc) => {
    try { osc.stop(); } catch { /* already stopped */ }
  });
  activeOscillators = [];
}

export function testAlarmSound() {
  const ctx = getCtx();
  if (ctx.state === 'suspended') {
    ctx.resume();
  }
  playAlarmSound();
}
