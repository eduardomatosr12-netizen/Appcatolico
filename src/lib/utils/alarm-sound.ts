let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext {
  if (!audioCtx) {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

export function playAlarmSound() {
  const ctx = getAudioContext();

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

  // 3 burst sequences, each with 3 rapid beeps
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
