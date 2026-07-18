import type { LiturgyOfHours } from '@/types/prayer';

export const liturgyHoursData: Record<string, LiturgyOfHours> = {
  laudes: {
    hour: 'laudes',
    title: 'Laudes',
    invocation: [
      { speaker: 'assembleia', text: 'Deus, vinde em nosso auxílio.' },
      { speaker: 'sacerdote', text: 'Senhor, apressai-vos em socorrer-nos.' },
      { speaker: 'assembleia', text: 'Glória ao Pai, ao Filho e ao Espírito Santo.' },
      { speaker: 'sacerdote', text: 'Como era no princípio, agora e sempre. Amém.' },
    ],
    hymn: 'Ó Deus, criador do dia,\nQue a luz mandais para a alegria,\nOuvindo dos vossos servos a oração,\nDerramai-lhes a vossa bênção.\n\nVós que iluminai o universo\nCom a brilhante luz do Sol,\nE regais a terra com a chuva,\nSustentai-nos com vossa mão.\n\nDai-nos, Pai, neste dia a graça\nDe termos paz em vossa presença,\nE, ao chegarmos ao fim da jornada,\nDe nos conduzirmos à pátria celeste.\n\nAo Pai, ao Filho e ao Espírito Santo,\nSeja louvor e glória eterna,\nPelo sempre e para sempre. Amém.',
    psalms: [
      {
        reference: 'Sl 62(63)',
        antiphon: 'O Senhor é a minha herança e o meu cálice.',
        text: 'Ó Deus, vós sois o meu Deus, por vós eu procuro; a minha alma tem sede de vós, a minha carne tem fome de vós, numa terra árida, seca e sem água.\n\nAssim eu vos contemplo no santuário, para ver o vosso poder e a vossa glória.\n\nA vossa graça é melhor do que a vida, e os meus lábios vos louvarão.\n\nAssim eu vos bendirei durante a vida, e em vosso nome erguerei as minhas mãos.\n\nA minha alma será saciada como de um manjar de sobremesa, e eu vos louvarei com alegria na minha boca.\n\nPorque vós fostes o meu auxílio, e à sombra das vossas asas eu exulto.\n\nA minha alma está unida a vós, e a vossa mão direita me sustenta.',
      },
      {
        reference: 'Sl 148',
        antiphon: 'Louvai o Senhor, todos os povos da terra.',
        text: 'Louvai o Senhor dos céus, louvai-o nas alturas!\nLouvai-o, todos os seus Anjos, louvai-o, todos os seus exércitos!\n\nLouvai-o, sol e lua, louvai-o, todas as estrelas luzentes!\nLouvai-o, céus dos céus, e vós, águas que estais acima dos céus!\n\nLouvai o nome do Senhor, porque ele ordenou e foram criados.\nEle os firmou para sempre, decretou uma lei que não passará.\n\nLouvai o Senhor da terra: monstros marinhos e todos os abismos, fogo e granizo, neve e nevoeiro, e o vento tempestuoso que cumpre a sua palavra!\n\nMontanhas e todos os outeiros, árvores frutíferas e todos os cedros, animais selvagens e todo o gado, répteis e aves aladas!\n\nReis da terra e todos os povos, príncipes e todos os juízes da terra, jovens e donzelas, velhos e crianças!\n\nLouvem todos o nome do Senhor, porque só o seu nome é excelso.\nA sua glória está acima da terra e dos céus.',
      },
      {
        reference: 'Cântico',
        antiphon: 'Bendito seja o Senhor, Deus de Israel.',
        text: 'Bendito seja o Senhor, Deus de Israel,\nporque visitou e redimiu o seu povo.\n\nE levantou-nos um corno de salvação,\nna casa de Davi, seu servo.\n\nComo anunciara pela boca dos seus santos,\nprofetas desde tempos antigos,\n\nque nos livrasse dos nossos inimigos,\ne das mãos de todos os que nos odeiam.\n\nAssim cumpre a sua misericórdia com nossos pais,\nlembrando-se da sua santa aliança,\n\ndo juramento que fez a Abraão, nosso pai,\nde nos conceder que, livres das mãos dos inimigos,\n\no sirvamos sem temor,\nsantos e justos diante dele,\n\ntodos os nossos dias.\nE tu, menino, serás chamado profeta do Altíssimo,\nporque irás diante do Senhor a preparar os seus caminhos,\n\npara dar ao seu povo o conhecimento da salvação,\npelo perdão dos seus pecados.\n\nPela misericórdia de Deus, nosso Salvador,\nque nos visita como a luz que vem do alto,\n\npara iluminar os que estão nas trevas e na sombra da morte,\ne guiar os nossos passos no caminho da paz.',
      },
    ],
    shortReading: 'Desperta, ó homem, do sono, e Cristo te iluminará. — Ef 5,14',
    responsory: 'O Senhor é a minha luz e a minha salvação: a quem terei medo? O Senhor é o baluarte da minha vida: de quem me hei de espantar? Sl 26(27).',
    canticle: {
      label: 'Cântico de Zacarias — Benedictus',
      text: 'Bendito seja o Senhor, Deus de Israel,\nporque visitou e redimiu o seu povo.\n\nE levantou-nos um corno de salvação,\nna casa de Davi, seu servo.\n\nComo anunciara pela boca dos seus santos,\nprofetas desde tempos antigos,\n\nque nos livrasse dos nossos inimigos,\ne das mãos de todos os que nos odeiam.\n\nMisericórdia para com nossos pais,\nlembrando-se da sua santa aliança.\n\nJuramento que fez a Abraão, nosso pai,\nde nos conceder que, livres do tempto,\n\no sirvamos com temor,\nsantos e justos diante dele.\n\nE tu, menino, serás chamado profeta do Altíssimo,\nporque irás diante do Senhor a preparar os seus caminhos.\n\nDar ao seu povo o conhecimento da salvação,\npelo perdão dos seus pecados.\n\nPela misericórdia de Deus, nosso Salvador,\nque nos visita como a luz que vem do alto.\n\nPara iluminar os que estão nas trevas\ne na sombra da morte,\n\ne guiar os nossos passos\nno caminho da paz.',
    },
    intercessions: [
      { speaker: 'sacerdote', text: 'O Senhor ressuscitou dentre os mortos. Aleluia! Peçamos com fé:' },
      { speaker: 'assembleia', text: 'Ressuscitaí em nós a vossa vida, Senhor.' },
      { speaker: 'sacerdote', text: 'Senhor Jesus, fonte de vida nova, iluminai a vossa Igreja para que,annunciando a vossa ressurreição, ela traga esperança ao mundo.' },
      { speaker: 'assembleia', text: 'Ressuscitaí em nós a vossa vida, Senhor.' },
      { speaker: 'sacerdote', text: 'Senhor Jesus, vós que estais sentado à direita do Pai, dai aos que governam a sabedoria e a justiça para que construam uma sociedade mais fraterna.' },
      { speaker: 'assembleia', text: 'Ressuscitaí em nós a vossa vida, Senhor.' },
      { speaker: 'sacerdote', text: 'Senhor Jesus, bom Pastor, accompagnai os missionários que anunciam o vosso Evangelho às nações, para que muitos encontrem o caminho da salvação.' },
      { speaker: 'assembleia', text: 'Ressuscitaí em nós a vossa vida, Senhor.' },
      { speaker: 'sacerdote', text: 'Senhor Jesus, médico das almas e dos corpos, curai os enfermos, consolai os aflitos e dai descanso aos que partiram desta vida.' },
      { speaker: 'assembleia', text: 'Ressuscitaí em nós a vossa vida, Senhor.' },
    ],
    concludingPrayer: 'Ó Deus, que iluminais a manhã com a vossa luz, despertai em nós o desejo de servir-vos e dai-nos a graça de caminhar sempre na vossa presença. Por Nosso Senhor Jesus Cristo, vosso Filho, na unidade do Espírito Santo. Amém.',
  },

  vesperas: {
    hour: 'vesperas',
    title: 'Vésperas',
    invocation: [
      { speaker: 'assembleia', text: 'Vinde, adorai o Senhor.' },
      { speaker: 'sacerdote', text: 'Aleluia!' },
      { speaker: 'assembleia', text: 'Deus, vinde em nosso auxílio.' },
      { speaker: 'sacerdote', text: 'Senhor, apressai-vos em socorrer-nos.' },
      { speaker: 'assembleia', text: 'Glória ao Pai, ao Filho e ao Espírito Santo.' },
      { speaker: 'sacerdote', text: 'Como era no princípio, agora e sempre. Amém.' },
    ],
    hymn: 'Ó luz do eterno dia,\nCristo, que jamais se apaga,\nVinde iluminar a terra\nNa hora em que o Sol declina.\n\nVós, que fostes a oferecer\nO vosso sangue pelos homens,\nE a cruz sagrada erguestes\nPara a salvação do mundo.\n\nLâmpada sagrada e viva,\nVinde banhar em vossa luz\nOs corações dos vossos fiéis\nNesta hora vespertina.\n\nAo Pai, ao Filho e ao Espírito Santo,\nSeja louvor e glória eterna,\nPelo sempre e para sempre. Amém.',
    psalms: [
      {
        reference: 'Sl 121(122)',
        antiphon: 'Alegrai-vos, vós que amais Sião.',
        text: 'Alegravam-me quando me disseram:\n"Vamos à casa do Senhor."\n\nAgora os nossos pés entraram\nnos vossos pãrtimos, ó Jerusalém.\n\nJerusalém, cidade bem construída,\nunida e bem compacta.\n\nPara lá sobem as tribos, as tribos do Senhor,\npara louvar o nome do Senhor.\n\nLá estão os tribunais da justiça,\nos tribunais da casa de Davi.\n\nRogai a paz de Jerusalém:\nprosperam aqueles que vos amam.\n\nQue haja paz dentro dos vossos muros\nprosperidade nos vossos palácios.\n\nPor amor dos meus irmãos e amigos,\ndigamos: "A paz esteja em vós."\n\nPor amor da casa do Senhor, nosso Deus,\nvou pedir a vós todos os bens.',
      },
      {
        reference: 'Sl 137(138)',
        antiphon: 'O Senhor reinará para sempre.',
        text: 'De todo o coração eu vos louvo,\nperante os deuses eu vos canto.\n\nEu me prostro diante do vosso templo santo\ne louvo o vosso nome pela vossa graça e fidelidade,\nporque vosso amor supera todas as coisas.\n\nNo dia em que vos chamei, vós me respondestes,\ne me enchestes de força na alma.\n\nTodos os reis da terra Vos louvem, Senhor,\nquando ouvirem as palavras da vossa boca.\n\nE cantem os caminhos do Senhor,\npois é grande a glória do Senhor.\n\nO Senhor está de alto e vê os humildes,\ne conhece os altivos de longe.\n\nAinda que eu ande no meio da aflição,\nVós me preservais, vós estendestes a mão\ncontra a cólera dos meus inimigos.\n\nA vossa mão direita me salvará.\nO Senhor fará tudo por mim.\n\nSenhor, a vossa graça dura para sempre,\nnão abandoneis a vossa obra.',
      },
      {
        reference: 'Sl 144(145)',
        antiphon: 'O Senhor é clemente e misericordioso.',
        text: 'Eu vos louvarei, ó Deus, meu Rei,\ne bendirei o vosso nome para sempre.\n\nTodo dia eu vos louvarei,\ne bendirei o vosso nome para sempre.\n\nO Senhor é grande e digno de louvor,\ne a sua grandeza não se pode medir.\n\nGeração após geração, louva as vossas obras\nanuncia o vosso poder.\n\nFala da vossa glória esplêndida\ne contempla as vossas maravilhas.\n\nContam do vosso poder terrível,\ne eu proclamo a vossa grandeza.\n\nRelembram a vossa abundante bondade\ne celebram a vossa justiça.\n\nO Senhor é clemente e misericordioso,\npacífico e cheio de bondade.\n\nO Senhor é bondade para com todos,\ne a sua ternura se estende sobre todas as criaturas.\n\nTodos os vossos criados Vos louvam, Senhor,\ne os vossos fiéis Vos bendizem.\n\nProclamam a glória do vosso reino\ne falam do vosso poder.',
      },
    ],
    shortReading: 'Assim como a oliveira produz os seus frutos e o vinho rejubila o coração do homem, assim a sua luz ilumina a terra. — Eclo 24,27',
    responsory: 'O Senhor me cercou com a graça e não permitiu que eu morresse. Aleluia!',
    canticle: {
      label: 'Cântico de Nossa Senhora — Magnificat',
      text: 'A minha alma engrandece o Senhor,\ne o meu espírito se alegra em Deus, meu Salvador,\n\nporque olhou para a humildade da sua serva.\nDe hoje em diante me chamarão bem-aventurada todas as gerações.\n\nPois o Todo-Poderoso fez grandes coisas em mim:\nsagrado é o seu nome!\n\nA sua misericórdia se estende de geração em geração\nsobre aqueles que o temem.\n\nEle mostrou o poder do seu braço:\ndispersou os soberbos de coração.\n\nDerrubou os poderosos de seus tronos\ne exaltou os humildes.\n\nOs famintos ele enche de bens\ne os ricos despediu vazios.\n\nAcolheu a Israel, seu servo,\nlembrado da sua misericórdia,\n\ncomo prometeu a nossos pais:\npara sempre para Abraão e seus descendentes.',
    },
    intercessions: [
      { speaker: 'sacerdote', text: 'O Senhor nos visitou com a luz da salvação. Peçamos com alegria:' },
      { speaker: 'assembleia', text: 'Louvado sejais, Senhor, porque nos visitastes.' },
      { speaker: 'sacerdote', text: 'Senhor Jesus, luz do mundo, vós que fostes oferecido como luz aos gentios, iluminai os que ainda caminham nas trevas do pecado e da morte.' },
      { speaker: 'assembleia', text: 'Louvado sejais, Senhor, porque nos visitastes.' },
      { speaker: 'sacerdote', text: 'Senhor Jesus, bom Pastor, dai pastores santos à vossa Igreja, que guiem o vosso povo com sabedoria e amor, e conduzam todos à salvação.' },
      { speaker: 'assembleia', text: 'Louvado sejais, Senhor, porque nos visitastes.' },
      { speaker: 'sacerdote', text: 'Senhor Jesus, estrela da manhã, iluminai as famílias cristãs, para que, vivendo na fé e na caridade, sejam sinal da vossa presença no mundo.' },
      { speaker: 'assembleia', text: 'Louvado sejais, Senhor, porque nos visitastes.' },
      { speaker: 'sacerdote', text: 'Senhor Jesus, médico das almas e dos corpos, curai os enfermos, consolai os aflitos e dai descanso eterno aos que partiram desta vida.' },
      { speaker: 'assembleia', text: 'Louvado sejais, Senhor, porque nos visitastes.' },
    ],
    concludingPrayer: 'Ó Deus, que fizestes cair sobre a terra a luz da vossa verdade, concedei que, confessando o nome do vosso Filho unigênito, sejamos sempre fiéis na sua doutrina e perseverantes nas suas obras. Por Nosso Senhor Jesus Cristo, vosso Filho, na unidade do Espírito Santo. Amém.',
  },

  terca: {
    hour: 'terca',
    title: 'Tércia',
    invocation: [
      { speaker: 'assembleia', text: 'Deus, vinde em nosso auxílio.' },
      { speaker: 'sacerdote', text: 'Senhor, apressai-vos em socorrer-nos.' },
      { speaker: 'assembleia', text: 'Glória ao Pai, ao Filho e ao Espírito Santo.' },
      { speaker: 'sacerdote', text: 'Como era no princípio, agora e sempre. Amém.' },
    ],
    hymn: 'Vinde, ó Espírito Santo,\nenchai os vossos fiéis\nde vossa luz divina,\ne acendei neles o fogo do amor.\n\nVós que estais presente em toda a criação,\nvos unis aos vossos filhos\nna hora sagrada da oração.\n\nDai-nos a sabedoria de compreender\na vossa vontade,\ne a fortaleza de cumpri-la sem temor.\n\nAo Pai, ao Filho e ao Espírito Santo,\nseja louvor e glória eterna,\nPelo sempre e para sempre. Amém.',
    psalms: [
      {
        reference: 'Sl 24(25)',
        antiphon: 'Ensinai-me os vossos caminhos, Senhor.',
        text: 'A vós, Senhor, elevo a minha alma.\nMeu Deus, em vós eu confio;\nnão permiti que eu seja confundido,\nnão se alegrem os meus inimigos comigo.\n\nNinguém que em vós espera será envergonhado;\nserão envergonhados os que traem sem motivo.\n\nMostrai-me, Senhor, os vossos caminhos,\nensinai-me as vossas veredas.\n\nConduzi-me pela vossa verdade e ensinai-me,\npois vós sois o Deus da minha salvação,\nem vós eu espero todos os dias.\n\nLembrai-vos, Senhor, das vossas ternuras\nmisericórdias de eternos tempos.\n\nPerdoai os meus pecados, Senhor,\npois são grandes.\n\nQuem teme o Senhor indicará o caminho\nque deve escolher.\n\nA sua alma repousará em paz,\ne a sua descendência possuirá a terra.\n\nO olhar do Senhor está sobre os que o temem,\nsobre os que esperam na sua graça.',
      },
    ],
    shortReading: 'O Senhor é o meu lume e a minha salvação: a quem terei medo? Sl 26(27),1',
    responsory: 'Senhor, escutai a minha oração, que o vosso clamor chegue até Vós.',
    canticle: {
      label: 'Cântico',
      text: 'Bendito seja o Senhor, Deus de Israel,\nporque visitou e redimiu o seu povo.\n\nE levantou-nos um corno de salvação,\nna casa de Davi, seu servo.\n\nComo anunciara pela boca dos seus santos,\nprofetas desde tempos antigos,\n\nque nos livrasse dos nossos inimigos,\ne das mãos de todos os que nos odeiam.',
    },
    intercessions: [
      { speaker: 'sacerdote', text: 'O Senhor é a nossa luz e a nossa salvação. Peçamos com fé:' },
      { speaker: 'assembleia', text: 'Iluminai-nos, Senhor, com a vossa luz.' },
      { speaker: 'sacerdote', text: 'Senhor, nosso Deus, vós que iluminais a manhã com a luz do sol, iluminai o vosso povo com a graça do Espírito Santo.' },
      { speaker: 'assembleia', text: 'Iluminai-nos, Senhor, com a vossa luz.' },
      { speaker: 'sacerdote', text: 'Dai-nos, Senhor, a graça de viver este dia em paz, cumprindo a vossa vontade com amor e dedicação.' },
      { speaker: 'assembleia', text: 'Iluminai-nos, Senhor, com a vossa luz.' },
      { speaker: 'sacerdote', text: 'Conduzi os nossos passos, Senhor, pelo caminho da justiça e da verdade, para que chegemos à pátria celeste.' },
      { speaker: 'assembleia', text: 'Iluminai-nos, Senhor, com a vossa luz.' },
    ],
    concludingPrayer: 'Senhor, nosso Deus, que governais o universo com sabedoria e amor, concedei-nos viver este dia segundo a vossa vontade, para que, ao findar, possamos louvar o vosso santo nome. Por Nosso Senhor Jesus Cristo. Amém.',
  },

  sexta: {
    hour: 'sexta',
    title: 'Sexta',
    invocation: [
      { speaker: 'assembleia', text: 'Deus, vinde em nosso auxílio.' },
      { speaker: 'sacerdote', text: 'Senhor, apressai-vos em socorrer-nos.' },
      { speaker: 'assembleia', text: 'Glória ao Pai, ao Filho e ao Espírito Santo.' },
      { speaker: 'sacerdote', text: 'Como era no princípio, agora e sempre. Amém.' },
    ],
    hymn: 'Neste meio do dia,\nVinde iluminar a terra,\nÓ Cristo, sol de justiça,\nQue iluminais todas as coisas.\n\nDai-nos a graça de suportar\no calor das tribulações,\ne de caminhar sempre\nna luz do vosso amor.\n\nAo Pai, ao Filho e ao Espírito Santo,\nseja louvor e glória eterna,\nPelo sempre e para sempre. Amém.',
    psalms: [
      {
        reference: 'Sl 54(55)',
        antiphon: 'Lançai sobre o Senhor o vosso fardo, e ele vos sustentará.',
        text: 'Ó Deus, ouvi a minha oração,\nnão vos escondais da minha súplica.\n\nAtendei-me e respondei-me,\nperturbado andou nas minhas reflexões,\nagitado pela voz do inimigo,\ncomprimido pela opressão do ímpio.\n\nLançam sobre mim a desventura,\ncom raiva me ameaçam.\n\nO meu coração estremece dentro de mim,\ncaíram sobre mim os horrores da morte.\n\nTemo e tremeo,\npois o terror me domina.\n\nDigo eu entre mim: "Quem me dará asas como a pomba?\nVooei e descansaria longe.\n\nProcuraria um refúgio no deserto,\ne esperaria em Deus o libertador;\nlonge do tumulto e da multidão,\nda agitação dos que desejam a minha ruína.\n\nEu os vejo, Senhor, na cidade,\ncomploteiam e tramam astutamente.\n\nVejam, dia e noite me cercam,\npois não abandonam os seus crimes.\n\nO Senhor guarda a cidade;\no Senhor não dorme nem cochila.\n\nDeus, ouvi a minha oração,\ndai ouvidos à minha súplica.\n\nO Senhor ouve e responde,\naquele que é eterno.\n\nLançai sobre o Senhor o vosso fardo,\ne ele vos sustentará.',
      },
    ],
    shortReading: 'Em tudo dai graças, porque esta é a vontade de Deus em Jesus Cristo para convosco. — 1Ts 5,18',
    responsory: 'Louvai o Senhor, porque ele é bom: o seu amor é eterno.',
    canticle: {
      label: 'Cântico',
      text: 'Ó Senhor,我已经ouvi a vossa fama,\ne temo, ó Senhor, a vossa obra.\nNo meio dos anos fazei reviver o vosso poder,\nno meio dos anos fazei-o conhecer,\ncom ira vós vos lembrais da misericórdia.',
    },
    intercessions: [
      { speaker: 'sacerdote', text: 'O Senhor é a nossa força e o nosso escudo. Peçamos com confiança:' },
      { speaker: 'assembleia', text: 'Ajudai-nos, Senhor, vossa misericórdia.' },
      { speaker: 'sacerdote', text: 'Senhor, vós que sustainis o universo com o vosso poder, dai-nos a graça de suportar com paciência as dificuldades deste dia.' },
      { speaker: 'assembleia', text: 'Ajudai-nos, Senhor, vossa misericórdia.' },
      { speaker: 'sacerdote', text: 'Iluminai, Senhor, os que dirigem as nações, para que busquem a justiça e a paz, e promovam o bem comum.' },
      { speaker: 'assembleia', text: 'Ajudai-nos, Senhor, vossa misericórdia.' },
    ],
    concludingPrayer: 'Senhor, nosso Deus, vós que sustentais o mundo com o vosso poder e governais todas as coisas com sabedoria, dai-nos a graça de viver este dia em obediência à vossa vontade. Por Nosso Senhor Jesus Cristo. Amém.',
  },

  noa: {
    hour: 'noa',
    title: 'Nona',
    invocation: [
      { speaker: 'assembleia', text: 'Deus, vinde em nosso auxílio.' },
      { speaker: 'sacerdote', text: 'Senhor, apressai-vos em socorrer-nos.' },
      { speaker: 'assembleia', text: 'Glória ao Pai, ao Filho e ao Espírito Santo.' },
      { speaker: 'sacerdote', text: 'Como era no princípio, agora e sempre. Amém.' },
    ],
    hymn: 'Ó Cristo, que à hora nona,\nconsumaste a obra da redenção,\nconfirmai em nós a esperança\ne dai-nos a perseverança.\n\nVós que, na cruz, vencestes a morte,\ndai-nos a graça de viver\ncomo filhos da luz,\ne de caminhar sempre na vossa presença.\n\nAo Pai, ao Filho e ao Espírito Santo,\nseja louvor e glória eterna,\nPelo sempre e para sempre. Amém.',
    psalms: [
      {
        reference: 'Sl 89(90)',
        antiphon: 'Senhor, foste o nosso refúgio de geração em geração.',
        text: 'Senhor, foste o nosso refúgio\nde geração em geração.\n\nAntes de nascerem os montes\ne de criar a terra e o mundo,\nde eternidade para eternidade, vós sois Deus.\n\nVós fazeis voltar o homem à terra e dizeis:\n"Voltai, filhos dos homens."\n\nPorque mil anos aos vossos olhos\nsão como o dia de ontem que passou,\ne como uma vigília da noite.\n\nVós os arrebatais como um sonho;\nde manhã eles florescem e murchem;\nde manhã secam e se tornam secos.\n\nEnchemo-nos da vossa ira\ne somos dominados pelo vosso furor.\n\nPuseram os nossos pecados diante de vós,\na luz do vosso rosto sobre os nossos pecados.\n\nTodos os nossos dias passam sob a vossa ira;\nconsumam-se os nossos anos como um suspiro.\n\nA duração da nossa vida são setenta anos,\no que for mais, oitenta anos;\ne o que há de melhor neles é cansaço e aflição.\n\nQuem conhece a força da vossa ira?\nO vosso furor é tão grande quanto o vosso temor.\n\nEnsinai-nos a contar os nossos dias,\npara que o nosso coração adquira sabedoria.',
      },
    ],
    shortReading: 'O Senhor é justo, ama os seus justos, o Senhor olha para os que o servem. Sl 145(146),8-9',
    responsory: 'Do fundo da minha alma eu clamo a Vós, Senhor: ouvi a minha prece.',
    canticle: {
      label: 'Cântico',
      text: 'Vós sois eterno, Senhor,\ne a vossa palavra permanece firmemente no céu.\nVós criastes a terra para sempre,\na vossa obra se renova a cada dia.',
    },
    intercessions: [
      { speaker: 'sacerdote', text: 'O Senhor é o nosso refúgio e a nossa força. Peçamos com confiança:' },
      { speaker: 'assembleia', text: 'Protegei-nos, Senhor, na vossa sombra.' },
      { speaker: 'sacerdote', text: 'Senhor, que sustentais o mundo com o vosso poder, dai-nos a graça de suportar com paciência as tribulações do dia e confiar na vossa providência.' },
      { speaker: 'assembleia', text: 'Protegei-nos, Senhor, na vossa sombra.' },
      { speaker: 'sacerdote', text: 'Acompanhai, Senhor, os que trabalham, dai-lhes descanso e renovai as suas forças para servirem sempre com alegria.' },
      { speaker: 'assembleia', text: 'Protegei-nos, Senhor, na vossa sombra.' },
    ],
    concludingPrayer: 'Senhor, nosso Deus, que governais os tempos e as estações, concedei-nos chegar ao fim deste dia em paz, louvando o vosso santo nome e esperando na vossa misericórdia. Por Nosso Senhor Jesus Cristo. Amém.',
  },

  completas: {
    hour: 'completas',
    title: 'Completas',
    invocation: [
      { speaker: 'assembleia', text: 'Deus, vinde em nosso auxílio.' },
      { speaker: 'sacerdote', text: 'Senhor, apressai-vos em socorrer-nos.' },
      { speaker: 'assembleia', text: 'Glória ao Pai, ao Filho e ao Espírito Santo.' },
      { speaker: 'sacerdote', text: 'Como era no princípio, agora e sempre. Amém.' },
    ],
    hymn: 'Antes que o sono nos venha,\nLouvemos, irmãos, o Senhor,\ne derramemos as nossas preces\ndiante do Pai das luzes.\n\nVós, que sois a luz eterna,\nIluminai as trevas da noite,\ne dai-nos um sono tranquilo,\npara que, despertados, vos louvemos.\n\nProtegei-nos, ó Bom Pastor,\nDurante as horas da noite,\ne guardai o vosso rebanho\nDe todo o mal e perigo.\n\nAo Pai, ao Filho e ao Espírito Santo,\nSeja louvor e glória eterna,\nPelo sempre e para sempre. Amém.',
    psalms: [
      {
        reference: 'Sl 87(88)',
        antiphon: 'Enchei-me de vossa bondade, Senhor, e responderei.',
        text: 'Senhor, Deus da minha salvação,\ndia e noite eu clamo perante Vós.\n\nChegue até Vós a minha prece,\nInclinai os vossos ouvidos ao meu apelo.\n\nPorque a minha alma está repleta de aflições,\na minha vida está perto do túmulo.\n\nSou contado entre os que descem à cova,\nsou como um homem sem força.\n\nDeitado entre os mortos,\ncomo os mortos esquecidos,\ndeixados por vós no esquecimento.\n\nVós colocastes sobre mim a vossa mão,\nassim me oprimis. (Refrão)\n\nVós afastastes de mim os vossos amigos,\nconverteram-se em abominação para mim.\n\nFui preso e não consigo escapar;\nmeus olhos estão fracos de tanto afligir-se.\n\nSenhor, dia e noito eu clamo a Vós,\nelevo as minhas mãos para a vossa oração.\n\nProcedereis com os mortos de maneira maravilhosa?\nLevantar-se-ão os espectros para vos louvar?\n\nSerá anunciada a vossa bondade no túmulo,\na vossa fidelidade na perdição?\n\nSerão conhecidos nas trevas os vossos prodígios,\na vossa justiça na terra do esquecimento?\n\nE eu, Senhor, eu clamo a Vós,\nde manhã a minha prece chega até Vós.\n\nPor que, Senhor, rejeitais a minha oração,\npor que escondeis o vosso rosto de mim?\n\nDesde a juventude eu sofro e morro,\nsustentado pelo vosso temor,\na vossa ira me devora.',
      },
    ],
    shortReading: 'Em paz vou dormir e em paz vou repousar, porque só Vós, Senhor, me fazeis habitar seguro. — Sl 4,9-10',
    responsory: 'Em tus mãos, Senhor, eu entrego o meu espírito.',
    canticle: {
      label: 'Cântico de Simeão — Nunc Dimittis',
      text: 'Agora, Senhor, deixaí ir em paz o vosso servo,\nconforme a vossa palavra.\n\nPorque os meus olhos viram a salvação,\nque preparastes diante de todos os povos.\n\nLuz para iluminar as nações\ne glória de Israel, vosso povo.',
    },
    intercessions: [
      { speaker: 'sacerdote', text: 'O Senhor nos deu a luz do dia. Peçamos-lhe a proteção da noite:' },
      { speaker: 'assembleia', text: 'Protegei-nos, Senhor, durante a noite.' },
      { speaker: 'sacerdote', text: 'Senhor Jesus, luz do mundo, que dissipais toda treva, dissipai as trevas do pecado e iluminai os nossos corações com a vossa graça.' },
      { speaker: 'assembleia', text: 'Protegei-nos, Senhor, durante a noite.' },
      { speaker: 'sacerdote', text: 'Senhor, que no deserto alimentastes o vosso povo com o maná, alimentai-nos também durante a noite com o vosso amor, para que amanhã possamos servi-Vos com renovadas forças.' },
      { speaker: 'assembleia', text: 'Protegei-nos, Senhor, durante a noite.' },
      { speaker: 'sacerdote', text: 'Ó Virgem Maria, estrela da manhã, que velais sobre o sono dos vossos filhos, intercedei por nós diante do vosso Filho.' },
      { speaker: 'assembleia', text: 'Protegei-nos, Senhor, durante a noite.' },
    ],
    concludingPrayer: 'Assistí, Senhor, junto do vosso povo que dorme,\npara que, despertados pela vossa graça,\npossamos-Vos servir com hearts alegres.\nE, quando a noite da morte chegar,\nnos receba na vossa luz eterna.\nPelo mesmo Cristo Nosso Senhor. Amém.',
  },

  oficio_leituras: {
    hour: 'oficio_leituras',
    title: 'Ofício das Leituras',
    invocation: [
      { speaker: 'assembleia', text: 'Abri, Senhor, os meus lábios.' },
      { speaker: 'sacerdote', text: 'E a minha boca proclamará o vosso louvor.' },
      { speaker: 'assembleia', text: 'Deus, vinde em meu auxílio.' },
      { speaker: 'sacerdote', text: 'Senhor, apressai-vos em socorrer-me.' },
      { speaker: 'assembleia', text: 'Glória ao Pai, ao Filho e ao Espírito Santo.' },
      { speaker: 'sacerdote', text: 'Como era no princípio, agora e sempre. Amém.' },
    ],
    hymn: 'Ó Deus, que dais a luz ao homem pela vossa Palavra,\nIluminai os nossos corações,\npara que possamos receber com fé\na vossa revelação.\n\nDai-nos o Espírito de sabedoria,\nque guia os profetas e os apóstolos,\ne nos faz compreender os mistérios\ndo vosso reino.\n\nAo Pai, ao Filho e ao Espírito Santo,\nseja louvor e glória eterna,\nPelo sempre e para sempre. Amém.',
    psalms: [
      {
        reference: 'Sl 18(19)',
        antiphon: 'Os céus proclamam a glória de Deus.',
        text: 'Os céus proclamam a glória de Deus,\no firmamento anuncia a obra das suas mãos.\n\nUm dia transmite a palavra ao outro,\enenhuma noite repete a notícia.\n\nNão são palavras nem são discursos\ncujo som se possa ouvir.\n\nO seu eco se espalha por toda a terra,\nas suas palavras até aos confins do mundo.\n\nNeles o sol fez uma tenda,\ne ele sai como um noivo do tálamo,\nalegre como um herói para percorrer a estrada.\n\nDo extremo dos céus é a sua origem,\no seu arco está até ao outro extremo;\nenfim, nada se esconde ao seu calor.\n\nA lei do Senhor é perfeita,\nrestaura a alma.\n\nO testemunho do Senhor é seguro,\ndá sabedoria aos simples.\n\nOs preceitos do Senhor são retos,\nalegram o coração.\n\nO mandamento do Senhor é puro,\nilumina os olhos.\n\nO temor do Senhor é límpido,\npermanece eternamente.\n\nOs juízos do Senhor são verdadeiros,\ntodos justos.\n\nSão mais desejáveis que o ouro,\nmais do que o ouro puro;\nsão mais doces que o mel,\nmais do que o mel dos favos.\n\nTambém o vosso servo é iluminado por eles,\no que os guarda colhe grande recompensa.\n\nQuem compreende as suas faltas?\nPurifica-me das que me são ocultas.\n\nAfasta também do vosso servo os orgulhosos,\npara que não dominem sobre mim.\n\nEntão serei inocente,\nisento de grande pecado.\n\nQue as palavras da minha boca\nsejam agradáveis ao vosso olhar.\n\nE que os pensamentos do meu coração\nsejam agradáveis perante Vós,\nSenhor, a minha rocha e o meu Redentor.',
      },
    ],
    shortReading: 'Toda a Escritura é inspirada por Deus e útil para ensinar, para refutar, para corrigir, para educar na justiça. — 2Tm 3,16-17',
    responsory: 'Vossa palavra, Senhor, é lâmpada para os meus passos e luz no meu caminho.',
    canticle: {
      label: 'Cântico da Palavra de Deus',
      text: 'Vossa palavra, Senhor, permanece para sempre;\na vossa verdade vai de geração em geração.\nVós criastes a terra e ela subsiste;\npela vossa ordem tudo se conserva.\nPorque tudo obedece às vossas ordens;\ntudo foi feito para vós.',
    },
    intercessions: [
      { speaker: 'sacerdote', text: 'O Senhor nos falou pela sua Palavra. Peçamos-lhe a graça de ouvi-lo:' },
      { speaker: 'assembleia', text: 'Fazei-nos ouvir, Senhor, a vossa Palavra.' },
      { speaker: 'sacerdote', text: 'Senhor, vós que falastes aos patriarcas e profetas, dai-nos a graça de ouvir a vossa voz e de seguir os vossos mandamentos.' },
      { speaker: 'assembleia', text: 'Fazei-nos ouvir, Senhor, a vossa Palavra.' },
      { speaker: 'sacerdote', text: 'Iluminai, Senhor, os nossos intelectos com a luz da vossa Palavra, para que possamos compreender os vossos desígnios e pôr em prática a vossa vontade.' },
      { speaker: 'assembleia', text: 'Fazei-nos ouvir, Senhor, a vossa Palavra.' },
    ],
    concludingPrayer: 'Ó Deus, que pelo vosso Filho nos revelastes os vossos mistérios, fazei que, meditando a vossa Palavra, possamos alcançar a vida eterna. Por Nosso Senhor Jesus Cristo. Amém.',
  },
};
