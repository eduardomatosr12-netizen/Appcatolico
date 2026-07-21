let audioCtx: AudioContext | null = null;
let isUnlocked = false;
let activeOscillators: OscillatorNode[] = [];

function getCtx(): AudioContext {
  if (!audioCtx || audioCtx.state === 'closed') {
    audioCtx = new AudioContext();
  }
  return audioCtx;
}

function playSilentBuffer(ctx: AudioContext) {
  try {
    const buffer = ctx.createBuffer(1, 1, 22050);
    const source = ctx.createBufferSource();
    source.buffer = buffer;
    source.connect(ctx.destination);
    source.start(0);
  } catch { /* ignore */ }
}

function unlock() {
  if (isUnlocked) return;
  const ctx = getCtx();
  if (ctx.state === 'suspended') {
    ctx.resume().then(() => {
      playSilentBuffer(ctx);
      isUnlocked = true;
    });
  } else {
    playSilentBuffer(ctx);
    isUnlocked = true;
  }
}

if (typeof window !== 'undefined') {
  const handler = () => {
    unlock();
    if (isUnlocked) {
      document.removeEventListener('pointerdown', handler);
      document.removeEventListener('click', handler);
      document.removeEventListener('keydown', handler);
      document.removeEventListener('touchstart', handler);
    }
  };
  document.addEventListener('pointerdown', handler);
  document.addEventListener('click', handler);
  document.addEventListener('keydown', handler);
  document.addEventListener('touchstart', handler);
}

export function playAlarmSound() {
  const ctx = getCtx();

  if (ctx.state !== 'running') {
    if (isUnlocked) {
      ctx.resume();
    } else {
      return;
    }
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
    ctx.resume().then(() => {
      playSilentBuffer(ctx);
      isUnlocked = true;
      playAlarmSound();
    });
  } else {
    playSilentBuffer(ctx);
    isUnlocked = true;
    playAlarmSound();
  }
}
