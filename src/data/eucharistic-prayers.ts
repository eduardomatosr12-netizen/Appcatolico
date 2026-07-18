import type { EucharisticPrayer } from '@/types/prayer';

export const eucharisticPrayers: EucharisticPrayer[] = [
  {
    id: 1,
    title: 'Oração Eucarística I (Cânon Romano)',
    sections: [
      {
        key: 'introductoryDialogue',
        label: 'Diálogo Inicial',
        lines: [
          { speaker: 'sacerdote', text: 'O Senhor esteja convosco.' },
          { speaker: 'assembleia', text: 'Ele está no meio de nós.' },
          { speaker: 'sacerdote', text: 'Corações ao alto.' },
          { speaker: 'assembleia', text: 'O nosso coração está em Deus.' },
          { speaker: 'sacerdote', text: 'Demos graças ao Senhor, nosso Deus.' },
          { speaker: 'assembleia', text: 'É nosso dever e nossa salvação.' },
        ],
      },
      {
        key: 'preface',
        label: 'Prefácio',
        lines: [
          { speaker: 'sacerdote', text: 'Pai de misericórdia,\na quem sobem nossos louvores,\nsuplicantes, vos rogamos e pedimos\npor Jesus Cristo, vosso Filho e Senhor nosso,\nque aceiteis e abençoeis estas dons, estas oferendas,\neste sacrifício puro e santo,\nque oferecemos,\nantes de tudo, pela vossa Igreja santa e católica:\nconcedei-lhe paz e proteção,\nunindo-a num só corpo\ne governando-a por toda a terra,\nem comunhão com vosso servo o Papa N.,\no nosso Bispo N.,\ne todos os que guardam a fé católica\nque receberam dos Apóstolos.' },
        ],
      },
      {
        key: 'offeringResponse',
        label: 'Resposta da Oferenda',
        lines: [
          { speaker: 'assembleia', text: 'Abençoai nossa oferenda, ó Senhor!' },
        ],
      },
      {
        key: 'intercessionsLiving',
        label: 'Intercessões pelos Viventes',
        lines: [
          { speaker: 'sacerdote', text: 'Lembrai-vos, ó Pai,\ndos vossos filhos e filhas N. N.\ne de todos os que circundam este altar, dos quais conheceis a fé\ne a dedicação ao vosso serviço.\nPor eles nós vos oferecemos\ne também eles vos oferecem\neste sacrifício de louvor\npor si e por todos os seus,\ne elevam a vós as suas preces,\nDeus eterno, vivo e verdadeiro,\npara alcançar o perdão de suas faltas, a segurança em suas vidas\ne a salvação que esperam.' },
          { speaker: 'assembleia', text: 'Lembrai-vos, ó Pai, dos vossos filhos!' },
        ],
      },
      {
        key: 'intercessionsSaints',
        label: 'Comunhão com os Santos',
        lines: [
          { speaker: 'sacerdote', text: 'Em comunhão com toda a Igreja,\ncelebramos em primeiro lugar\na memória da Mãe de nosso Deus e Senhor Jesus Cristo,\na gloriosa sempre Virgem Maria,\nde seu esposo São José,\ne também a dos Santos Apóstolos e Mártires:\nPedro e Paulo, André,\ne a de todos os vossos Santos.\nPor seus méritos e preces\nconcedei-nos sem cessar a vossa proteção.' },
          { speaker: 'assembleia', text: 'Em comunhão com vossos Santos vos louvamos!' },
        ],
      },
      {
        key: 'acceptancePrayer',
        label: 'Oração da Oferenda',
        lines: [
          { speaker: 'sacerdote', text: 'Aceitai, ó Pai, com bondade,\na oblação dos vossos servos\ne de toda a vossa família;\ndai-nos sempre a vossa paz,\nlivrai-nos da condenação eterna\ne acolhei-nos entre os vossos eleitos.' },
        ],
      },
      {
        key: 'epiclesis',
        label: 'Epíclese',
        lines: [
          { speaker: 'sacerdote', text: 'Dignai-vos, ó Pai,\naceitar, abençoar e santificar estas oferendas;\nrecebei-as como sacrifício espiritual perfeito,\na fim de que se tornem para nós\no Corpo e o Sangue de vosso amado Filho,\nnosso Senhor Jesus Cristo.' },
          { speaker: 'assembleia', text: 'Enviai o vosso Espírito Santo!' },
        ],
      },
      {
        key: 'institutionNarrative',
        label: 'Narrativa da Instituição',
        lines: [
          { speaker: 'rubrica', text: 'Na véspera de sua paixão:' },
          { speaker: 'sacerdote', text: 'Ele tomou o pão em suas santas e veneráveis mãos,\nelevou os olhos ao céu, a Vós, ó Pai todo-poderoso,\npronunciou a bênção de ação de graças,\npartiu o pão e o deu a seus discípulos,\ndizendo:' },
          { speaker: 'sacerdote', text: 'TOMAI, TODOS, E COMEI:\nISTO É O MEU CORPO,\nQUE SERÁ ENTREGUE POR VÓS.' },
          { speaker: 'rubrica', text: 'Do mesmo modo, no fim da ceia:' },
          { speaker: 'sacerdote', text: 'Ele tomou este precioso cálice em suas santas e veneráveis mãos,\npronunciou novamente a bênção de ação de graças\ne o deu a seus discípulos,\ndizendo:' },
          { speaker: 'sacerdote', text: 'TOMAI, TODOS, E BEBEI:\nESTE É O CÁLICE DO MEU SANGUE,\nO SANGUE DA NOVA E ETERNA ALIANÇA,\nQUE SERÁ DERRAMADO POR VÓS E POR TODOS\nPARA A REMISSÃO DOS PECADOS.\nFAZEI ISTO EM MEMÓRIA DE MIM.' },
        ],
      },
      {
        key: 'memorialAcclamation',
        label: 'Mistério da Fé',
        lines: [
          { speaker: 'sacerdote', text: 'Mistério da fé!' },
          { speaker: 'assembleia', text: 'Anunciamos, Senhor, a vossa morte\ne proclamamos a vossa ressurreição.\nVinde, Senhor Jesus!' },
        ],
      },
      {
        key: 'anamnesis',
        label: 'Anamnese',
        lines: [
          { speaker: 'sacerdote', text: 'Celebrando, pois, a memória\nda bem-aventurada paixão do vosso Filho,\nda sua ressurreição dentre os mortos\ne gloriosa ascensão aos céus,\nnós, vossos servos,\ne também vosso povo santo,\nvos oferecemos, ó Pai,\ndentre os bens que nos destes,\no sacrifício puro, santo e imaculado,\nPão santo da vida eterna\ne Cálice da perpétua salvação.' },
          { speaker: 'sacerdote', text: 'Recebei, ó Pai,\ncom olhar benigno, esta oferta,\ncomo recebestes os dons do justo Abel,\no sacrifício de nosso patriarca Abraão\ne a oblação pura e santa\ndo sumo sacerdote Melquisedeque.' },
          { speaker: 'assembleia', text: 'Aceitai, ó Senhor, a nossa oferta!' },
        ],
      },
      {
        key: 'epiclesisUnion',
        label: 'Epíclese de Unidade',
        lines: [
          { speaker: 'sacerdote', text: 'Suplicantes, vos pedimos, ó Deus onipotente,\nque esta nossa oferenda seja levada à vossa presença,\nno altar do céu, pelas mãos do vosso santo Anjo,\npara que todos nós, participando deste altar\npela comunhão do santíssimo Corpo e Sangue do vosso Filho,\nsejamos repletos de todas as graças e bênçãos do céu.' },
          { speaker: 'assembleia', text: 'O Espírito nos una num só corpo!' },
        ],
      },
      {
        key: 'intercessionsDead',
        label: 'Intercessões pelos Defuntos',
        lines: [
          { speaker: 'sacerdote', text: 'Lembrai-vos, ó Pai,\ndos vossos filhos e filhas N. N.\nque nos precederam com o sinal da fé\ne dormem o sono da paz.\nA eles,\ne a todos os que descansam no Cristo,\nconcedei o repouso, a luz e a paz.' },
          { speaker: 'assembleia', text: 'Concedei-lhes, ó Senhor, a luz eterna!' },
        ],
      },
      {
        key: 'finalIntercession',
        label: 'Intercessão Final',
        lines: [
          { speaker: 'sacerdote', text: 'E a todos nós pecadores,\nque esperamos na vossa infinita misericórdia,\nconcedei, não por nossos méritos,\nmas por vossa bondade,\no convívio dos Apóstolos e Mártires:\nJoão Batista e Estêvão,\nMatias e Barnabé,\ne de todos os vossos Santos.\nPor Cristo, nosso Senhor.\n\nPor ele\nnão cessais de criar, santificar, vivificar,\nabençoar estes bens\ne distribuí-los entre nós.' },
        ],
      },
      {
        key: 'concludingDoxology',
        label: 'Doxologia Final',
        lines: [
          { speaker: 'sacerdote', text: 'Por Cristo,\ncom Cristo,\ne em Cristo,\na Vós, Deus Pai todo-poderoso,\nna unidade do Espírito Santo,\ntoda honra e toda glória,\npor todos os séculos dos séculos.' },
          { speaker: 'assembleia', text: 'Amém.' },
        ],
      },
    ],
  },
  {
    id: 2,
    title: 'Oração Eucarística II',
    sections: [
      {
        key: 'introductoryDialogue',
        label: 'Diálogo Inicial',
        lines: [
          { speaker: 'sacerdote', text: 'O Senhor esteja convosco.' },
          { speaker: 'assembleia', text: 'Ele está no meio de nós.' },
          { speaker: 'sacerdote', text: 'Corações ao alto.' },
          { speaker: 'assembleia', text: 'O nosso coração está em Deus.' },
          { speaker: 'sacerdote', text: 'Demos graças ao Senhor, nosso Deus.' },
          { speaker: 'assembleia', text: 'É nosso dever e nossa salvação.' },
        ],
      },
      {
        key: 'preface',
        label: 'Prefácio',
        lines: [
          { speaker: 'sacerdote', text: 'Na verdade, é digno e justo,\né nosso dever e salvação dar-vos graças\nsempre e em todo lugar,\nSenhor, Pai santo,\npor vosso amado Filho, Jesus Cristo.' },
          { speaker: 'sacerdote', text: 'Ele é a vossa Palavra,\npela qual tudo criastes.\nEle é o nosso Salvador e Redentor,\nque se encarnou pelo Espírito Santo\ne nasceu da Virgem Maria.\nEle, para cumprir a vossa vontade\ne adquirir para Vós um povo santo,\nestendeu os braços na hora da sua paixão,\na fim de vencer a morte\ne manifestar a ressurreição.\nPor isso,\ncom os Anjos e todos os Santos,\nproclamamos vossa glória,\ncantando a uma só voz:' },
          { speaker: 'assembleia', text: 'Santo, Santo, Santo,\nSenhor, Deus do universo.\nO céu e a terra proclamam a vossa glória.\nHosana nas alturas!\nBendito o que vem em nome do Senhor!\nHosana nas alturas!' },
        ],
      },
      {
        key: 'epiclesis',
        label: 'Epíclese',
        lines: [
          { speaker: 'sacerdote', text: 'Na verdade, ó Pai, vós sois Santo,\nfonte de toda santidade.' },
          { speaker: 'sacerdote', text: 'Santificai, pois, estes dons,\nderramando sobre eles o vosso Espírito,\na fim de que se tornem para nós\no Corpo e o Sangue de nosso Senhor Jesus Cristo.' },
          { speaker: 'assembleia', text: 'Enviai o vosso Espírito Santo!' },
        ],
      },
      {
        key: 'institutionNarrative',
        label: 'Narrativa da Instituição',
        lines: [
          { speaker: 'rubrica', text: 'Estando para ser entregue:' },
          { speaker: 'sacerdote', text: 'Jesus tomou o pão,\npronunciou a bênção de ação de graças,\npartiu e o deu a seus discípulos,\ndizendo:' },
          { speaker: 'sacerdote', text: 'TOMAI, TODOS, E COMEI:\nISTO É O MEU CORPO,\nQUE SERÁ ENTREGUE POR VÓS.' },
          { speaker: 'rubrica', text: 'Do mesmo modo, no fim da ceia:' },
          { speaker: 'sacerdote', text: 'Ele tomou o cálice em suas mãos\ne, dando graças novamente,\no entregou a seus discípulos,\ndizendo:' },
          { speaker: 'sacerdote', text: 'TOMAI, TODOS, E BEBEI:\nESTE É O CÁLICE DO MEU SANGUE,\nO SANGUE DA NOVA E ETERNA ALIANÇA,\nQUE SERÁ DERRAMADO POR VÓS E POR TODOS\nPARA A REMISSÃO DOS PECADOS.\nFAZEI ISTO EM MEMÓRIA DE MIM.' },
        ],
      },
      {
        key: 'memorialAcclamation',
        label: 'Mistério da Fé',
        lines: [
          { speaker: 'sacerdote', text: 'Mistério da fé!' },
          { speaker: 'assembleia', text: 'Anunciamos, Senhor, a vossa morte\ne proclamamos a vossa ressurreição.\nVinde, Senhor Jesus!' },
        ],
      },
      {
        key: 'anamnesis',
        label: 'Anamnese',
        lines: [
          { speaker: 'sacerdote', text: 'Celebrando, pois, o memorial\nda morte e ressurreição do vosso Filho,\nnós vos oferecemos, ó Pai,\no Pão da vida e o Cálice da salvação;\ne vos agradecemos\nporque nos tornastes dignos\nde estar aqui na vossa presença e vos servir.' },
          { speaker: 'assembleia', text: 'Aceitai, ó Senhor, a nossa oferta!' },
        ],
      },
      {
        key: 'epiclesisUnion',
        label: 'Epíclese de Unidade',
        lines: [
          { speaker: 'sacerdote', text: 'Suplicantes, vos pedimos\nque, participando do Corpo e Sangue de Cristo,\nsejamos reunidos pelo Espírito Santo\nnum só corpo.' },
          { speaker: 'assembleia', text: 'O Espírito nos una num só corpo!' },
        ],
      },
      {
        key: 'intercessionsLiving',
        label: 'Intercessões pelos Viventes',
        lines: [
          { speaker: 'sacerdote', text: 'Lembrai-vos, ó Pai,\nda vossa Igreja que se faz presente pelo mundo inteiro;\nque ela cresça na caridade,\nem comunhão com o Papa N.,\ncom o nosso Bispo N.,\nos bispos do mundo inteiro,\nos presbíteros, os diáconos\ne todos os ministros do vosso povo.' },
          { speaker: 'assembleia', text: 'Lembrai-vos, ó Pai, da vossa Igreja!' },
        ],
      },
      {
        key: 'intercessionsDead',
        label: 'Intercessões pelos Defuntos',
        lines: [
          { speaker: 'sacerdote', text: 'Lembrai-vos também, na vossa misericórdia,\ndos nossos irmãos e irmãs\nque adormeceram na esperança da ressurreição\ne de todos os que partiram desta vida;\nacolhei-os junto a Vós\nna luz da vossa face.' },
          { speaker: 'assembleia', text: 'Concedei-lhes, ó Senhor, a luz eterna!' },
        ],
      },
      {
        key: 'finalIntercession',
        label: 'Intercessão Final',
        lines: [
          { speaker: 'sacerdote', text: 'Enfim, nós vos pedimos,\ntende piedade de todos nós\ne dai-nos participar da vida eterna,\ncom a Virgem Maria, Mãe de Deus,\nSão José, seu esposo, os Apóstolos,\ne todos os Santos que neste mundo\nviveram na vossa amizade,\na fim de vos louvarmos e glorificarmos\npor Jesus Cristo, vosso Filho.' },
        ],
      },
      {
        key: 'concludingDoxology',
        label: 'Doxologia Final',
        lines: [
          { speaker: 'sacerdote', text: 'Por Cristo,\ncom Cristo,\ne em Cristo,\na Vós, Deus Pai todo-poderoso,\nna unidade do Espírito Santo,\ntoda honra e toda glória,\npor todos os séculos dos séculos.' },
          { speaker: 'assembleia', text: 'Amém.' },
        ],
      },
    ],
  },
  {
    id: 3,
    title: 'Oração Eucarística III',
    sections: [
      {
        key: 'introductoryDialogue',
        label: 'Diálogo Inicial',
        lines: [
          { speaker: 'sacerdote', text: 'O Senhor esteja convosco.' },
          { speaker: 'assembleia', text: 'Ele está no meio de nós.' },
          { speaker: 'sacerdote', text: 'Corações ao alto.' },
          { speaker: 'assembleia', text: 'O nosso coração está em Deus.' },
          { speaker: 'sacerdote', text: 'Demos graças ao Senhor, nosso Deus.' },
          { speaker: 'assembleia', text: 'É nosso dever e nossa salvação.' },
        ],
      },
      {
        key: 'preface',
        label: 'Prefácio',
        lines: [
          { speaker: 'sacerdote', text: 'Na verdade, Senhor, vós sois santo, e com razão Vos louvam todas as criaturas, porque por Jesus Cristo, vosso Filho, Senhor nosso, com a força do Espírito Santo, dais vida e santificais o universo, e incessantemente reunis para Vós um povo que proclame a vossa glória.' },
          { speaker: 'assembleia', text: 'Santo, Santo, Santo, Senhor, Deus do Universo. Os céus e a terra estão repletos da vossa glória. Hosana nas alturas! Bendito o que vem em nome do Senhor! Hosana nas alturas!' },
        ],
      },
      {
        key: 'epiclesis',
        label: 'Epíclese',
        lines: [
          { speaker: 'rubrica', text: 'O sacerdote estende as mãos sobre as oferendas e diz:' },
          { speaker: 'sacerdote', text: 'Santificai, ó Deus, estas ofertas, derramando sobre elas o vosso Espírito, a fim de que se tornem para nós o Corpo e o Sangue de Jesus Cristo, vosso Filho e Senhor nosso.' },
          { speaker: 'assembleia', text: 'Enviai o vosso Espírito Santo!' },
        ],
      },
      {
        key: 'institutionNarrative',
        label: 'Narrativa da Instituição',
        lines: [
          { speaker: 'rubrica', text: 'O sacerdote segura o pão e diz:' },
          { speaker: 'sacerdote', text: 'Na noite em que foi traído, Ele tomou o pão, deu-Vos graças e bendisse, partiu-o e deu-o a seus discípulos, dizendo:' },
          { speaker: 'sacerdote', text: 'TOMAI, TODOS, E COMEI: ISTO É O MEU CORPO, QUE SERÁ ENTREGUE POR VÓS.' },
          { speaker: 'rubrica', text: 'Depois, segura o cálice e diz:' },
          { speaker: 'sacerdote', text: 'Do mesmo modo, ao fim da ceia, tomou o cálice, deu-Vos graças e bendisse, e deu-o a seus discípulos, dizendo:' },
          { speaker: 'sacerdote', text: 'TOMAI, TODOS, E BEBEI: ESTE É O CÁLICE DO MEU SANGUE, O SANGUE DA NOVA E ETERNA ALIANÇA, QUE SERÁ DERRAMADO POR VÓS E POR TODOS PARA A REMISSÃO DOS PECADOS. FAZEI ISTO EM MEMÓRIA DE MIM.' },
        ],
      },
      {
        key: 'memorialAcclamation',
        label: 'Mistério da Fé',
        lines: [
          { speaker: 'sacerdote', text: 'Mistério da fé!' },
          { speaker: 'assembleia', text: 'Anunciamos, Senhor, a vossa morte e proclamamos a vossa ressurreição. Vinde, Senhor Jesus!' },
        ],
      },
      {
        key: 'anamnesis',
        label: 'Anamnese',
        lines: [
          { speaker: 'sacerdote', text: 'Celebrando, pois, a memória da paixão do vosso Filho, da sua ressurreição dentre os mortos e da sua ascensão ao céu, enquanto esperamos a sua vinda gloriosa, nós Vos oferecemos, em ação de graças, este sacrifício vivo e santo.' },
          { speaker: 'sacerdote', text: 'Lembrai-Vos, Senhor, da vossa Igreja espalhada por todo o mundo, e fazei que cresça na caridade, em união com o Papa N., o nosso Bispo N., e todos os ministros do vosso povo.' },
        ],
      },
      {
        key: 'epiclesisUnion',
        label: 'Epíclese de Unidade',
        lines: [
          { speaker: 'sacerdote', text: 'E nós Vos suplicamos que, participando do Corpo e Sangue de Cristo, sejamos reunidos pelo Espírito Santo num só corpo.' },
          { speaker: 'assembleia', text: 'O Espírito nos una num só corpo!' },
        ],
      },
      {
        key: 'intercessions',
        label: 'Intercessões',
        lines: [
          { speaker: 'sacerdote', text: 'Lembrai-Vos, Senhor, dos vossos filhos e filhas que partiram desta vida, marcados com o sinal da fé. Concedei-lhes a felicidade do vosso reino, onde esperamos ser admitidos para gozar a plenitude da vossa glória.' },
          { speaker: 'assembleia', text: 'É da vossa bondade que sejamos admitidos no vosso reino.' },
        ],
      },
      {
        key: 'concludingDoxology',
        label: 'Doxologia Final',
        lines: [
          { speaker: 'rubrica', text: 'O sacerdote ergue o cálice e o pão, proclama em voz alta:' },
          { speaker: 'sacerdote', text: 'Por Cristo, com Cristo, em Cristo, a Vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda a honra e toda a glória, agora e para sempre.' },
          { speaker: 'assembleia', text: 'Amém.' },
        ],
      },
    ],
  },
  {
    id: 4,
    title: 'Oração Eucarística IV',
    sections: [
      {
        key: 'introductoryDialogue',
        label: 'Diálogo Inicial',
        lines: [
          { speaker: 'sacerdote', text: 'O Senhor esteja convosco.' },
          { speaker: 'assembleia', text: 'Ele está no meio de nós.' },
          { speaker: 'sacerdote', text: 'Corações ao alto.' },
          { speaker: 'assembleia', text: 'O nosso coração está em Deus.' },
          { speaker: 'sacerdote', text: 'Demos graças ao Senhor, nosso Deus.' },
          { speaker: 'assembleia', text: 'É nosso dever e nossa salvação.' },
        ],
      },
      {
        key: 'preface',
        label: 'Prefácio',
        lines: [
          { speaker: 'sacerdote', text: 'Na verdade, Senhor, é justo e necessário dar-Vos graças, sempre e em todo o lugar, mas de modo especial nós Vos louvamos, porque sois o Deus verdadeiro e único, que viveis e reinais para sempre.' },
          { speaker: 'assembleia', text: 'Santo, Santo, Santo, Senhor, Deus do Universo. Os céus e a terra estão repletos da vossa glória. Hosana nas alturas! Bendito o que vem em nome do Senhor! Hosana nas alturas!' },
        ],
      },
      {
        key: 'epiclesis',
        label: 'Epíclese',
        lines: [
          { speaker: 'rubrica', text: 'O sacerdote estende as mãos sobre as oferendas e diz:' },
          { speaker: 'sacerdote', text: 'Enviai, ó Deus, o vosso Espírito Santo sobre estas ofertas, para que se tornem o Corpo e o Sangue de Jesus Cristo, vosso Filho e Senhor nosso.' },
          { speaker: 'assembleia', text: 'Enviai o vosso Espírito Santo!' },
        ],
      },
      {
        key: 'institutionNarrative',
        label: 'Narrativa da Instituição',
        lines: [
          { speaker: 'rubrica', text: 'O sacerdote segura o pão e diz:' },
          { speaker: 'sacerdote', text: 'Ele, tendo amado os seus que estavam no mundo, amou-os até o fim. Na noite em que ia ser entregue, tomou o pão, deu-Vos graças e bendisse, partiu-o e deu-o a seus discípulos, dizendo:' },
          { speaker: 'sacerdote', text: 'TOMAI, TODOS, E COMEI: ISTO É O MEU CORPO, QUE SERÁ ENTREGUE POR VÓS.' },
          { speaker: 'rubrica', text: 'Depois, segura o cálice e diz:' },
          { speaker: 'sacerdote', text: 'Do mesmo modo, ao fim da ceia, tomou o cálice, deu-Vos graças e bendisse, e deu-o a seus discípulos, dizendo:' },
          { speaker: 'sacerdote', text: 'TOMAI, TODOS, E BEBEI: ESTE É O CÁLICE DO MEU SANGUE, O SANGUE DA NOVA E ETERNA ALIANÇA, QUE SERÁ DERRAMADO POR VÓS E POR TODOS PARA A REMISSÃO DOS PECADOS. FAZEI ISTO EM MEMÓRIA DE MIM.' },
        ],
      },
      {
        key: 'memorialAcclamation',
        label: 'Mistério da Fé',
        lines: [
          { speaker: 'sacerdote', text: 'Mistério da fé!' },
          { speaker: 'assembleia', text: 'Anunciamos, Senhor, a vossa morte e proclamamos a vossa ressurreição. Vinde, Senhor Jesus!' },
        ],
      },
      {
        key: 'anamnesis',
        label: 'Anamnese',
        lines: [
          { speaker: 'sacerdote', text: 'Celebrando, pois, a memória da paixão do vosso Filho que nos salva, da sua admirável ressurreição e da sua ascensão ao céu, e contemplando a sua vinda gloriosa, nós Vos oferecemos, em ação de graças, este sacrifício vivo e santo.' },
          { speaker: 'sacerdote', text: 'Lembrai-Vos, Senhor, de todos os que partiram desta vida, na esperança da ressurreição, e de todos os que repousam em Cristo. Concedei-lhes a felicidade do vosso reino.' },
        ],
      },
      {
        key: 'epiclesisUnion',
        label: 'Epíclese de Unidade',
        lines: [
          { speaker: 'sacerdote', text: 'E nós Vos suplicamos que, participando do Corpo e Sangue de Cristo, sejamos reunidos pelo Espírito Santo num só corpo.' },
          { speaker: 'assembleia', text: 'O Espírito nos una num só corpo!' },
        ],
      },
      {
        key: 'intercessions',
        label: 'Intercessões',
        lines: [
          { speaker: 'sacerdote', text: 'Lembrai-Vos, Senhor, de todos os que partiram desta vida, na esperança da ressurreição, e de todos os que repousam em Cristo. Concedei-lhes a felicidade do vosso reino.' },
          { speaker: 'assembleia', text: 'É da vossa bondade que sejamos admitidos no vosso reino.' },
        ],
      },
      {
        key: 'concludingDoxology',
        label: 'Doxologia Final',
        lines: [
          { speaker: 'rubrica', text: 'O sacerdote ergue o cálice e o pão, proclama em voz alta:' },
          { speaker: 'sacerdote', text: 'Por Cristo, com Cristo, em Cristo, a Vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda a honra e toda a glória, agora e para sempre.' },
          { speaker: 'assembleia', text: 'Amém.' },
        ],
      },
    ],
  },
];
