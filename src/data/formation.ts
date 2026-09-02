import type { FormationModule } from '@/types/estudo';

export const formationModules: FormationModule[] = [
  {
    id: 'iniciacao',
    title: 'Iniciação à Fé',
    subtitle: 'Os primeiros passos na vida cristã',
    level: 'Iniciação',
    icon: 'sprout',
    lessons: [
      {
        id: 'iniciacao-1',
        title: 'O que é a fé?',
        intro:
          'A fé é a resposta livre do ser humano a Deus que se revela. É um dom de Deus e, ao mesmo tempo, uma resposta de confiança e adesão àquilo que Ele revelou.',
        catecismo: ['§§ 142–184'],
        escritura: ['Hb 11,1', 'Rm 10,9-17', 'Jo 20,30-31'],
        aprofundar: [
          'Catecismo da Igreja Católica — A resposta do homem a Deus: «Eu creio»',
        ],
      },
      {
        id: 'iniciacao-2',
        title: 'Quem é Deus?',
        intro:
          'Deus é único, eterno, perfeito e infinitamente bom. Ele é o Criador de tudo o que existe e não depende de nenhuma criatura para existir. Deus nos criou por amor e nos chama a conhecê-Lo, amá-Lo e participar de sua vida.',
        catecismo: ['§§ 198–231'],
        escritura: ['Êx 3,13-15', 'Dt 6,4', 'Jo 17,3', '1Jo 4,8'],
        aprofundar: [
          'Catecismo da Igreja Católica — «Eu creio em Deus Pai todo-poderoso»',
        ],
      },
      {
        id: 'iniciacao-3',
        title: 'Santíssima Trindade',
        intro:
          'Existe um só Deus em três Pessoas: Pai, Filho e Espírito Santo. As três Pessoas são distintas, mas possuem a mesma e única natureza divina. A Trindade é o centro da fé cristã e um mistério que Deus revelou ao homem. O próprio Catecismo destaca que a fé na Trindade está presente desde as origens da Igreja, especialmente na fé batismal.',
        catecismo: ['§§ 232–267'],
        escritura: ['Mt 28,19', 'Jo 1,1-18', 'Jo 14,16-17', '2Cor 13,13'],
        aprofundar: [
          'Catecismo da Igreja Católica — A fé na Santíssima Trindade: um só Deus em três Pessoas',
        ],
      },
      {
        id: 'iniciacao-4',
        title: 'Criação',
        intro:
          'Deus criou livremente tudo o que existe. A criação é boa porque procede de Deus, e tudo aquilo que existe depende continuamente d\'Ele. O mundo não é Deus, mas uma obra de Deus, e toda a criação encontra seu sentido último n\'Ele.',
        catecismo: ['§§ 279–324'],
        escritura: ['Gn 1–2', 'Sl 8', 'Sl 19', 'Jo 1,1-3', 'Cl 1,15-17'],
        aprofundar: [
          'Catecismo da Igreja Católica — O Criador: «No princípio, Deus criou o céu e a terra»',
        ],
      },
      {
        id: 'iniciacao-5',
        title: 'Anjos',
        intro:
          'Os anjos são criaturas espirituais, pessoais, inteligentes e dotadas de vontade. Foram criados por Deus para servi-Lo e participar de seu plano de salvação. Alguns anjos permaneceram fiéis a Deus, enquanto outros, por uma escolha livre, se afastaram d\'Ele. O Catecismo ensina que os anjos são criaturas incorpóreas, pessoais e imortais, que contemplam, servem e glorificam a Deus.',
        catecismo: ['§§ 328–336', 'Sobre os anjos decaídos: §§ 391–395'],
        escritura: ['Sl 91,11', 'Mt 18,10', 'Hb 1,14', 'Ap 12,7-9'],
        aprofundar: [
          'Catecismo da Igreja Católica — Os anjos em a economia da salvação',
        ],
      },
      {
        id: 'iniciacao-6',
        title: 'O ser humano',
        intro:
          'O ser humano foi criado por Deus à sua imagem e semelhança. Possui dignidade única entre as criaturas e foi criado para conhecer, amar e servir a Deus. O homem é formado de corpo e alma e é chamado à comunhão com Deus e à vida eterna. O Catecismo destaca que o homem é a única criatura terrestre que Deus quis por si mesma e que é chamada a participar da própria vida divina.',
        catecismo: ['§§ 355–384'],
        escritura: ['Gn 1,26-27', 'Gn 2,7', 'Sl 8', 'Mt 22,37-39'],
        aprofundar: [
          'Catecismo da Igreja Católica — O homem feito à imagem de Deus: dignidade da pessoa humana',
        ],
      },
      {
        id: 'iniciacao-7',
        title: 'Pecado Original',
        intro:
          'Deus criou o homem em amizade e santidade. Porém, os primeiros pais, seduzidos pelo Maligno, abusaram de sua liberdade e desobedeceram a Deus. Essa queda feriu a natureza humana e fez com que a humanidade nascesse privada da santidade e justiça originais. O pecado original não é um pecado pessoal cometido por cada indivíduo, mas uma condição herdada. O Batismo apaga o pecado original e restaura a vida da graça, embora permaneçam as consequências da natureza ferida e a inclinação ao pecado.',
        catecismo: [
          '§§ 385–421',
          '396–409 — A queda e o primeiro pecado',
          '404–405 — O pecado original',
          '410–412 — A promessa de salvação',
          '416–421 — Consequências e vitória de Cristo',
        ],
        escritura: ['Gn 3', 'Rm 5,12-21', '1Cor 15,21-22'],
        aprofundar: [
          'Catecismo da Igreja Católica — A realidade do pecado: «A queda»',
        ],
      },
      {
        id: 'iniciacao-8',
        title: 'Jesus Cristo, o Salvador',
        intro:
          'Jesus é o Filho de Deus feito homem, que nos redimiu por sua cruz e ressurreição. Ele é verdadeiro Deus e verdadeiro homem, o único mediador entre Deus e os homens.',
        catecismo: ['§§ 422–451'],
        escritura: ['Jo 14,6', 'Jo 3,16', '1Tm 2,5'],
        aprofundar: [
          'Catecismo da Igreja Católica — «Eu creio em Jesus Cristo, seu único Filho, nosso Senhor»',
        ],
      },
      {
        id: 'iniciacao-9',
        title: 'O Espírito Santo e a Igreja',
        intro:
          'O Espírito Santo foi enviado no dia de Pentecostes para santificar e conduzir a Igreja, Corpo de Cristo, fundada sobre os Apóstolos com Pedro à frente.',
        catecismo: ['§§ 683–747'],
        escritura: ['At 2,1-4', 'Ef 4,4-6'],
        aprofundar: [
          'Catecismo da Igreja Católica — «Eu creio na Igreja una, santa, católica e apostólica»',
        ],
      },
    ],
  },
  {
    id: 'fundamentos',
    title: 'Fundamentos da Fé',
    subtitle: 'O Credo, os sacramentos e os mandamentos',
    level: 'Fundamentos',
    icon: 'layers',
    lessons: [
      {
        id: 'fundamentos-1',
        title: 'O Credo',
        intro:
          'O Credo resume a fé da Igreja. Ele é o "símbolo" da fé, isto é, sinal de identificação e comunhão entre todos os cristãos.',
        catecismo: ['§§ 185–197'],
        escritura: ['1Cor 15,3-4', 'Dt 6,4'],
        aprofundar: [
          'Catecismo da Igreja Católica — Os Símbolos da fé: «Creio» e «Nós cremos»',
        ],
      },
      {
        id: 'fundamentos-2',
        title: 'Os Sacramentos',
        intro:
          'Os sacramentos são sinais eficazes da graça, instituídos por Cristo e confiados à Igreja, pelos quais nos é concedida a vida divina.',
        catecismo: ['§§ 1113–1134'],
        escritura: ['Jo 6,53-58', 'Mt 28,19'],
        aprofundar: [
          'Catecismo da Igreja Católica — Os sete sacramentos da Igreja',
        ],
      },
      {
        id: 'fundamentos-3',
        title: 'Os Dez Mandamentos',
        intro:
          'Os Dez Mandamentos foram entregues por Deus a Moisés e resumem a lei moral. Jesus os resumiu no mandamento do amor a Deus e ao próximo.',
        catecismo: ['§§ 2052–2074'],
        escritura: ['Ex 20,1-17', 'Mt 22,37-40'],
        aprofundar: [
          'Catecismo da Igreja Católica — A lei moral: «Ama a Deus sobre todas as coisas»',
        ],
      },
      {
        id: 'fundamentos-4',
        title: 'A Oração',
        intro:
          'A oração é a elevação da alma a Deus e o diálogo de amor entre Deus e o homem. O Pai-Nosso é a oração por excelência, ensinada por Jesus.',
        catecismo: ['§§ 2559–2560', '§§ 2759–2865'],
        escritura: ['Mt 6,9-13', 'Lc 11,1-4'],
        aprofundar: [
          'Catecismo da Igreja Católica — A Revelação da oração: o dom de Deus',
          'Catecismo da Igreja Católica — A oração do Senhor: «Pai-Nosso»',
        ],
      },
    ],
  },
  {
    id: 'aprofundamento',
    title: 'Aprofundamento',
    subtitle: 'Maria, a graça e a vida na Igreja',
    level: 'Aprofundamento',
    icon: 'star',
    lessons: [
      {
        id: 'aprofundamento-1',
        title: 'A Virgem Maria',
        intro:
          'Maria é a "Mãe de Deus" e nossa mãe na ordem da graça, modelo de fé e obediência. Pela Imaculada Conceição, foi preservada de toda mancha de pecado.',
        catecismo: ['§§ 484–511', '§§ 963–975'],
        escritura: ['Lc 1,26-38', 'Jo 19,26-27'],
        aprofundar: [
          'Catecismo da Igreja Católica — A Virgem Maria, Mãe de Cristo, Mãe da Igreja',
        ],
      },
      {
        id: 'aprofundamento-2',
        title: 'A Graça Santificante',
        intro:
          'A graça é o favor gratuito de Deus, a participação na vida divina que nos torna filhos de Deus e nos capacita a viver em santidade.',
        catecismo: ['§§ 1996–2005'],
        escritura: ['Ef 2,8-9', '2Cor 12,9'],
        aprofundar: [
          'Catecismo da Igreja Católica — A graça santificante e a justificação',
        ],
      },
      {
        id: 'aprofundamento-3',
        title: 'Os Santos e a Comunhão dos Santos',
        intro:
          'A comunhão dos santos significa que todos os membros da Igreja — peregrinos na terra, purgantes e gloriosos no Céu — estão unidos em Cristo.',
        catecismo: ['§§ 946–962'],
        escritura: ['1Cor 13,8', 'Hb 12,1'],
        aprofundar: [
          'Catecismo da Igreja Católica — A comunhão dos santos',
        ],
      },
      {
        id: 'aprofundamento-4',
        title: 'O Mistério Pascal na Vida Cristã',
        intro:
          'No Batismo fomos mergulhados na morte de Cristo para ressuscitarmos com Ele para a vida nova. Participar do Mistério Pascal é abraçar a cruz no seguimento de Cristo.',
        catecismo: ['§§ 618, 654–655'],
        escritura: ['Rm 6,3-11', 'Lc 9,23'],
        aprofundar: [
          'Catecismo da Igreja Católica — O Mistério Pascal e a vida nova em Cristo',
        ],
      },
    ],
  },
  {
    id: 'espiritualidade',
    title: 'Espiritualidade',
    subtitle: 'Vida interior, discernimento e santidade',
    level: 'Espiritualidade',
    icon: 'flame',
    lessons: [
      {
        id: 'espiritualidade-1',
        title: 'A Vida Interior',
        intro:
          'A vida interior é o espaço de encontro pessoal com Deus, onde a alma se recolhe para ouvir a sua voz no silêncio e na oração.',
        catecismo: ['§§ 2697–2709'],
        escritura: ['Mt 6,6', '1Rs 19,11-13'],
        aprofundar: [
          'Catecismo da Igreja Católica — O combate da oração: a meditação e a contemplação',
        ],
      },
      {
        id: 'espiritualidade-2',
        title: 'O Discernimento Espiritual',
        intro:
          'O discernimento é a capacidade de distinguir o que conduz a Deus daquilo que dele nos afasta, reconhecendo a voz de Deus nas decisões da vida.',
        catecismo: ['§§ 1783–1791'],
        escritura: ['1Rs 19,11-13', 'Sl 25,4-5'],
        aprofundar: [
          'Catecismo da Igreja Católica — A consciência moral e o reto juízo',
        ],
      },
      {
        id: 'espiritualidade-3',
        title: 'A Santidade',
        intro:
          '"Esta é a vontade de Deus: a vossa santificação" (1Ts 4,3). Todos são chamados à santidade, cada um no seu estado de vida.',
        catecismo: ['§§ 2012–2016'],
        escritura: ['1Ts 4,3', 'Mt 5,48'],
        aprofundar: [
          'Catecismo da Igreja Católica — O chamado universal à santidade',
        ],
      },
      {
        id: 'espiritualidade-4',
        title: 'Virtudes: Teologais e Cardeais',
        intro:
          'As virtudes são hábitos bons que orientam nossas ações para Deus. As teologais — fé, esperança e caridade — têm Deus por origem, motivo e objeto.',
        catecismo: ['§§ 1803–1845'],
        escritura: ['1Cor 13,13', 'Sb 8,7'],
        aprofundar: [
          'Catecismo da Igreja Católica — As virtudes humanas e as virtudes teologais',
        ],
      },
    ],
  },
];
