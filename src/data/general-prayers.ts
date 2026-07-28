export interface GeneralPrayer {
  id: string;
  title: string;
  subtitle?: string;
  text: string;
}

export const generalPrayers: GeneralPrayer[] = [
  {
    id: "sinal-da-cruz",
    title: "Sinal da Cruz",
    text: "Pelo sinal da Santa Cruz, livrai-nos Deus Nosso Senhor, dos nossos inimigos. Em nome do Pai, e do Filho, e do Espírito Santo. Amém.",
  },
  {
    id: "creio",
    title: "Creio em Deus Pai",
    subtitle: "Credo",
    text: `Creio em Deus Pai, Todo-Poderoso, Criador do céu e da terra.
E em Jesus Cristo, Seu único Filho, nosso Senhor, que foi concebido pelo poder do Espírito Santo; nasceu da Virgem Maria; padeceu sob Pôncio Pilatos, foi crucificado, morto e sepultado; desceu à mansão dos mortos; ressuscitou ao terceiro dia; subiu aos Céus; está sentado à direita de Deus Pai, Todo-Poderoso, donde há-de vir a julgar os vivos e os mortos.
Creio no Espírito Santo, na Santa Igreja Católica, na comunhão dos Santos, na remissão dos pecados, na ressurreição da carne e na vida eterna. Amém.`,
  },
  {
    id: "pai-nosso",
    title: "Pai Nosso",
    text: `Pai Nosso, que estais nos Céus, santificado seja o Vosso Nome; venha a nós o Vosso Reino; seja feita a Vossa vontade, assim na terra como no Céu.
O pão nosso de cada dia nos dai hoje; perdoai-nos as nossas ofensas, assim como nós perdoamos a quem nos tem ofendido; e não nos deixeis cair em tentação, mas livrai-nos do mal. Amém.`,
  },
  {
    id: "ave-maria",
    title: "Ave Maria",
    text: `Ave Maria, cheia de graça, o Senhor é convosco; bendita sois vós entre as mulheres e bendito é o fruto do vosso ventre, Jesus.
Santa Maria, Mãe de Deus, rogai por nós, pecadores, agora e na hora da nossa morte. Amém.`,
  },
  {
    id: "gloria-ao-pai",
    title: "Glória ao Pai",
    text: "Glória ao Pai, e ao Filho, e ao Espírito Santo. Assim como era no princípio, agora e sempre, por todos os séculos dos séculos. Amém.",
  },
  {
    id: "salve-rainha",
    title: "Salve Rainha",
    text: `Salve Rainha, Mãe de Misericórdia, vida, doçura e esperança nossa, salve! A Vós bradamos, os degredados filhos de Eva. A Vós suspiramos, gemendo e chorando neste vale de lágrimas.
Eia, pois, Advogada nossa, esses Vossos olhos misericordiosos a nós volvei. E depois deste desterro, nos mostrai Jesus, bendito fruto do Vosso ventre. Ó clemente, ó piedosa, ó doce Virgem Maria.
Rogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo. Amém.`,
  },
  {
    id: "santo-anjo",
    title: "Santo Anjo do Senhor",
    text: `Santo Anjo do Senhor, meu zeloso guardador, se a ti me confiou a piedade divina, sempre me rege, guarda, governa e ilumina. Amém.`,
  },
  {
    id: "ato-contricao",
    title: "Ato de Contrição",
    text: `Meu Jesus, de coração arrependido e pesaroso, me prostro aos Vossos pés, pedindo-Vos perdão. Pesam-me, Senhor, os meus pecados, porque ofendi a Vós, que sois tão bom e digno de ser amado. Proponho firmemente, com o auxílio da Vossa graita, não mais pecar e fugir de todas as ocasiões de pecado. Amém.`,
  },
  {
    id: "vinde-espirito-santo",
    title: "Vinde Espírito Santo",
    text: `Vinde, Espírito Santo, enchei os corações dos Vossos fiéis e acendei neles o fogo do Vosso amor.
Enviai o Vosso Espírito e tudo será criado, e renovareis a face da terra.
Oremos: Ó Deus, que instruístes os corações dos Vossos fiéis com a luz do Espírito Santo, fazei que apreciemos retamente todas as coisas segundo o mesmo Espírito e gozemos sempre da Sua consolação. Por Cristo, Senhor nosso. Amém.`,
  },
  {
    id: "magnificat",
    title: "Magnificat",
    subtitle: "Lucas 1, 46-55",
    text: `A minha alma glorifica ao Senhor, e o meu espírito se alegra em Deus, meu Salvador, porque olhou para a humildade da Sua serva. Desde agora, todas as gerações me chamarão bem-aventurada, porque o Todo-Poderoso fez em mim grandes coisas. Santo é o Seu nome.
A sua misericórdia se estende de geração em geração sobre os que O temem. Manifestou o poder do Seu braço e dispersou os soberbos de coração. Derrubou os poderosos de seus tronos e exaltou os humildes. Aos famintos encheu de bens e aos ricos despediu de mãos vazias.
Acolheu a Israel, Seu servo, lembrado da Sua misericórdia, conforme prometera a nossos pais, a Abraão e à sua descendência, para sempre. Glória ao Pai, e ao Filho, e ao Espírito Santo. Assim como era no princípio, agora e sempre, por todos os séculos dos séculos. Amém.`,
  },
  {
    id: "oferecimento-do-dia",
    title: "Oferecimento do Dia",
    text: `Senhor Deus, Todo-Poderoso, eu Vos ofereço o dia de hoje: todos os meus pensamentos, palavras, ações e sofrimentos em união com o Coração de Jesus, que incessantemente Se oferece por nós no Sacrifício da Missa. Ofereço-Vos, Senhor, todas as minhas orações, obras e alegrias deste dia, em reparação das nossas faltas, e para que todos os homens cheguem à salvação. Amém.`,
  },
  {
    id: "angelus",
    title: "Angelus",
    text: `V. O Anjo do Senhor anunciou a Maria.
R. E ela concebeu do Espírito Santo.
Ave Maria...
V. Eis aqui a escrava do Senhor.
R. Faça-se em mim segundo a Vossa palavra.
Ave Maria...
V. E o Verbo se fez carne.
R. E habitou entre nós.
Ave Maria...
Rogai por nós, Santa Mãe de Deus, para que sejamos dignos das promessas de Cristo.
Oremos: Infundi, Senhor, a Vossa graça em nossos corações, para que, conhecendo pela anunciação do Anjo a Encarnação de Jesus Cristo, Vosso Filho, pela Sua Paixão e Cruz sejamos conduzidos à glória da ressurreição. Por Cristo, Senhor nosso. Amém.`,
  },
  {
    id: "memorare",
    title: "Lembrai-vos",
    subtitle: "Memorare",
    text: `Lembrai-vos, ó piíssima Virgem Maria, que nunca se ouviu dizer que algum daqueles que têm recorrido à vossa proteção, implorado a vossa assistência e reclamado o vosso socorro fosse por vós desamparado.
Animado eu, pois, com igual confiança, a vós, Virgem, Mãe das Virgens, Mãe de Jesus Cristo e minha Mãe, recorro; a vós venho, e na vossa presença me prosterno, pecador arrependido.
Não desprezeis, ó Mãe do Verbo Divino, as minhas humildes súplicas, mas dignai-Vos de as ouvir e atender. Amém.`,
  },
  {
    id: "anima-christi",
    title: "Alma de Cristo",
    subtitle: "Anima Christi",
    text: `Alma de Cristo, santificai-me. Corpo de Cristo, salvai-me. Sangue de Cristo, inebriai-me. Água do lado de Cristo, lavai-me. Paixão de Cristo, confortai-me. Ó bom Jesus, ouvi-me. Dentro das Vossas chagas, escondei-me. Não permitais que me separe de Vós. Do espírito maligno, defendei-me. Na hora da minha morte, chamai-me. Mandai-me ir para Vós, para que com os Vossos Santos Vos louve, por todos os séculos dos séculos. Amém.`,
  },
  {
    id: "sao-miguel",
    title: "Oração a São Miguel Arcanjo",
    text: `São Miguel Arcanjo, defendei-nos no combate, sede o nosso refúgio contra as maldades e ciladas do demônio. Ordene-lhe Deus, instantemente o pedimos; e vós, Príncipe da Milícia Celeste, pelo poder divino, precipitai no inferno a Satanás e aos outros espíritos malignos que andam pelo mundo para perder as almas. Amém.`,
  },
  {
    id: "oração-para-iniciar-o-dia",
    title: "Oração para Iniciar o Dia",
    subtitle: "Bênção Matinal",
    text: `Graças Vos dou, Senhor, porque me chamastes à luz do dia e me concedestes mais esta manhã de vida. Aceitai, em sacrifício de louvor, todo o meu ser e tudo o que eu fizer, disser e pensar neste dia. Concedei-me a graça de viver em Vossa presença, tratando a todos com amor e paciência, e vencendo as tentações com o auxílio da Vossa graça. Amém.`,
  },
  {
    id: "oração-da-noite",
    title: "Oração da Noite",
    subtitle: "Ação de Graças",
    text: `Senhor, meu Deus, chegando ao fim de mais um dia, Venho agradecer-Vos por todas as graças que me concedestes. Perdoai as minhas faltas e omissões deste dia. Iluminai o meu sono e permiti que eu descanse em Vossa paz. Velai por mim e por todos os que amo. Que o Vosso anjo da guarda me proteja durante a noite. Amém.`,
  },
];
