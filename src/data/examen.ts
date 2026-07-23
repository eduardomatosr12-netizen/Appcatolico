import type { ExamenItem } from '@/types/examen';

export const churchCommandments: ExamenItem[] = [
  { id: 'ci1', commandment: '1º Mandamento da Igreja: Ouvir Missa inteira aos domingos e festas de guarda',
    questions: ['Deixei de ir à Missa dominical sem motivo grave?', 'Sai antes da Missa terminar?', 'Cheguei muito atrasado sem necessidade?'],
    reflection: 'A participação na Santa Missa é o primeiro dever do cristão. O domingo é o dia do Senhor, reservado para o culto público e a Eucaristia.' },
  { id: 'ci2', commandment: '2º Mandamento da Igreja: Jejuar e abstir-se de carne quando a Igreja manda',
    questions: ['Obedeci aos jejuns e abstinências da Igreja (Quaresma, Sexta-feira)?', 'Busquei dispensa quando necessário, ou simplesmente ignorei?'],
    reflection: 'O jejum e a abstinência nos ajudam a dominar a carne e a unir-nos à paixão de Cristo. A Igreja nos chama à penitência como caminho de conversão.' },
  { id: 'ci3', commandment: '3º Mandamento da Igreja: Confessar-se ao menos uma vez por ano',
    questions: ['Me confessei ao menos uma vez no último ano?', 'Escondi pecados graves na confissão?', 'Evitei a confissão por vergonha ou preguiça?'],
    reflection: 'A Confissão é dom de misericórdia de Deus. A Igreja determina ao menos uma confissão anual, mas é recomendável confessar-se mais frequentemente.' },
  { id: 'ci4', commandment: '4º Mandamento da Igreja: Comungar ao menos pela Páscoa',
    questions: ['Recebi a Eucaristia ao menos na Páscoa?', 'Me preparei adequadamente para a comunhão?', 'Recebi a comunhão em estado de graça?'],
    reflection: 'A Comunhão é o pão da vida eterna. A Igreja manda que todos os fiéis recebam a Eucaristia ao menos uma vez por ano, durante o tempo da Páscoa.' },
  { id: 'ci5', commandment: '5º Mandamento da Igreja: Pagar o dízimo à Igreja',
    questions: ['Contribuo para o sustento da Igreja e das obras de caridade?', 'Sou generoso com as ofertas ou dou apenas o mínimo?', 'Apoio as necessidades materiais da comunidade paroquial?'],
    reflection: 'O dízimo é um ato de justiça e caridade. Contribuir para a Igreja é ajudar na manutenção do culto divino e na assistência aos necessitados.' },
];

