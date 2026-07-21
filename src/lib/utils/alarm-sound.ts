let currentAudio: HTMLAudioElement | null = null;

function generateBeepWav(): string {
  const sampleRate = 22050;
  const duration = 0.1;
  const frequency = 880;
  const numSamples = Math.floor(sampleRate * duration);
  const numChannels = 1;
  const bitsPerSample = 8;
  const byteRate = sampleRate * numChannels * (bitsPerSample / 8);
  const blockAlign = numChannels * (bitsPerSample / 8);
  const dataSize = numSamples * numChannels * (bitsPerSample / 8);
  const fileSize = 44 + dataSize;

  const buffer = new ArrayBuffer(fileSize);
  const view = new DataView(buffer);

  function writeStr(offset: number, str: string) {
    for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
  }

  writeStr(0, 'RIFF');
  view.setUint32(4, fileSize - 8, true);
  writeStr(8, 'WAVE');
  writeStr(12, 'fmt ');
  view.setUint32(16, 16, true);
  view.setUint16(20, 1, true);
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  writeStr(36, 'data');
  view.setUint32(40, dataSize, true);

  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    const envelope = Math.min(1, t * 100) * Math.min(1, (duration - t) * 100);
    const sample = Math.sin(2 * Math.PI * frequency * t) * envelope * 127 + 128;
    view.setUint8(44 + i, Math.max(0, Math.min(255, Math.round(sample))));
  }

  const bytes = new Uint8Array(buffer);
  let binary = '';
  for (let i = 0; i < bytes.length; i++) {
    binary += String.fromCharCode(bytes[i]);
  }
  return 'data:audio/wav;base64,' + btoa(binary);
}

function generateAlarmSequence(): Promise<void> {
  return new Promise((resolve) => {
    stopAlarmSound();

    const beepUrl = generateBeepWav();
    const audio = new Audio(beepUrl);
    currentAudio = audio;

    audio.volume = 1.0;
    audio.onended = () => {
      currentAudio = null;
      resolve();
    };
    audio.onerror = () => {
      currentAudio = null;
      resolve();
    };

    audio.play().catch(() => {
      currentAudio = null;
      resolve();
    });
  });
}

export function playAlarmSound() {
  stopAlarmSound();

  const beepUrl = generateBeepWav();
  const audio = new Audio(beepUrl);
  currentAudio = audio;

  audio.volume = 1.0;
  audio.play().catch(() => {
    currentAudio = null;
  });
}

export function stopAlarmSound() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.currentTime = 0;
    currentAudio.src = '';
    currentAudio = null;
  }
}

export function testAlarmSound() {
  stopAlarmSound();

  const beepUrl = generateBeepWav();

  const play3Beeps = (delay: number) => {
    const audio = new Audio(beepUrl);
    audio.volume = 1.0;
    audio.play().catch(() => {});
    if (delay > 0) {
      setTimeout(() => play3Beeps(delay - 1), 150);
    }
  };

  play3Beeps(2);
}
