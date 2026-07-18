import type { RosaryMystery, Mystery } from '@/types/rosary';

export const mysteriesByType: Record<RosaryMystery, Mystery[]> = {
  joyful: [
    { type: 'joyful', number: 1, title: 'Anunciação do Anjo a Nossa Senhora', fruit: 'Humildade' },
    { type: 'joyful', number: 2, title: 'Visitação de Nossa Senhora a Santa Isabel', fruit: 'Caridade' },
    { type: 'joyful', number: 3, title: 'Nascimento do Menino Jesus', fruit: 'Desapego' },
    { type: 'joyful', number: 4, title: 'Apresentação do Menino Jesus no Templo', fruit: 'Obediência' },
    { type: 'joyful', number: 5, title: 'Perda e Encontro do Menino Jesus no Templo', fruit: 'Amor à sabedoria' },
  ],
  sorrowful: [
    { type: 'sorrowful', number: 1, title: 'Agonia de Jesus no Horto das Oliveiras', fruit: 'Contrição' },
    { type: 'sorrowful', number: 2, title: 'Flagelação de Jesus', fruit: 'Pureza' },
    { type: 'sorrowful', number: 3, title: 'Coroa de Espinhos', fruit: 'Fortaleza' },
    { type: 'sorrowful', number: 4, title: 'Jesus carrega a Cruz', fruit: 'Paciência' },
    { type: 'sorrowful', number: 5, title: 'Morte de Jesus na Cruz', fruit: 'Perseverança' },
  ],
  glorious: [
    { type: 'glorious', number: 1, title: 'Ressurreição de Jesus Cristo', fruit: 'Fé' },
    { type: 'glorious', number: 2, title: 'Ascensão de Jesus ao Céu', fruit: 'Esperança' },
    { type: 'glorious', number: 3, title: 'Descida do Espírito Santo', fruit: 'Amor a Deus' },
    { type: 'glorious', number: 4, title: 'Assunção de Nossa Senhora ao Céu', fruit: 'Amor a Maria' },
    { type: 'glorious', number: 5, title: 'Coroação de Nossa Senhora', fruit: 'União eterna com Deus' },
  ],
  luminous: [
    { type: 'luminous', number: 1, title: 'Batismo de Jesus no Rio Jordão', fruit: 'Conversão' },
    { type: 'luminous', number: 2, title: 'Milagre das Bodas de Caná', fruit: 'Confiança em Maria' },
    { type: 'luminous', number: 3, title: 'Anúncio do Reino de Deus', fruit: 'Conversão' },
    { type: 'luminous', number: 4, title: 'Transfiguração de Jesus', fruit: 'Contemplação' },
    { type: 'luminous', number: 5, title: 'Instituição da Eucaristia', fruit: 'Amor à Eucaristia' },
  ],
};

export const mysteryLabels: Record<RosaryMystery, string> = {
  joyful: 'Mistérios Gozosos',
  sorrowful: 'Mistérios Dolorosos',
  glorious: 'Mistérios Gloriosos',
  luminous: 'Mistérios Luminosos',
};

export const mysteryDays: Record<number, RosaryMystery> = {
  0: 'glorious', 1: 'joyful', 2: 'sorrowful', 3: 'glorious',
  4: 'luminous', 5: 'sorrowful', 6: 'glorious',
};

export function getTodayMysteryType(): RosaryMystery {
  return mysteryDays[new Date().getDay()] ?? 'glorious';
}

export const mysteryDayLabels: Record<number, string> = {
  0: 'Domingo', 1: 'Segunda-feira', 2: 'Terça-feira', 3: 'Quarta-feira',
  4: 'Quinta-feira', 5: 'Sexta-feira', 6: 'Sábado',
};