export const examenItems: ExamenItem[] = [
  { id: '1', commandment: '1º Mandamento: Amar a Deus acima de todas as coisas',
    questions: ['Coloquei algo ou alguém acima de Deus? (dinheiro, trabalho, prazeres)', 'Tive fé em superstições, horóscopos ou simpatias?', 'Deixei de rezar por preguiça ou falta de tempo?', 'Blasfemei contra Deus ou contra os santos?', 'Deixei de participar da Missa aos domingos?'],
    reflection: 'O Senhor teu Deus é o único Deus. Amarás o Senhor teu Deus com todo o teu coração.' },
  { id: '2', commandment: '2º Mandamento: Não tomar Seu Santo Nome em vão',
    questions: ['Usei o nome de Deus de forma indevida?', 'Fiz juramentos falsos ou desnecessários?', 'Prometi algo a Deus e não cumpri?'],
    reflection: 'Santificado seja o vosso Nome. Que o meu falar seja sempre digno e respeitoso para com Deus.' },
  { id: '3', commandment: '3º Mandamento: Guardar domingos e festas de guarda',
    questions: ['Deixei de ir à Missa dominical sem motivo grave?', 'Cheguei atrasado ou saí antes do fim da Missa?', 'Trabalhei desnecessariamente no domingo?'],
    reflection: 'Lembra-te do dia do Senhor para o santificar. A Eucaristia dominical é o centro da vida cristã.' },
  { id: '4', commandment: '4º Mandamento: Honrar pai e mãe',
    questions: ['Fui desobediente ou desrespeitoso com meus pais?', 'Deixei de cuidar dos meus pais idosos ou necessitados?', 'Fui mau exemplo para meus filhos?'],
    reflection: 'Honra teu pai e tua mãe, para que sejas feliz e vivas longamente sobre a terra.' },
  { id: '5', commandment: '5º Mandamento: Não matar',
    questions: ['Desejei ou causei mal a alguém fisicamente?', 'Alimentei ódio, rancor ou desejo de vingança?', 'Ajudei ou encorajei alguém a abortar?', 'Bebi em excesso ou usei drogas?'],
    reflection: 'A vida é dom de Deus. Sede misericordiosos como o Pai é misericordioso.' },
  { id: '6', commandment: '6º Mandamento: Não pecar contra a castidade',
    questions: ['Tive pensamentos ou desejos impuros voluntários?', 'Assisti a conteúdos pornográficos?', 'Tive relações sexuais fora do casamento?'],
    reflection: 'Bem-aventurados os puros de coração, porque verão a Deus. O corpo é templo do Espírito Santo.' },
  { id: '7', commandment: '7º Mandamento: Não roubar',
    questions: ['Roubei ou furtei algo, mesmo que pequeno?', 'Fiquei com troco errado a meu favor sem devolver?', 'Deixei de pagar dívidas ou impostos?'],
    reflection: 'Ai de vós, que acumulais bens injustamente. Feliz quem se compadece e empresta com justiça.' },
  { id: '8', commandment: '8º Mandamento: Não levantar falso testemunho',
    questions: ['Menti, mesmo que para evitar problemas?', 'Falei mal de alguém pelas costas?', 'Espalhei fofocas ou boatos?'],
    reflection: 'A verdade vos libertará. Que a vossa linguagem seja sim, sim; não, não.' },
  { id: '9', commandment: '9º Mandamento: Não desejar a mulher do próximo',
    questions: ['Cobicei a pessoa ou o cônjuge de outra pessoa?', 'Alimentei fantasias impuras com pessoas comprometidas?', 'Comparei-me aos outros com inveja?'],
    reflection: 'Bem-aventurados os puros de coração. O olhar cobiçoso já é adultério no coração.' },
  { id: '10', commandment: '10º Mandamento: Não cobiçar as coisas alheias',
    questions: ['Invejei os bens materiais dos outros?', 'Fui ganancioso ou avarento?', 'Deixei de partilhar com quem tem menos?'],
    reflection: 'Acumulai para vós tesouros no céu. Felizes os pobres em espírito, porque deles é o Reino dos Céus.' },
];

export const preparatoryPrayer = `Meu bom Deus e Salvador, Pai de misericórdia, eis-me aqui prostrado aos vossos pés, cheio de confusão e de remorsos, qual outro filho pródigo que volta arrependido à casa paterna. Não mereço perdão, porque desgostei demasiadamente a vossa bondade infinita. Mas sei que não olhais para os meus pecados senão para perdoá-los, como Pai misericordioso que sois. Pelos méritos inefáveis do vosso Filho, crucificado e morto por meu amor, pelos méritos do seu Preciosíssimo Sangue, pelas suas lágrimas e agonia, tende piedade de mim. Dai-me luz para conhecer os meus pecados; sincero arrependimento para os aborrecer; firme propósito para nunca mais os cometer; ânimo para os acusar e para cumprir com a devida penitência. Amém.`;

export const conclusionPrayer = `Senhor Jesus Cristo, que dissestes aos vossos apóstolos: "A paz vos deixo, a minha paz vos dou", não olheis para os meus pecados, mas para a fé da vossa Igreja; dai-me a paz e a unidade conforme a vossa vontade. Amém.

Ato de Contrição: Meu Deus, eu me arrependo de todo o coração de ter-vos ofendido. Detesto meus pecados porque, pecando, mereci vossos castigos e ofendi a Vós, sumo bem e digno de ser amado sobre todas as coisas. Proponho firmemente, com o auxílio da vossa graça, confessar-me, fazer penitência e não mais pecar. Amém.`;
