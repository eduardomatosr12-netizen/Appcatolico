let audioCtx: AudioContext | null = null;
let userGestureFired = false;

function ensureAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  if (audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

if (typeof window !== 'undefined') {
  const onGesture = () => {
    userGestureFired = true;
    ensureAudioContext();
    document.removeEventListener('click', onGesture);
    document.removeEventListener('keydown', onGesture);
    document.removeEventListener('touchstart', onGesture);
  };
  document.addEventListener('click', onGesture, { once: true });
  document.addEventListener('keydown', onGesture, { once: true });
  document.addEventListener('touchstart', onGesture, { once: true });
}

export function playAlarmSound() {
  const ctx = ensureAudioContext();

  if (ctx.state === 'suspended' && !userGestureFired) {
    return;
  }

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
  if (audioCtx) {
    audioCtx.close();
    audioCtx = null;
  }
}

export function testAlarmSound() {
  ensureAudioContext();
  userGestureFired = true;
  playAlarmSound();
}
