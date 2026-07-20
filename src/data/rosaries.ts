import type { RosaryType, RosaryMystery, Mystery } from '@/types/rosary';

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

export const rosaries: RosaryType[] = [
  {
    id: 'divine-mercy',
    name: 'Terço da Misericórdia',
    description: 'Capelina da Divina Misericórdia revelada a Santa Faustina',
    icon: '🩸',
    category: 'misericordia',
    openingPrayers: [
      'Pai Eterno, ofereço-Vos o Corpo e Sangue, a Alma e a Divindade do vosso amadíssimo Filho, o nosso Senhor Jesus Cristo, em propiciação dos nossos pecados e dos do mundo inteiro.',
      'Pela Sua dolorosa Paixão, tende misericórdia de nós e do mundo inteiro.',
    ],
    decades: [
      {
        title: '1ª Década — Pelos pecadores mais necessitados de misericórdia',
        prayerPerBead: 'Pai Eterno, ofereço-Vos o Corpo e Sangue, a Alma e a Divindade do vosso amadíssimo Filho, o nosso Senhor Jesus Cristo, em propiciação dos nossos pecados e dos do mundo inteiro.',
        beadCount: 10,
      },
      {
        title: '2ª Década — Pelos pecadores mais necessitados de misericórdia',
        prayerPerBead: 'Pai Eterno, ofereço-Vos o Corpo e Sangue, a Alma e a Divindade do vosso amadíssimo Filho, o nosso Senhor Jesus Cristo, em propiciação dos nossos pecados e dos do mundo inteiro.',
        beadCount: 10,
      },
      {
        title: '3ª Década — Pelos pecadores mais necessitados de misericórdia',
        prayerPerBead: 'Pai Eterno, ofereço-Vos o Corpo e Sangue, a Alma e a Divindade do vosso amadíssimo Filho, o nosso Senhor Jesus Cristo, em propiciação dos nossos pecados e dos do mundo inteiro.',
        beadCount: 10,
      },
      {
        title: '4ª Década — Pelos pecadores mais necessitados de misericórdia',
        prayerPerBead: 'Pai Eterno, ofereço-Vos o Corpo e Sangue, a Alma e a Divindade do vosso amadíssimo Filho, o nosso Senhor Jesus Cristo, em propiciação dos nossos pecados e dos do mundo inteiro.',
        beadCount: 10,
      },
      {
        title: '5ª Década — Pelos pecadores mais necessitados de misericórdia',
        prayerPerBead: 'Pai Eterno, ofereço-Vos o Corpo e Sangue, a Alma e a Divindade do vosso amadíssimo Filho, o nosso Senhor Jesus Cristo, em propiciação dos nossos pecados e dos do mundo inteiro.',
        beadCount: 10,
      },
    ],
    closingPrayers: [
      'Santo Deus, Santo Forte, Santo Imortal, tende misericórdia de nós e do mundo inteiro.',
      'Santo Deus, Santo Forte, Santo Imortal, tende misericórdia de nós e do mundo inteiro.',
      'Santo Deus, Santo Forte, Santo Imortal, tende misericórdia de nós e do mundo inteiro.',
      'Ó Sangue e Água que jorrastes do Coração de Jesus como fonte de misericórdia para nós, confio em Vós!',
    ],
  },
  {
    id: 'battle-rosary',
    name: 'Terço da Batalha',
    description: 'Terço de São Miguel Arcanjo para batalhas espirituais',
    icon: '⚔️',
    category: 'batalha',
    openingPrayers: [
      'Sinal da Cruz: Em nome do Pai, do Filho e do Espírito Santo. Amém.',
      'Pai Nosso, que estais nos céus, santificado seja o vosso nome, venha a nós o vosso reino, seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido. E não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
      'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
      'Creio em Deus Pai todo-poderoso, criador do céu e da terra...',
    ],
    decades: [
      {
        title: '1ª Década — Virtude da Fé',
        reflection: 'Contra as heresias',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '2ª Década — Virtude da Esperança',
        reflection: 'Contra a desesperação',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '3ª Década — Virtude da Caridade',
        reflection: 'Contra o ódio e a inveja',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '4ª Década — Virtude da Prudência',
        reflection: 'Contra a imprudência e a precipitação',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '5ª Década — Virtude da Justiça',
        reflection: 'Contra a injustiça e a opressão',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '6ª Década — Virtude da Temperança',
        reflection: 'Contra os vícios e os excessos',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '7ª Década — Virtude da Fortaleza',
        reflection: 'Contra a covardia e a fraqueza',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
    ],
    closingPrayers: [
      'São Miguel Arcanjo, defendei-nos no combate, sede o nosso refúgio contra as maldades e ciladas do demônio. Que Deus o mande, é pedimos humildemente; e tu, ó Príncipe da milícia celestial, com o poder que Deus te conferiu, precipitai no inferno Satanás e os outros espíritos malignos que vagueiam pelo mundo para perder as almas. Amém.',
      'São Gabriel Arcanjo, intercedei por nós.',
      'São Rafael Arcanjo, intercedei por nós.',
    ],
  },
  {
    id: 'providence',
    name: 'Terço da Providência',
    description: 'Terço de confiança na Divina Providência de Deus',
    icon: '🕊️',
    category: 'providencia',
    openingPrayers: [
      'Pai Nosso que estais nos céus, santificado seja o vosso Nome, venha a nós o vosso Reino, seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje. Perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido. E não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
      'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
    ],
    decades: [
      {
        title: '1ª Década — A Criação do Mundo',
        reflection: 'Deus criou tudo por amor e providência',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '2ª Década — O Maná no Deserto',
        reflection: 'Deus alimenta o povo no deserto',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '3ª Década — A Multiplicação dos Pães',
        reflection: 'Jesus alimenta as multidões',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '4ª Década — A Parábola das Flores do Campo',
        reflection: 'Não vos preocupeis com o dia de amanhã',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '5ª Década — A Providência em Nossa Senhora',
        reflection: 'Maria, modelo de confiança em Deus',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
    ],
    closingPrayers: [
      'Senhor, eu confio em Vós. Vós sabeis o que é melhor para mim. Em Vós ponho toda a minha confiança, porque sois o meu Deus e o meu Pai. Amém.',
      'Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós chamamos, os desterrados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, tornai para nós os vossos olhos misericordiosos, e depois desto desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce Virgem Maria. Orai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.',
    ],
  },
  {
    id: 'st-joseph',
    name: 'Terço de São José',
    description: 'Terço dedicado ao glorioso Patriarca São José',
    icon: '🔨',
    category: 'sao_jose',
    openingPrayers: [
      'Pai Nosso que estais nos céus, santificado seja o vosso Nome, venha a nós o vosso Reino, seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje. Perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido. E não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
      'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
    ],
    decades: [
      {
        title: '1ª Década — A justiça de São José',
        reflection: 'Justo e fiel servo de Deus',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '2ª Década — São José, esposo de Maria',
        reflection: 'Protetor da Sagrada Família',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '3ª Década — São José, pai de Jesus',
        reflection: '教育ador do Menino Deus',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '4ª Década — O sonho de São José',
        reflection: 'Obediência ao anjo do Senhor',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '5ª Década — A morte de São José',
        reflection: 'Protetor dos moribundos',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '6ª Década — São José, obreiro fiel',
        reflection: 'O trabalho como oração',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '7ª Década — São José, terror dos demônios',
        reflection: 'Defensor da Igreja',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
    ],
    closingPrayers: [
      'Glorioso São José, Pai nutrício de Jesus, protetor de Maria, escolhido por Deus para cuidar da Sagrada Família, intercedei por nós junto a Jesus e Maria. Amém.',
      'Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós chamamos, os desterrados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, tornai para nós os vossos olhos misericordiosos, e depois desto desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce Virgem Maria. Orai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.',
    ],
  },
  {
    id: 'seven-joys',
    name: 'Terço dos Sete Gozos',
    description: 'Terço das sete alegrias de Nossa Senhora',
    icon: '🌸',
    category: 'diversos',
    openingPrayers: [
      'Pai Nosso que estais nos céus, santificado seja o vosso Nome, venha a nós o vosso Reino, seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje. Perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido. E não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
      'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
    ],
    decades: [
      {
        title: '1ª Década — A Anunciação',
        reflection: 'Gozo da Encarnação',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '2ª Década — A Visitação',
        reflection: 'Gozo de Santa Isabel',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '3ª Década — O Nascimento de Jesus',
        reflection: 'Gozo do Nascimento do Salvador',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '4ª Década — A Adoração dos Magos',
        reflection: 'Gozo da Epifania',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '5ª Década — A Purificação',
        reflection: 'Gozo da Apresentação no Templo',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '6ª Década — O Encontro no Templo',
        reflection: 'Gozo de encontrar o Menino Jesus',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '7ª Década — A Ressurreição',
        reflection: 'Gozo da Ressurreição do Filho',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
    ],
    closingPrayers: [
      'Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós chamamos, os desterrados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, tornai para nós os vossos olhos misericordiosos, e depois desto desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce Virgem Maria. Orai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.',
    ],
  },
  {
    id: 'rosary-dead',
    name: 'Terço dos Mortos',
    description: 'Terço pelas almas do Purgatório',
    icon: '🕯️',
    category: 'diversos',
    openingPrayers: [
      'Em nome do Pai, do Filho e do Espírito Santo. Amém.',
      'Pai Nosso, que estais nos céus, santificado seja o vosso nome, venha a nós o vosso reino, seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido. E não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
    ],
    decades: [
      {
        title: '1ª Década — Pelas almas dos justos',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '2ª Década — Pelas almas dos pecadores arrependidos',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '3ª Década — Pelas almas abandonadas',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '4ª Década — Pelas almas dos familiares',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '5ª Década — Pelas almas dos amigos',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
    ],
    closingPrayers: [
      'Eternal Descanso lhes dais, ó Senhor, e a luz perpétua brilhe para eles. Que repousem em paz. Amém.',
      'Senhor, tende misericórdia das almas do Purgatório. Perdoai-lhes as faltas e admiti-as na vossa glória. Por Jesus Cristo, nosso Senhor. Amém.',
    ],
  },
  {
    id: 'fatima',
    name: 'Terço de Nossa Senhora de Fátima',
    description: 'Terço com as orações da aparição de Fátima',
    icon: '☀️',
    category: 'mariano',
    openingPrayers: [
      'Pai Nosso, que estais nos céus, santificado seja o vosso nome, venha a nós o vosso reino, seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje, perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido. E não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
    ],
    decades: [
      {
        title: '1ª Década — Mistérios Gozosos',
        reflection: 'Pela conversão dos pecadores',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '2ª Década — Mistérios Gozosos',
        reflection: 'Pela conversão dos pecadores',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '3ª Década — Mistérios Gozosos',
        reflection: 'Pela conversão dos pecadores',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '4ª Década — Mistérios Gozosos',
        reflection: 'Pela conversão dos pecadores',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '5ª Década — Mistérios Gozosos',
        reflection: 'Pela conversão dos pecadores',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
    ],
    closingPrayers: [
      'Ó meu Jesus, perdoai-nos, livrai-nos do fogo do inferno, conduzi todas as almas para o céu, especialmente aquelas que mais precisam da vossa misericórdia.',
      'Rainha do Santo Rosário de Fátima, rogai por nós.',
    ],
  },
  {
    id: 'sacred-heart',
    name: 'Terço do Sagrado Coração',
    description: 'Terço de reparação e amor ao Sagrado Coração de Jesus',
    icon: '❤️‍🔥',
    category: 'diversos',
    openingPrayers: [
      'Pai Nosso que estais nos céus, santificado seja o vosso Nome, venha a nós o vosso Reino, seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje. Perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido. E não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
      'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
    ],
    decades: [
      {
        title: '1ª Década — O amor de Jesus pela humanidade',
        reflection: 'Reparação pelas ingratidões',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '2ª Década — A coroa de espinhos',
        reflection: 'Reparação pelas ofensas à pureza',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '3ª Década — A lança no lado de Jesus',
        reflection: 'Reparação pela indiferença',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '4ª Década — O Coração Eucarístico',
        reflection: 'Reparação pelas irreverências à Eucaristia',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '5ª Década — A promessa do Sagrado Coração',
        reflection: 'Reparação pela ingratidão ao amor divino',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
    ],
    closingPrayers: [
      'Ó Coração Augusto e Sacratíssimo de Jesus, perdoai-nos, livrai-nos do fogo do inferno, conduzi todas as almas para o céu, especialmente aquelas que mais precisam da vossa misericórdia. Amém.',
      'Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós chamamos, os desterrados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, tornai para nós os vossos olhos misericordiosos, e depois desto desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce Virgem Maria. Orai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.',
    ],
  },
  {
    id: 'seven-sorrows',
    name: 'Terço das Sete Dores de Maria',
    description: 'Terço das sete dores e lágrimas de Nossa Senhora',
    icon: '💔',
    category: 'diversos',
    openingPrayers: [
      'Pai Nosso que estais nos céus, santificado seja o vosso Nome, venha a nós o vosso Reino, seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje. Perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido. E não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
      'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
    ],
    decades: [
      {
        title: '1ª Década — A Profecia de Simeão',
        reflection: 'Uma espada de dor traspassará a vossa alma',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '2ª Década — A Fuga para o Egito',
        reflection: 'A dor de ver o Filho perseguido',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '3ª Década — A Perda do Menino Jesus no Templo',
        reflection: 'Três dias de angústia sem o Filho',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '4ª Década — O Encontro com Jesus no Caminho da Cruz',
        reflection: 'A dor de ver o Filho carregar a cruz',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '5ª Década — A Cruz no Calvário',
        reflection: 'Maria debaixo da cruz',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '6ª Década — A Descida da Cruz',
        reflection: 'Maria recebe o corpo de Jesus nos braços',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '7ª Década — O Sepultamento de Jesus',
        reflection: 'A última despedida do Filho amado',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
    ],
    closingPrayers: [
      'Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós chamamos, os desterrados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, tornai para nós os vossos olhos misericordiosos, e depois desto desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce Virgem Maria. Orai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.',
    ],
  },
  {
    id: 'holy-spirit',
    name: 'Terço do Espírito Santo',
    description: 'Terço de invocação ao Espírito Santo',
    icon: '🕊️',
    category: 'diversos',
    openingPrayers: [
      'Vinde, Espírito Santo, enchei os corações dos vossos fiéis e acendei neles o fogo do vosso amor.',
      'Pai Nosso que estais nos céus, santificado seja o vosso Nome, venha a nós o vosso Reino, seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje. Perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido. E não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
    ],
    decades: [
      {
        title: '1ª Década — Dom de Sabedoria',
        reflection: 'Iluminai a nossa mente com a vossa sabedoria',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '2ª Década — Dom de Inteligência',
        reflection: 'Aumentai a nossa compreensão das verdades divinas',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '3ª Década — Dom de Conselho',
        reflection: 'Guiai as nossas decisões segundo a vossa vontade',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '4ª Década — Dom de Fortaleza',
        reflection: 'Dai-nos força para superar as provações',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '5ª Década — Dom de Ciência',
        reflection: 'Revelai-nos os mistérios do vosso reino',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '6ª Década — Dom de Piedade',
        reflection: 'Enchei os nossos corações de amor e compaixão',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '7ª Década — Dom de Temor a Deus',
        reflection: 'Afasta-nos do pecado e mantém-nos na vossa graça',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
    ],
    closingPrayers: [
      'Espírito Santo, vinde e habitai em nós. Transformai os nossos corações e concedei-nos a vida eterna. Amém.',
      'Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós chamamos, os desterrados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, tornai para nós os vossos olhos misericordiosos, e depois desto desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce Virgem Maria. Orai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.',
    ],
  },
  {
    id: 'st-anthony',
    name: 'Terço de São Francisco de Assis',
    description: 'Terço de intercessão por meio de São Francisco',
    icon: '🐺',
    category: 'diversos',
    openingPrayers: [
      'Pai Nosso que estais nos céus, santificado seja o vosso Nome, venha a nós o vosso Reino, seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje. Perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido. E não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
      'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
    ],
    decades: [
      {
        title: '1ª Década — A conversão de São Francisco',
        reflection: 'De rico a pobre por amor a Deus',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '2ª Década — A bênção dos animais',
        reflection: 'Amor por toda a criação',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '3ª Década — Os estigmas de São Francisco',
        reflection: 'Conformidade com a Paixão de Cristo',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '4ª Década — O Cântico das Criaturas',
        reflection: 'Louvor a Deus por todas as coisas',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '5ª Década — A paz de São Francisco',
        reflection: 'Onde houver odio, que eu leve o amor',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
    ],
    closingPrayers: [
      'Senhor, fazei de mim um instrumento da vossa paz. Onde houver ódio, que eu leve o amor; onde houver ofensa, que eu leve o perdão; onde houver dúvida, que eu leve a fé; onde houver desespero, que eu leve a esperança; onde houver trevas, que eu leve a luz; onde houver tristeza, que eu leve a alegria. Ó Mestre, que eu não procure tanto ser consolado como consolar, ser compreendido como compreender, ser amado como amar. Pois é dando que se recebe, é perdoando que se é perdoado, é morrendo que se ressuscita à vida eterna. Amém.',
      'Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós chamamos, os desterrados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, tornai para nós os vossos olhos misericordiosos, e depois desto desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce Virgem Maria. Orai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.',
    ],
  },
  {
    id: 'st-jude',
    name: 'Terço de São Judas Tadeu',
    description: 'Terço de intercessão em causas impossíveis',
    icon: '🔑',
    category: 'diversos',
    openingPrayers: [
      'Pai Nosso que estais nos céus, santificado seja o vosso Nome, venha a nós o vosso Reino, seja feita a vossa vontade, assim na terra como no céu. O pão nosso de cada dia nos dai hoje. Perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido. E não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.',
      'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
    ],
    decades: [
      {
        title: '1ª Década — Pela causa que parecia impossível',
        reflection: 'São Judas Tadeu, intercedei por nós',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '2ª Década — Pelos enfermos e desesperados',
        reflection: 'São Judas, esperança dos desesperados',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '3ª Década — Pelas famílias em crise',
        reflection: 'São Judas, patrono das causas difíceis',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '4ª Década — Pela paz no mundo',
        reflection: 'São Judas, apóstolo da paz',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
      {
        title: '5ª Década — Pelas almas do Purgatório',
        reflection: 'São Judas, intercedei por eles',
        prayerPerBead: 'Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres, e bendito é o fruto do vosso ventre, Jesus. Santa Maria, Mãe de Deus, rogai por nós pobres pecadores, agora e na hora da nossa morte. Amém.',
        beadCount: 10,
      },
    ],
    closingPrayers: [
      'Glorioso São Judas Tadeu, fiel servo e amigo de Jesus, intercedei por nós junto ao Pai celestial em todas as nossas necessidades, especialmente na causa que agora vos apresentamos. Amém.',
      'Salve Rainha, Mãe de misericórdia, vida, doçura e esperança nossa, salve! A vós chamamos, os desterrados filhos de Eva. A vós suspiramos, gemendo e chorando neste vale de lágrimas. Eia, pois, advogada nossa, tornai para nós os vossos olhos misericordiosos, e depois desto desterro, mostrai-nos Jesus, bendito fruto do vosso ventre. Ó clemente, ó piedosa, ó doce Virgem Maria. Orai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.',
    ],
  },
];

export function getRosaryById(id: string): RosaryType | undefined {
  return rosaries.find((r) => r.id === id);
}

export function getRosariesByCategory(category: RosaryType['category']): RosaryType[] {
  return rosaries.filter((r) => r.category === category);
}
