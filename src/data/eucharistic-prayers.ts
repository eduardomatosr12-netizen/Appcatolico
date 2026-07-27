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
        key: 'canonPrincipal',
        label: 'Cânone Principal',
        lines: [
          { speaker: 'sacerdote', text: 'Pai de misericórdia, a quem sobem nossos louvores, suplicantes, vos rogamos e pedimos por Jesus Cristo, vosso Filho e Senhor nosso, que aceiteis e abençoeis ✠ estes dons, estas oferendas, este sacrifício puro e santo, que oferecemos, antes de tudo, pela vossa Igreja santa e católica: concedei-lhe paz e proteção, unindo-a num só corpo e governando-a por toda a terra, em comunhão com vosso servo o Papa N., o nosso Bispo N., e todos os que guardam a fé católica que receberam dos Apóstolos.' },
          { speaker: 'assembleia', text: 'Abençoai nossa oferenda, ó Senhor!' },
        ],
      },
      {
        key: 'firstCommemoration',
        label: 'Primeira Comemoração',
        lines: [
          { speaker: 'sacerdote', text: 'Lembrai-vos, ó Pai, dos vossos filhos e filhas N. N. e de todos os que circundam este altar, dos quais conheceis a fé e a dedicação ao vosso serviço. ★ Por eles nós vos oferecemos e também eles vos oferecem este sacrifício de louvor por si e por todos os seus, e elevam a vós as suas preces, Deus eterno, vivo e verdadeiro, para alcançar o perdão de suas faltas, a segurança em suas vidas e a salvação que esperam.' },
          { speaker: 'assembleia', text: 'Lembrai-vos, ó Pai, dos vossos filhos!' },
        ],
      },
      {
        key: 'secondCommemoration',
        label: 'Comunhão com os Santos',
        lines: [
          { speaker: 'sacerdote', text: 'Em comunhão com toda a Igreja, celebramos em primeiro lugar a memória da Mãe de nosso Deus e Senhor Jesus Cristo, a gloriosa sempre Virgem Maria, a de seu esposo São José, e também a dos Santos Apóstolos e Mártires: Pedro e Paulo, André, Tiago e João, Tomé, Tiago e Filipe, Bartolomeu e Mateus, Simão e Tadeu, Lino, Cleto, Clemente, Sisto, Cornélio e Cipriano, Lourenço e Crisógono, João e Paulo, Cosme e Damião, e a de todos os vossos Santos. Por seus méritos e preces concedei-nos sem cessar a vossa proteção.' },
          { speaker: 'assembleia', text: 'Em comunhão com vossos Santos vos louvamos!' },
        ],
      },
      {
        key: 'canonContinuation',
        label: 'Continuação do Cânone',
        lines: [
          { speaker: 'sacerdote', text: 'Aceitai, ó Pai, com bondade, a oblação dos vossos servos e de toda a vossa família; dai-nos sempre a vossa paz, livrai-nos da condenação eterna e acolhei-nos entre os vossos eleitos.' },
        ],
      },
      {
        key: 'consecration',
        label: 'Consagração',
        lines: [
          { speaker: 'sacerdote', text: 'Dignai-vos, ó Pai, aceitar, abençoar e santificar estas oferendas; recebei-as como sacrifício espiritual perfeito, a fim de que se tornem para nós o Corpo e o Sangue de vosso amado Filho, nosso Senhor Jesus Cristo.' },
          { speaker: 'assembleia', text: 'Enviai o vosso Espírito Santo!' },
        ],
      },
      {
        key: 'institutionNarrative',
        label: 'Narrativa da Instituição',
        lines: [
          { speaker: 'rubrica', text: 'Na véspera de sua paixão,' },
          { speaker: 'sacerdote', text: 'ele tomou o pão em suas santas e veneráveis mãos, elevou os olhos ao céu, a vós, ó Pai todo-poderoso, pronunciou a bênção de ação de graças, partiu o pão e o deu a seus discípulos, dizendo:' },
          { speaker: 'sacerdote', text: 'TOMAI, TODOS, E COMEI:\nISTO É O MEU CORPO,\nQUE SERÁ ENTREGUE POR VÓS.' },
          { speaker: 'rubrica', text: 'Do mesmo modo,' },
          { speaker: 'sacerdote', text: 'no fim da ceia, ele tomou este precioso cálice em suas santas e veneráveis mãos, pronunciou novamente a bênção de ação de graças e o deu a seus discípulos, dizendo:' },
          { speaker: 'sacerdote', text: 'TOMAI, TODOS, E BEBEI:\nESTE É O CÁLICE DO MEU SANGUE,\nO SANGUE DA NOVA E ETERNA ALIANÇA,\nQUE SERÁ DERRAMADO POR VÓS E POR TODOS\nPARA REMISSÃO DOS PECADOS.\nFAZEI ISTO EM MEMÓRIA DE MIM.' },
        ],
      },
      {
        key: 'memorialAcclamation',
        label: 'Mistério da Fé',
        lines: [
          { speaker: 'sacerdote', text: 'Mistério da fé!' },
          { speaker: 'assembleia', text: 'Anunciamos, Senhor, a vossa morte e proclamamos a vossa ressurreição. Vinde, Senhor Jesus!' },
          { speaker: 'assembleia', text: 'Ou:\nMistério da fé e do amor!\nTodas as vezes que comemos deste pão e bebemos deste cálice, anunciamos, Senhor, a vossa morte, enquanto esperamos a vossa vinda!' },
          { speaker: 'assembleia', text: 'Ou:\nMistério da fé para a salvação do mundo!\nSalvador do mundo, salvai-nos, vós que nos libertastes pela cruz e ressurreição.' },
        ],
      },
      {
        key: 'anamnesis',
        label: 'Anamnese',
        lines: [
          { speaker: 'sacerdote', text: 'Celebrando, pois, a memória da bem-aventurada paixão do vosso Filho, da sua ressurreição dentre os mortos e gloriosa ascensão aos céus, nós, vossos servos, e também vosso povo santo, vos oferecemos, ó Pai, dentre os bens que nos destes, o sacrifício puro, santo e imaculado, Pão santo da vida eterna e Cálice da perpétua salvação.' },
          { speaker: 'sacerdote', text: 'Recebei, ó Pai, com olhar benigno, esta oferta, como recebestes os dons do justo Abel, o sacrifício de nosso patriarca Abraão e a oblação pura e santa do sumo sacerdote Melquisedeque.' },
          { speaker: 'assembleia', text: 'Aceitai, ó Senhor, a nossa oferta!' },
        ],
      },
      {
        key: 'epiclesisUnion',
        label: 'Epíclese de Unidade',
        lines: [
          { speaker: 'sacerdote', text: 'Suplicantes, vos pedimos, ó Deus onipotente, que esta nossa oferenda seja levada à vossa presença, no altar do céu, pelas mãos do vosso santo Anjo, para que todos nós, participando deste altar, pela comunhão do santíssimo Corpo e Sangue do vosso Filho, sejamos repletos de todas as graças e bênçãos do céu.' },
          { speaker: 'assembleia', text: 'O Espírito nos una num só corpo!' },
        ],
      },
      {
        key: 'intercessionsDead',
        label: 'Intercessões pelos Defuntos',
        lines: [
          { speaker: 'sacerdote', text: 'Lembrai-vos, ó Pai, dos vossos filhos e filhas N. N. que nos precederam com o sinal da fé e dormem o sono da paz. A eles, e a todos os que descansam no Cristo, concedei o repouso, a luz e a paz.' },
          { speaker: 'assembleia', text: 'Concedei-lhes, ó Senhor, a luz eterna!' },
        ],
      },
      {
        key: 'finalIntercession',
        label: 'Intercessão Final',
        lines: [
          { speaker: 'sacerdote', text: 'E a todos nós pecadores, que esperamos na vossa infinita misericórdia, concedei, não por nossos méritos, mas por vossa bondade, o convívio dos Apóstolos e Mártires: João Batista e Estêvão, Matias e Barnabé, Inácio, Alexandre, Marcelino e Pedro, Felicidade e Perpétua, Águeda e Luzia, Inês, Cecília, Anastácia, e de todos os vossos Santos. Por Cristo, nosso Senhor.' },
          { speaker: 'sacerdote', text: 'Por ele não cessais de criar, santificar, vivificar, abençoar estes bens e distribuí-los entre nós.' },
        ],
      },
      {
        key: 'concludingDoxology',
        label: 'Doxologia Final',
        lines: [
          { speaker: 'sacerdote', text: 'Por Cristo, com Cristo, e em Cristo, a vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda honra e toda glória, por todos os séculos dos séculos.' },
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
          { speaker: 'sacerdote', text: 'Na verdade, é digno e justo, é nosso dever e salvação dar-vos graças sempre e em todo lugar, Senhor, Pai santo, por vosso amado Filho, Jesus Cristo. Ele é a vossa Palavra, pela qual tudo criastes. Ele é o nosso Salvador e Redentor, que se encarnou pelo Espírito Santo e nasceu da Virgem Maria. Ele, para cumprir a vossa vontade e adquirir para vós um povo santo, estendeu os braços na hora da sua paixão, a fim de vencer a morte e manifestar a ressurreição. Por isso, com os Anjos e todos os Santos, proclamamos vossa glória, cantando (dizendo) a uma só voz:' },
          { speaker: 'assembleia', text: 'Santo, Santo, Santo, Senhor, Deus do universo. O céu e a terra proclamam a vossa glória. Hosana nas alturas! Bendito o que vem em nome do Senhor! Hosana nas alturas!' },
        ],
      },
      {
        key: 'epiclesis',
        label: 'Epíclese',
        lines: [
          { speaker: 'sacerdote', text: 'Na verdade, ó Pai, vós sois Santo, fonte de toda santidade.' },
          { speaker: 'sacerdote', text: 'Santificai, pois, estes dons, derramando sobre eles o vosso Espírito, a fim de que se tornem para nós o Corpo e ✠ o Sangue de nosso Senhor Jesus Cristo.' },
          { speaker: 'assembleia', text: 'Enviai o vosso Espírito Santo!' },
        ],
      },
      {
        key: 'institutionNarrative',
        label: 'Narrativa da Instituição',
        lines: [
          { speaker: 'rubrica', text: 'Estando para ser entregue' },
          { speaker: 'sacerdote', text: 'e abraçando livremente a paixão, Jesus tomou o pão, pronunciou a bênção de ação de graças, partiu e o deu a seus discípulos, dizendo:' },
          { speaker: 'sacerdote', text: 'TOMAI, TODOS, E COMEI:\nISTO É O MEU CORPO,\nQUE SERÁ ENTREGUE POR VÓS.' },
          { speaker: 'rubrica', text: 'Do mesmo modo,' },
          { speaker: 'sacerdote', text: 'no fim da ceia, ele tomou o cálice em suas mãos e, dando graças novamente, o entregou a seus discípulos, dizendo:' },
          { speaker: 'sacerdote', text: 'TOMAI, TODOS, E BEBEI:\nESTE É O CÁLICE DO MEU SANGUE,\nO SANGUE DA NOVA E ETERNA ALIANÇA,\nQUE SERÁ DERRAMADO POR VÓS E POR TODOS\nPARA REMISSÃO DOS PECADOS.\nFAZEI ISTO EM MEMÓRIA DE MIM.' },
        ],
      },
      {
        key: 'memorialAcclamation',
        label: 'Mistério da Fé',
        lines: [
          { speaker: 'sacerdote', text: 'Mistério da fé!' },
          { speaker: 'assembleia', text: 'Anunciamos, Senhor, a vossa morte e proclamamos a vossa ressurreição. Vinde, Senhor Jesus!' },
          { speaker: 'assembleia', text: 'Ou:\nMistério da fé e do amor!\nTodas as vezes que comemos deste pão e bebemos deste cálice, anunciamos, Senhor, a vossa morte, enquanto esperamos a vossa vinda!' },
          { speaker: 'assembleia', text: 'Ou:\nMistério da fé para a salvação do mundo!\nSalvador do mundo, salvai-nos, vós que nos libertastes pela cruz e ressurreição.' },
        ],
      },
      {
        key: 'anamnesis',
        label: 'Anamnese',
        lines: [
          { speaker: 'sacerdote', text: 'Celebrando, pois, o memorial da morte e ressurreição do vosso Filho, nós vos oferecemos, ó Pai, o Pão da vida e o Cálice da salvação; e vos agradecemos porque nos tornastes dignos de estar aqui na vossa presença e vos servir.' },
          { speaker: 'assembleia', text: 'Aceitai, ó Senhor, a nossa oferta!' },
        ],
      },
      {
        key: 'epiclesisUnion',
        label: 'Epíclese de Unidade',
        lines: [
          { speaker: 'sacerdote', text: 'Suplicantes, vos pedimos que, participando do Corpo e Sangue de Cristo, sejamos reunidos pelo Espírito Santo num só corpo.' },
          { speaker: 'assembleia', text: 'O Espírito nos una num só corpo!' },
        ],
      },
      {
        key: 'intercessionsLiving',
        label: 'Intercessões pelos Viventes',
        lines: [
          { speaker: 'sacerdote', text: 'Lembrai-vos, ó Pai, da vossa Igreja que se faz presente pelo mundo inteiro; que ela cresça na caridade, em comunhão com o Papa N., com o nosso Bispo N., os bispos do mundo inteiro, os presbíteros, os diáconos e todos os ministros do vosso povo.' },
          { speaker: 'assembleia', text: 'Lembrai-vos, ó Pai, da vossa Igreja!' },
        ],
      },
      {
        key: 'intercessionsDead',
        label: 'Intercessões pelos Defuntos',
        lines: [
          { speaker: 'sacerdote', text: 'Lembrai-vos também, na vossa misericórdia, dos nossos irmãos e irmãs que adormeceram na esperança da ressurreição e de todos os que partiram desta vida; acolhei-os junto a vós na luz da vossa face.' },
          { speaker: 'assembleia', text: 'Concedei-lhes, ó Senhor, a luz eterna!' },
        ],
      },
      {
        key: 'finalIntercession',
        label: 'Intercessão Final',
        lines: [
          { speaker: 'sacerdote', text: 'Enfim, nós vos pedimos, tende piedade de todos nós e dai-nos participar da vida eterna, com a Virgem Maria, Mãe de Deus, São José, seu esposo, os Apóstolos e todos os Santos que neste mundo viveram na vossa amizade, a fim de vos louvarmos e glorificarmos por Jesus Cristo, vosso Filho.' },
        ],
      },
      {
        key: 'concludingDoxology',
        label: 'Doxologia Final',
        lines: [
          { speaker: 'sacerdote', text: 'Por Cristo, com Cristo, e em Cristo, a vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda honra e toda glória, por todos os séculos dos séculos.' },
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
          { speaker: 'sacerdote', text: 'Na verdade, vós sois Santo, ó Deus do universo, e tudo o que criastes proclama o vosso louvor, porque, por Jesus Cristo, vosso Filho e Senhor nosso, e pela força do Espírito Santo, dais vida e santidade a todas as coisas e não cessais de reunir para vós um povo que vos ofereça em toda parte, do nascer ao pôr do sol, um sacrifício perfeito.' },
        ],
      },
      {
        key: 'epiclesis',
        label: 'Epíclese',
        lines: [
          { speaker: 'sacerdote', text: 'Por isso, ó Pai, nós vos suplicamos: santificai pelo Espírito Santo as oferendas que vos apresentamos para serem consagradas a fim de que se tornem o Corpo ✠ e o Sangue de vosso Filho, nosso Senhor Jesus Cristo, que nos mandou celebrar estes mistérios.' },
          { speaker: 'assembleia', text: 'Enviai o vosso Espírito Santo!' },
        ],
      },
      {
        key: 'institutionNarrative',
        label: 'Narrativa da Instituição',
        lines: [
          { speaker: 'rubrica', text: 'Na noite em que ia ser entregue,' },
          { speaker: 'sacerdote', text: 'Jesus tomou o pão, pronunciou a bênção de ação de graças, partiu e o deu a seus discípulos, dizendo:' },
          { speaker: 'sacerdote', text: 'TOMAI, TODOS, E COMEI:\nISTO É O MEU CORPO,\nQUE SERÁ ENTREGUE POR VÓS.' },
          { speaker: 'rubrica', text: 'Do mesmo modo,' },
          { speaker: 'sacerdote', text: 'no fim da ceia, ele tomou o cálice em suas mãos, pronunciou a bênção de ação de graças, e o deu a seus discípulos, dizendo:' },
          { speaker: 'sacerdote', text: 'TOMAI, TODOS, E BEBEI:\nESTE É O CÁLICE DO MEU SANGUE,\nO SANGUE DA NOVA E ETERNA ALIANÇA,\nQUE SERÁ DERRAMADO POR VÓS E POR TODOS\nPARA REMISSÃO DOS PECADOS.\nFAZEI ISTO EM MEMÓRIA DE MIM.' },
        ],
      },
      {
        key: 'memorialAcclamation',
        label: 'Mistério da Fé',
        lines: [
          { speaker: 'sacerdote', text: 'Mistério da fé!' },
          { speaker: 'assembleia', text: 'Anunciamos, Senhor, a vossa morte e proclamamos a vossa ressurreição. Vinde, Senhor Jesus!' },
          { speaker: 'assembleia', text: 'Ou:\nMistério da fé e do amor!\nTodas as vezes que comemos deste pão e bebemos deste cálice, anunciamos, Senhor, a vossa morte, enquanto esperamos a vossa vinda!' },
          { speaker: 'assembleia', text: 'Ou:\nMistério da fé para a salvação do mundo!\nSalvador do mundo, salvai-nos, vós que nos libertastes pela cruz e ressurreição.' },
        ],
      },
      {
        key: 'anamnesis',
        label: 'Anamnese',
        lines: [
          { speaker: 'sacerdote', text: 'Celebrando agora, ó Pai, o memorial da paixão redentora do vosso Filho, da sua gloriosa ressurreição e ascensão ao céu, e enquanto esperamos sua nova vinda, nós vos oferecemos em ação de graças este sacrifício vivo e santo.' },
          { speaker: 'assembleia', text: 'Aceitai, ó Senhor, a nossa oferta!' },
        ],
      },
      {
        key: 'epiclesisUnion',
        label: 'Epíclese de Unidade',
        lines: [
          { speaker: 'sacerdote', text: 'Olhai com bondade a oblação da vossa Igreja e reconhecei nela o sacrifício que nos reconciliou convosco; concedei que, alimentando-nos com o Corpo e o Sangue do vosso Filho, repletos do Espírito Santo, nos tornemos em Cristo um só corpo e um só espírito.' },
          { speaker: 'assembleia', text: 'O Espírito nos una num só corpo!' },
        ],
      },
      {
        key: 'intercessionsLiving',
        label: 'Intercessões pelos Viventes',
        lines: [
          { speaker: 'sacerdote', text: 'Que o mesmo Espírito faça de nós uma eterna oferenda para alcançarmos a herança com os vossos eleitos: a santíssima Virgem Maria, Mãe de Deus, São José, seu esposo, os vossos santos Apóstolos e gloriosos Mártires, e todos os Santos, que não cessam de interceder por nós na vossa presença.' },
          { speaker: 'assembleia', text: 'Fazei de nós uma perfeita oferenda!' },
        ],
      },
      {
        key: 'intercessionsLiving2',
        label: 'Intercessão pela Igreja',
        lines: [
          { speaker: 'sacerdote', text: 'Nós vos suplicamos, Senhor, que este sacrifício da nossa reconciliação estenda a paz e a salvação ao mundo inteiro. Confirmai na fé e na caridade a vossa Igreja que caminha neste mundo com o vosso servo o Papa N. e o nosso Bispo N., com os bispos do mundo inteiro, os presbíteros e diáconos, os outros ministros e o povo por vós redimido. ★ Atendei propício às preces desta família, que reunistes em vossa presença. Reconduzi a vós, Pai de misericórdia, todos os vossos filhos e filhas dispersos pelo mundo inteiro.' },
          { speaker: 'assembleia', text: 'Lembrai-vos, ó Pai, da vossa Igreja!' },
        ],
      },
      {
        key: 'intercessionsDead',
        label: 'Intercessões pelos Defuntos',
        lines: [
          { speaker: 'sacerdote', text: 'Acolhei com bondade no vosso reino os nossos irmãos e irmãs que partiram desta vida e todos os que morreram na vossa amizade. Unidos a eles, esperamos também nós saciar-nos eternamente da vossa glória, por Cristo, Senhor nosso. Por ele dais ao mundo todo bem e toda graça.' },
        ],
      },
      {
        key: 'concludingDoxology',
        label: 'Doxologia Final',
        lines: [
          { speaker: 'sacerdote', text: 'Por Cristo, com Cristo, e em Cristo, a vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda honra e toda glória, por todos os séculos dos séculos.' },
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
          { speaker: 'sacerdote', text: 'Na verdade, ó Pai, é nosso dever dar-vos graças, é nossa salvação dar-vos glória. Só vós sois o Deus vivo e verdadeiro que existis antes de todo o tempo e permaneceis para sempre, habitando em luz inacessível.' },
          { speaker: 'sacerdote', text: 'Mas, porque sois o Deus de bondade e a fonte da vida, fizestes todas as coisas para cobrir de bênçãos as vossas criaturas e a muitos alegrar com o esplendor da vossa luz.' },
          { speaker: 'sacerdote', text: 'Eis, pois, diante de vós os inumeráveis coros dos Anjos que dia e noite vos servem e, contemplando a glória da vossa face, vos louvam sem cessar. Com eles também nós e, por nossa voz, tudo o que criastes celebramos vosso Nome e, exultantes de alegria, cantamos (dizemos) a uma só voz:' },
          { speaker: 'assembleia', text: 'Santo, Santo, Santo...' },
        ],
      },
      {
        key: 'canonPrincipal',
        label: 'Cânone Principal',
        lines: [
          { speaker: 'sacerdote', text: 'Nós proclamamos vossa grandeza, Pai santo, a sabedoria e o amor com que fizestes todas as coisas. Criastes o ser humano à vossa imagem e lhe confiastes todo o universo para que, servindo somente a vós, seu Criador, cuidasse de toda criatura. E quando pela desobediência perdeu a vossa amizade, não o abandonastes ao poder da morte. A todos, porém, socorrestes com misericórdia, para que, ao procurar-vos, vos encontrassem. Muitas vezes oferecestes aliança à família humana e a instruístes pelos profetas na esperança da salvação.' },
          { speaker: 'assembleia', text: 'A todos socorrestes com bondade!' },
        ],
      },
      {
        key: 'gospelAcclamation',
        label: 'Proclamação do Evangelho',
        lines: [
          { speaker: 'sacerdote', text: 'E de tal modo, Pai santo, amastes o mundo que, chegada a plenitude dos tempos, nos enviastes vosso próprio Filho para ser o nosso Salvador. Encarnado pelo poder do Espírito Santo e nascido da Virgem Maria, Jesus viveu em tudo a condição humana, menos o pecado; anunciou aos pobres a salvação, aos oprimidos, a liberdade, aos tristes, a alegria. Para cumprir o vosso plano de amor, entregou-se à morte e, ressuscitando, destruiu a morte e renovou a vida.' },
          { speaker: 'assembleia', text: 'Por amor nos enviastes vosso Filho!' },
          { speaker: 'sacerdote', text: 'E, a fim de não mais vivermos para nós, mas para ele, que por nós morreu e ressuscitou, enviou de vós, ó Pai, como primeiro dom aos vossos fiéis, o Espírito Santo, que continua sua obra no mundo para levar à plenitude toda a santificação.' },
        ],
      },
      {
        key: 'epiclesis',
        label: 'Epíclese',
        lines: [
          { speaker: 'sacerdote', text: 'Por isso, nós vos pedimos, ó Pai, que o mesmo Espírito Santo santifique estas oferendas, a fim de que se tornem o Corpo e ✠ o Sangue de Jesus Cristo, vosso Filho e Senhor nosso, para celebrarmos este grande mistério que ele nos deixou em sinal da eterna aliança.' },
          { speaker: 'assembleia', text: 'Enviai o vosso Espírito Santo!' },
        ],
      },
      {
        key: 'institutionNarrative',
        label: 'Narrativa da Instituição',
        lines: [
          { speaker: 'rubrica', text: 'Quando, pois, chegou a hora' },
          { speaker: 'sacerdote', text: 'em que por vós, ó Pai, ia ser glorificado, tendo amado os seus que estavam no mundo, amou-os até o fim. Enquanto ceavam, Jesus tomou o pão, pronunciou a bênção de ação de graças, partiu e o deu a seus discípulos, dizendo:' },
          { speaker: 'sacerdote', text: 'TOMAI, TODOS, E COMEI:\nISTO É O MEU CORPO,\nQUE SERÁ ENTREGUE POR VÓS.' },
          { speaker: 'rubrica', text: 'Do mesmo modo,' },
          { speaker: 'sacerdote', text: 'ele tomou em suas mãos o cálice com vinho, deu-vos graças novamente, e o deu a seus discípulos, dizendo:' },
          { speaker: 'sacerdote', text: 'TOMAI, TODOS, E BEBEI:\nESTE É O CÁLICE DO MEU SANGUE,\nO SANGUE DA NOVA E ETERNA ALIANÇA,\nQUE SERÁ DERRAMADO POR VÓS E POR TODOS,\nPARA A REMISSÃO DOS PECADOS.\nFAZEI ISTO EM MEMÓRIA DE MIM.' },
        ],
      },
      {
        key: 'memorialAcclamation',
        label: 'Mistério da Fé',
        lines: [
          { speaker: 'sacerdote', text: 'Mistério da fé!' },
          { speaker: 'assembleia', text: 'Anunciamos, Senhor, a vossa morte e proclamamos a vossa ressurreição. Vinde, Senhor Jesus!' },
          { speaker: 'assembleia', text: 'Ou:\nMistério da fé e do amor!\nTodas as vezes que comemos deste pão e bebemos deste cálice, anunciamos, Senhor, a vossa morte, enquanto esperamos a vossa vinda!' },
          { speaker: 'assembleia', text: 'Ou:\nMistério da fé para a salvação do mundo!\nSalvador do mundo, salvai-nos, vós que nos libertastes pela cruz e ressurreição.' },
        ],
      },
      {
        key: 'anamnesis',
        label: 'Anamnese',
        lines: [
          { speaker: 'sacerdote', text: 'Celebrando, agora, ó Pai, a memória da nossa redenção, anunciamos a morte de Cristo e sua descida entre os mortos, proclamamos a sua ressurreição e ascensão à vossa direita e, esperando a sua vinda gloriosa, nós vos oferecemos o seu corpo e Sangue, sacrifício do vosso agrado e salvação para o mundo inteiro.' },
          { speaker: 'assembleia', text: 'Aceitai, ó Senhor, a nossa oferta!' },
          { speaker: 'sacerdote', text: 'Olhai, com bondade, a oblação que destes à vossa Igreja e concedei aos que vamos participar do mesmo pão e do mesmo cálice que, reunidos pelo Espírito Santo num só corpo, nos tornemos em Cristo uma oferenda viva para o louvor da vossa glória.' },
          { speaker: 'assembleia', text: 'O Espírito nos una num só corpo!' },
        ],
      },
      {
        key: 'intercessionsLiving',
        label: 'Intercessões pelos Viventes',
        lines: [
          { speaker: 'sacerdote', text: '★ E agora, ó Pai, lembrai-vos de todos pelos quais vos oferecemos este sacrifício: o vosso servo o Papa N., o nosso Bispo N., os bispos do mundo inteiro, os presbíteros, os diáconos, e todos os ministros da vossa Igreja, os fiéis que, ao redor deste altar, se unem à nossa oferta, o povo que vos pertence e aqueles que vos procuram de coração sincero.' },
          { speaker: 'assembleia', text: 'Lembrai-vos, ó Pai, da vossa Igreja!' },
        ],
      },
      {
        key: 'intercessionsDead',
        label: 'Intercessões pelos Defuntos',
        lines: [
          { speaker: 'sacerdote', text: 'Lembrai-vos também dos que morreram na paz do vosso Cristo e de todos os defuntos dos quais só vós conhecestes a fé.' },
          { speaker: 'assembleia', text: 'Concedei-lhes, ó Senhor, a luz eterna!' },
        ],
      },
      {
        key: 'finalIntercession',
        label: 'Intercessão Final',
        lines: [
          { speaker: 'sacerdote', text: 'E a todos nós, vossos filhos e filhas, concedei, ó Pai de bondade, alcançar a herança eterna, com a Virgem Maria, Mãe de Deus, São José, seu esposo, os Apóstolos e todos os Santos, no vosso reino, onde, com todas as criaturas, libertas da corrupção do pecado e da morte, vos glorificaremos por Cristo, Senhor nosso, por quem dais ao mundo todo bem e toda graça.' },
        ],
      },
      {
        key: 'concludingDoxology',
        label: 'Doxologia Final',
        lines: [
          { speaker: 'sacerdote', text: 'Por Cristo, com Cristo, e em Cristo, a vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda honra e toda glória, por todos os séculos dos séculos.' },
          { speaker: 'assembleia', text: 'Amém.' },
        ],
      },
    ],
  },
  {
    id: 5,
    title: 'Oração Eucarística V',
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
          { speaker: 'sacerdote', text: 'É justo e nos faz todos ser mais santos louvar a vós, ó Pai, no mundo inteiro, de dia e de noite, agradecendo com Cristo, vosso Filho, nosso irmão.' },
          { speaker: 'sacerdote', text: 'É ele o sacerdote verdadeiro que sempre se oferece por nós todos, mandando que se faça a mesma coisa que fez naquela ceia derradeira.' },
          { speaker: 'sacerdote', text: 'Por isso, aqui estamos reunidos, louvando e agradecendo com alegria, juntando nossa voz à voz dos anjos e à voz dos santos todos, para cantar (dizer):' },
          { speaker: 'assembleia', text: 'Santo, Santo, Santo, Senhor, Deus do universo! O céu e a terra proclamam a vossa glória. Hosana nas alturas! Bendito o que vem em nome do Senhor! Hosana nas alturas!' },
        ],
      },
      {
        key: 'epiclesis',
        label: 'Epíclese',
        lines: [
          { speaker: 'sacerdote', text: 'Ó Pai, vós que sempre quisestes ficar muito perto de nós, vivendo conosco no Cristo, falando conosco por ele,' },
          { speaker: 'sacerdote', text: 'CC mandai vosso Espírito Santo, a fim de que as nossas ofertas se mudem no Corpo ✠ e no Sangue de nosso Senhor Jesus Cristo.' },
          { speaker: 'assembleia', text: 'Mandai vosso Espírito Santo!' },
        ],
      },
      {
        key: 'institutionNarrative',
        label: 'Narrativa da Instituição',
        lines: [
          { speaker: 'rubrica', text: 'Na noite em que ia ser entregue,' },
          { speaker: 'sacerdote', text: 'ceando com seus Apóstolos, Jesus tomou o pão em suas mãos, olhou para o céu e vos deu graças, partiu o pão e o entregou a seus discípulos, dizendo:' },
          { speaker: 'sacerdote', text: 'TOMAI, TODOS, E COMEI:\nISTO É O MEU CORPO,\nQUE SERÁ ENTREGUE POR VÓS.' },
          { speaker: 'rubrica', text: 'Do mesmo modo, no fim da ceia,' },
          { speaker: 'sacerdote', text: 'tomou o cálice em suas mãos, deu-vos graças novamente e o entregou a seus discípulos, dizendo:' },
          { speaker: 'sacerdote', text: 'TOMAI, TODOS, E BEBEI:\nESTE É O CÁLICE DO MEU SANGUE,\nO SANGUE DA NOVA E ETERNA ALIANÇA,\nQUE SERÁ DERRAMADO POR VÓS E POR TODOS,\nPARA REMISSÃO DOS PECADOS.\nFAZEI ISTO EM MEMÓRIA DE MIM.' },
        ],
      },
      {
        key: 'memorialAcclamation',
        label: 'Mistério da Fé',
        lines: [
          { speaker: 'sacerdote', text: 'Tudo isto é mistério da fé!' },
          { speaker: 'assembleia', text: 'Toda vez que comemos deste Pão, toda vez que bebemos deste Vinho, recordamos a paixão de Jesus Cristo e ficamos esperando sua vinda.' },
        ],
      },
      {
        key: 'anamnesis',
        label: 'Anamnese',
        lines: [
          { speaker: 'sacerdote', text: 'Recordando, ó Pai, neste momento, a paixão de Jesus, nosso Senhor, sua ressurreição e ascensão, nós queremos a vós oferecer este Pão que alimenta e que dá vida, este Vinho que nos salva e dá coragem.' },
          { speaker: 'assembleia', text: 'Recebei, ó Senhor, a nossa oferta!' },
        ],
      },
      {
        key: 'epiclesisUnion',
        label: 'Epíclese de Unidade',
        lines: [
          { speaker: 'sacerdote', text: 'E quando recebermos Pão e Vinho, o Corpo e Sangue dele oferecidos, o Espírito nos una num só corpo, para sermos um só povo em seu amor.' },
          { speaker: 'assembleia', text: 'O Espírito nos una num só corpo!' },
        ],
      },
      {
        key: 'intercessionsLiving',
        label: 'Intercessões pelos Viventes',
        lines: [
          { speaker: 'sacerdote', text: 'Protegei vossa Igreja que caminha nas estradas do mundo rumo ao céu, cada dia renovando a esperança de chegar junto a vós, na vossa paz.' },
          { speaker: 'assembleia', text: 'Caminhamos na estrada de Jesus!' },
          { speaker: 'sacerdote', text: 'Dai ao vosso servo, o Papa N., ser bem firme na fé, na caridade, e a N., que é Bispo desta Igreja, muita luz para guiar o vosso Povo.' },
          { speaker: 'assembleia', text: 'Lembrai-vos, ó Pai, da vossa Igreja!' },
        ],
      },
      {
        key: 'finalIntercession',
        label: 'Intercessão Final',
        lines: [
          { speaker: 'sacerdote', text: 'Esperamos entrar na vida eterna com Maria, Mãe de Deus e da Igreja, os Apóstolos, e todos os que na vida souberam amar Cristo e seus irmãos.' },
          { speaker: 'assembleia', text: 'Esperamos entrar na vida eterna!' },
        ],
      },
      {
        key: 'intercessionsDead',
        label: 'Intercessões pelos Defuntos',
        lines: [
          { speaker: 'sacerdote', text: 'Abri as portas da misericórdia aos que chamastes para a outra vida; acolhei-os junto a vós, bem felizes, no reino que para todos preparastes.' },
          { speaker: 'assembleia', text: 'A todos dai a luz que não se apaga!' },
        ],
      },
      {
        key: 'concludingDoxology',
        label: 'Doxologia Final',
        lines: [
          { speaker: 'sacerdote', text: 'E a todos nós, aqui reunidos, que somos povo santo e pecador, dai-nos a graça de participar do vosso reino que também é nosso.' },
          { speaker: 'sacerdote', text: 'Por Cristo, com Cristo, e em Cristo, a vós, Deus Pai todo-poderoso, na unidade do Espírito Santo, toda honra e toda glória, por todos os séculos dos séculos.' },
          { speaker: 'assembleia', text: 'Amém.' },
        ],
      },
    ],
  },
];
