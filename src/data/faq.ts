import type { FaqCategory } from '@/types/estudo';

export const faqCategories: FaqCategory[] = [
  {
    id: 'fe',
    label: 'Fé e Deus',
    questions: [
      {
        id: 'fe-1',
        question: 'Por que acreditar em Deus?',
        answer:
          'O desejo de Deus está inscrito no coração humano: fomos criados por Deus e para Deus, e não descansaremos enquanto não repousarmos nele (CIC 27-30). A fé não contradiz a razão; ela a eleva, dando sentido pleno à vida, ao sofrimento e à esperança.',
        source: 'CIC 26-49',
      },
      {
        id: 'fe-2',
        question: 'A fé é contrária à razão?',
        answer:
          'Não. A fé e a razão se apoiam mutuamente. A razão pode conhecer Deus pela criação, e a fé apresenta a razão a verdades que a ultrapassam, mas não a contradizem. "A fé e a razão são como as duas asas pelas quais o espírito humano se eleva para a contemplação da verdade" (João Paulo II, Fides et Ratio).',
        source: 'CIC 36-38',
      },
      {
        id: 'fe-3',
        question: 'Por que existe o mal e o sofrimento?',
        answer:
          'O mal não foi criado por Deus. Ele entrou no mundo pela liberdade humana, no pecado original. Deus, em sua sabedoria e amor, permite o mal apenas para dele tirar um bem maior: a redenção de Cristo. Só a fé em Cristo crucificado dá sentido ao sofrimento (CIC 309-314).',
        source: 'CIC 309-314',
      },
    ],
  },
  {
    id: 'sacramentos',
    label: 'Sacramentos',
    questions: [
      {
        id: 'sac-1',
        question: 'O que são os sacramentos?',
        answer:
          'São sinais eficazes da graça, instituídos por Cristo e confiados à Igreja, pelos quais nos é concedida a vida divina. São sete: Batismo, Confirmação, Eucaristia, Penitência, Unção dos Enfermos, Ordem e Matrimônio (CIC 1113-1130).',
        source: 'CIC 1113-1130',
      },
      {
        id: 'sac-2',
        question: 'Posso comungar em estado de pecado grave?',
        answer:
          'Não. Quem tem consciência de ter cometido um pecado grave deve receber o sacramento da Penitência antes de se aproximar da Eucaristia (CIC 1385-1386). A comunhão em estado de pecado grave é uma profanação do corpo e do sangue do Senhor.',
        source: 'CIC 1385-1386',
      },
      {
        id: 'sac-3',
        question: 'Com que frequência posso me confessar?',
        answer:
          'Todo católico é obrigado a confessar os pecados graves ao menos uma vez por ano. Mas é altamente recomendado confessar-se com frequência (ex.: mensalmente), pois a confissão nos dá a graça de crescer em virtude e vencer as faltas (CIC 2042, 1457-1458).',
        source: 'CIC 1457-1458',
      },
    ],
  },
  {
    id: 'igreja',
    label: 'Igreja e Maria',
    questions: [
      {
        id: 'igj-1',
        question: 'Por que a Igreja Católica tem o Papa?',
        answer:
          'Jesus escolheu Pedro como cabeça dos Apóstolos e lhe confiou o rebanho (Cf. Mt 16,18-19). O Papa, sucessor de Pedro, é o princípio e fundamento visível da unidade da Igreja, garantindo sua continuidade desde os Apóstolos (CIC 880-882).',
        source: 'CIC 880-882',
      },
      {
        id: 'igj-2',
        question: 'Por que os católicos rezam para Maria e os santos?',
        answer:
          'Não adoramos Maria nem os santos — a adoração é somente a Deus. Pedimos a intercessão deles, isto é, que orem por nós diante de Deus. Como "a oração do justo tem muito poder", a intercessão dos santos é uma ajuda preciosa na nossa jornada (CIC 956, 969).',
        source: 'CIC 956, 969',
      },
      {
        id: 'igj-3',
        question: 'Maria era sem pecado?',
        answer:
          'Sim. Por um privilégio singular da graça de Deus, Maria foi preservada imune de toda mancha de pecado desde o primeiro instante de sua concepção — é a Imaculada Conceição, dogma proclamado em 1854 (CIC 490-493).',
        source: 'CIC 490-493',
      },
    ],
  },
  {
    id: 'vida',
    label: 'Vida Cristã',
    questions: [
      {
        id: 'vid-1',
        question: 'Qual é o propósito da minha vida?',
        answer:
          'O homem foi criado por Deus para conhecer, amar e servir a Deus neste mundo e ser feliz com Ele para sempre no céu (CIC 358, 1721). Conhecer esse fim dá sentido a tudo o que fazemos e orienta nossas escolhas.',
        source: 'CIC 358, 1721',
      },
      {
        id: 'vid-2',
        question: 'Como saber a vontade de Deus para mim?',
        answer:
          'Através da oração, da leitura da Sagrada Escritura, dos sacramentos, do conselho espiritual e dos sinais da vida. O discernimento pede humildade, docilidade ao Espírito Santo e disposição para seguir o bem, mesmo quando custa sacrifício (CIC 1783-1791).',
        source: 'CIC 1783-1791',
      },
      {
        id: 'vid-3',
        question: 'O que devo fazer se pecar?',
        answer:
          'Deus sempre oferece o seu perdão. O caminho é: arrepender-se, recorrer ao sacramento da Confissão, reparar o mal causado e recomeçar, confiando na misericórdia infinita de Deus, que "é rico em misericórdia" (Ef 2,4).',
        source: 'CIC 1430-1439',
      },
    ],
  },
];
