// Bandeiras: SVGs do projeto "flag-icons" (licença MIT), copiados para src/assets/flags.
const flagFiles = import.meta.glob<string>('../assets/flags/*.svg', {
  eager: true,
  query: '?url',
  import: 'default',
});

function flagUrl(code: string): string {
  const url = flagFiles[`../assets/flags/${code}.svg`];
  if (!url) throw new Error(`Bandeira não encontrada: ${code}`);
  return url;
}

export type Country = {
  code: string;
  name: string;
  /** Preposição usada em "É a bandeira do Brasil", "da França", "dos Estados Unidos"... */
  de: string;
  level: number;
  /** Capital do país, mostrada depois que ele acerta a bandeira. */
  capital: string;
  /** Cores principais e o "desenho" da bandeira: usados para medir o quanto duas bandeiras se parecem. */
  colors: readonly string[];
  pattern: string;
  fact: string;
  flag: string;
};

export type Level = { id: number; title: string; emoji: string };

export const LEVELS: readonly Level[] = [
  { id: 1, title: 'Bandeiras famosas', emoji: '🌟' },
  { id: 2, title: 'Volta ao mundo', emoji: '✈️' },
  { id: 3, title: 'Explorador', emoji: '🧭' },
  { id: 4, title: 'Aventureiro', emoji: '🚀' },
  { id: 5, title: 'Grande desafio', emoji: '🏅' },
  { id: 6, title: 'Bandeiras raras', emoji: '💎' },
];

export const MAX_LEVEL = LEVELS.length;

/** Quantos acertos são necessários para passar de nível. */
export const CORRECT_TO_LEVEL_UP = 8;

type RawCountry = Omit<Country, 'flag'>;

const RAW: RawCountry[] = [
  // Nível 1 — países bem conhecidos
  { code: 'br', name: 'Brasil', de: 'do', level: 1, capital: 'Brasília', pattern: 'diamond', colors: ['green', 'yellow', 'blue', 'white'], fact: 'Tem 27 estrelas: uma para cada estado e uma para o Distrito Federal!' },
  { code: 'ar', name: 'Argentina', de: 'da', level: 1, capital: 'Buenos Aires', pattern: 'stripes-sun', colors: ['lightblue', 'white', 'yellow'], fact: 'O solzinho no meio se chama Sol de Maio!' },
  { code: 'us', name: 'Estados Unidos', de: 'dos', level: 1, capital: 'Washington', pattern: 'stars-stripes', colors: ['red', 'white', 'blue'], fact: 'São 50 estrelas, uma para cada estado americano!' },
  { code: 'fr', name: 'França', de: 'da', level: 1, capital: 'Paris', pattern: 'v-tricolor', colors: ['blue', 'white', 'red'], fact: 'Azul, branco e vermelho! Lá fica a famosa Torre Eiffel.' },
  { code: 'it', name: 'Itália', de: 'da', level: 1, capital: 'Roma', pattern: 'v-tricolor', colors: ['green', 'white', 'red'], fact: 'Tem as mesmas cores da pizza margherita: manjericão, muçarela e tomate! 🍕' },
  { code: 'jp', name: 'Japão', de: 'do', level: 1, capital: 'Tóquio', pattern: 'disc', colors: ['white', 'red'], fact: 'A bolinha vermelha é o Sol. O Japão é a "Terra do Sol Nascente"!' },
  { code: 'pt', name: 'Portugal', de: 'de', level: 1, capital: 'Lisboa', pattern: 'v-bicolor-emblem', colors: ['green', 'red', 'yellow'], fact: 'Em Portugal se fala português, igualzinho ao Brasil!' },
  { code: 'de', name: 'Alemanha', de: 'da', level: 1, capital: 'Berlim', pattern: 'h-tricolor', colors: ['black', 'red', 'yellow'], fact: 'Três listras deitadas: preto, vermelho e dourado!' },

  // Nível 2
  { code: 'es', name: 'Espanha', de: 'da', level: 2, capital: 'Madri', pattern: 'h-stripes-emblem', colors: ['red', 'yellow'], fact: 'A listra amarela do meio é duas vezes mais larga que as vermelhas!' },
  { code: 'gb', name: 'Reino Unido', de: 'do', level: 2, capital: 'Londres', pattern: 'union-jack', colors: ['blue', 'white', 'red'], fact: 'Ela junta três cruzes: da Inglaterra, da Escócia e da Irlanda!' },
  { code: 'ca', name: 'Canadá', de: 'do', level: 2, capital: 'Ottawa', pattern: 'leaf', colors: ['red', 'white'], fact: 'A folha é de uma árvore chamada bordo, que dá um xarope docinho! 🍁' },
  { code: 'mx', name: 'México', de: 'do', level: 2, capital: 'Cidade do México', pattern: 'v-tricolor', colors: ['green', 'white', 'red'], fact: 'No meio tem uma águia em cima de um cacto, segurando uma cobra! 🦅' },
  { code: 'cn', name: 'China', de: 'da', level: 2, capital: 'Pequim', pattern: 'stars-corner', colors: ['red', 'yellow'], fact: 'Tem uma estrela amarela grande e quatro estrelinhas!' },
  { code: 'kr', name: 'Coreia do Sul', de: 'da', level: 2, capital: 'Seul', pattern: 'disc-symbols', colors: ['white', 'red', 'blue', 'black'], fact: 'O círculo do meio é metade vermelho e metade azul!' },
  { code: 'uy', name: 'Uruguai', de: 'do', level: 2, capital: 'Montevidéu', pattern: 'stripes-sun', colors: ['white', 'lightblue', 'yellow'], fact: 'O Uruguai também tem um Sol de Maio, igual à Argentina! ☀️' },
  { code: 'ch', name: 'Suíça', de: 'da', level: 2, capital: 'Berna', pattern: 'cross', colors: ['red', 'white'], fact: 'A Suíça é famosa pelos chocolates e pelas montanhas com neve! 🏔️' },
  // Menos conhecidos, para começar a deixar o jogo mais interessante
  { code: 've', name: 'Venezuela', de: 'da', level: 2, capital: 'Caracas', pattern: 'h-tricolor-stars', colors: ['yellow', 'blue', 'red', 'white'], fact: 'Tem 8 estrelinhas brancas em forma de arco! A Venezuela é vizinha do Brasil.' },
  { code: 'ng', name: 'Nigéria', de: 'da', level: 2, capital: 'Abuja', pattern: 'v-tricolor', colors: ['green', 'white'], fact: 'Verde, branco e verde! O verde lembra a natureza e o branco, a paz.' },

  // Nível 3
  { code: 'cl', name: 'Chile', de: 'do', level: 3, capital: 'Santiago', pattern: 'star-canton', colors: ['white', 'red', 'blue'], fact: 'O Chile é um país bem compridinho e magrinho no mapa!' },
  { code: 'co', name: 'Colômbia', de: 'da', level: 3, capital: 'Bogotá', pattern: 'h-tricolor', colors: ['yellow', 'blue', 'red'], fact: 'A listra amarela ocupa a metade de cima da bandeira!' },
  { code: 'au', name: 'Austrália', de: 'da', level: 3, capital: 'Camberra', pattern: 'union-jack-stars', colors: ['blue', 'white', 'red'], fact: 'As estrelas formam o Cruzeiro do Sul, que também está na bandeira do Brasil!' },
  { code: 'in', name: 'Índia', de: 'da', level: 3, capital: 'Nova Délhi', pattern: 'h-tricolor', colors: ['orange', 'white', 'green', 'blue'], fact: 'A rodinha azul do meio tem 24 raios!' },
  { code: 'gr', name: 'Grécia', de: 'da', level: 3, capital: 'Atenas', pattern: 'stripes-cross', colors: ['blue', 'white'], fact: 'Ela tem 9 listras azuis e brancas!' },
  { code: 'se', name: 'Suécia', de: 'da', level: 3, capital: 'Estocolmo', pattern: 'nordic-cross', colors: ['blue', 'yellow'], fact: 'Uma cruz amarela no meio do azul!' },
  { code: 'za', name: 'África do Sul', de: 'da', level: 3, capital: 'Pretória', pattern: 'y-shape', colors: ['red', 'blue', 'green', 'black', 'yellow', 'white'], fact: 'Ela tem seis cores! É uma das bandeiras mais coloridas do mundo.' },
  { code: 'eg', name: 'Egito', de: 'do', level: 3, capital: 'Cairo', pattern: 'h-tricolor-emblem', colors: ['red', 'white', 'black', 'yellow'], fact: 'No meio tem uma águia dourada. E no Egito ficam as pirâmides!' },
  { code: 'is', name: 'Islândia', de: 'da', level: 3, capital: 'Reykjavík', pattern: 'nordic-cross', colors: ['blue', 'white', 'red'], fact: 'Na Islândia tem vulcões e gêiseres que soltam jatos de água quente para o alto!' },
  { code: 'vn', name: 'Vietnã', de: 'do', level: 3, capital: 'Hanói', pattern: 'star-center', colors: ['red', 'yellow'], fact: 'Uma estrela amarela de cinco pontas no meio do vermelho! ⭐' },

  // Nível 4
  { code: 'pe', name: 'Peru', de: 'do', level: 4, capital: 'Lima', pattern: 'v-tricolor', colors: ['red', 'white'], fact: 'No Peru fica Machu Picchu, uma cidade antiga lá no alto das montanhas!' },
  { code: 'py', name: 'Paraguai', de: 'do', level: 4, capital: 'Assunção', pattern: 'h-tricolor-emblem', colors: ['red', 'white', 'blue'], fact: 'A bandeira do Paraguai tem um desenho diferente de cada lado!' },
  { code: 'nz', name: 'Nova Zelândia', de: 'da', level: 4, capital: 'Wellington', pattern: 'union-jack-stars', colors: ['blue', 'red', 'white'], fact: 'Tem quatro estrelas vermelhas do Cruzeiro do Sul!' },
  { code: 'no', name: 'Noruega', de: 'da', level: 4, capital: 'Oslo', pattern: 'nordic-cross', colors: ['red', 'white', 'blue'], fact: 'Uma cruz azul com bordinha branca em cima do vermelho!' },
  { code: 'dk', name: 'Dinamarca', de: 'da', level: 4, capital: 'Copenhague', pattern: 'nordic-cross', colors: ['red', 'white'], fact: 'Dizem que é a bandeira mais antiga do mundo que ainda é usada!' },
  { code: 'ma', name: 'Marrocos', de: 'do', level: 4, capital: 'Rabat', pattern: 'star-center', colors: ['red', 'green'], fact: 'A estrela verde do meio tem cinco pontas!' },
  { code: 'jm', name: 'Jamaica', de: 'da', level: 4, capital: 'Kingston', pattern: 'saltire', colors: ['green', 'yellow', 'black'], fact: 'É a única bandeira de país sem vermelho, sem branco e sem azul!' },
  { code: 'ie', name: 'Irlanda', de: 'da', level: 4, capital: 'Dublin', pattern: 'v-tricolor', colors: ['green', 'white', 'orange'], fact: 'Verde, branco e laranja! O trevo é um símbolo da Irlanda. ☘️' },
  { code: 'np', name: 'Nepal', de: 'do', level: 4, capital: 'Katmandu', pattern: 'pennants', colors: ['red', 'blue', 'white'], fact: 'É a única bandeira de país que não é retangular: são dois triângulos! 🏔️' },
  { code: 'bt', name: 'Butão', de: 'do', level: 4, capital: 'Thimphu', pattern: 'diagonal-emblem', colors: ['yellow', 'orange', 'white'], fact: 'Tem um dragão branco no meio! O Butão é a "Terra do Dragão do Trovão". 🐉' },

  // Nível 5
  { code: 'nl', name: 'Holanda', de: 'da', level: 5, capital: 'Amsterdã', pattern: 'h-tricolor', colors: ['red', 'white', 'blue'], fact: 'Na Holanda tem muitos moinhos de vento e tulipas! 🌷' },
  { code: 'be', name: 'Bélgica', de: 'da', level: 5, capital: 'Bruxelas', pattern: 'v-tricolor', colors: ['black', 'yellow', 'red'], fact: 'Preto, amarelo e vermelho, em pé! A Bélgica é famosa pelos waffles.' },
  { code: 'ru', name: 'Rússia', de: 'da', level: 5, capital: 'Moscou', pattern: 'h-tricolor', colors: ['white', 'blue', 'red'], fact: 'A Rússia é o maior país do mundo!' },
  { code: 'tr', name: 'Turquia', de: 'da', level: 5, capital: 'Ancara', pattern: 'crescent', colors: ['red', 'white'], fact: 'Uma lua e uma estrela brancas no vermelho! 🌙' },
  { code: 'fi', name: 'Finlândia', de: 'da', level: 5, capital: 'Helsinque', pattern: 'nordic-cross', colors: ['white', 'blue'], fact: 'Uma cruz azul na neve branca! Dizem que lá mora o Papai Noel. 🎅' },
  { code: 'ke', name: 'Quênia', de: 'do', level: 5, capital: 'Nairóbi', pattern: 'h-stripes-shield', colors: ['black', 'red', 'green', 'white'], fact: 'No meio tem um escudo e duas lanças!' },
  { code: 'cu', name: 'Cuba', de: 'de', level: 5, capital: 'Havana', pattern: 'triangle-stripes', colors: ['blue', 'white', 'red'], fact: 'Um triângulo vermelho com uma estrela branca!' },
  { code: 'bo', name: 'Bolívia', de: 'da', level: 5, capital: 'Sucre', pattern: 'h-tricolor-emblem', colors: ['red', 'yellow', 'green'], fact: 'Vermelho, amarelo e verde! A Bolívia é vizinha do Brasil.' },
  { code: 'mn', name: 'Mongólia', de: 'da', level: 5, capital: 'Ulan Bator', pattern: 'v-tricolor-emblem', colors: ['red', 'blue', 'yellow'], fact: 'Muitas famílias da Mongólia moram em tendas redondas chamadas iurtas!' },
  { code: 'sc', name: 'Seychelles', de: 'de', level: 5, capital: 'Vitória', pattern: 'rays', colors: ['blue', 'yellow', 'red', 'white', 'green'], fact: 'Cinco faixas coloridas saem do cantinho, como raios de sol! 🌈' },

  // Nível 6 — bandeiras raras, de países pouco conhecidos
  { code: 'kz', name: 'Cazaquistão', de: 'do', level: 6, capital: 'Astana', pattern: 'sun-bird', colors: ['lightblue', 'yellow'], fact: 'Tem um sol dourado e uma águia voando no céu azul! 🦅' },
  { code: 'pg', name: 'Papua-Nova Guiné', de: 'de', level: 6, capital: 'Port Moresby', pattern: 'diagonal-stars', colors: ['red', 'black', 'yellow', 'white'], fact: 'Tem uma ave-do-paraíso dourada e as estrelas do Cruzeiro do Sul!' },
  { code: 'ki', name: 'Kiribati', de: 'de', level: 6, capital: 'Tarawa do Sul', pattern: 'sun-bird-waves', colors: ['red', 'yellow', 'blue', 'white'], fact: 'Um pássaro voando sobre o sol nascente e as ondas do mar! 🌅' },
  { code: 'dm', name: 'Dominica', de: 'da', level: 6, capital: 'Roseau', pattern: 'cross-disc', colors: ['green', 'yellow', 'black', 'white', 'red'], fact: 'Tem um papagaio no meio! Ele se chama sisserou e só vive lá. 🦜' },
  { code: 'bz', name: 'Belize', de: 'de', level: 6, capital: 'Belmopan', pattern: 'h-stripes-disc', colors: ['blue', 'red', 'white'], fact: 'No brasão tem dois lenhadores e uma árvore de mogno! 🌳' },
  { code: 'cy', name: 'Chipre', de: 'de', level: 6, capital: 'Nicósia', pattern: 'map', colors: ['white', 'orange', 'green'], fact: 'O desenho do meio é o mapa da ilha de Chipre, com dois raminhos de oliveira!' },
  { code: 'la', name: 'Laos', de: 'do', level: 6, capital: 'Vientiane', pattern: 'h-tricolor-disc', colors: ['red', 'blue', 'white'], fact: 'A bola branca parece uma lua cheia em cima de um rio! 🌕' },
  { code: 'bb', name: 'Barbados', de: 'de', level: 6, capital: 'Bridgetown', pattern: 'v-tricolor-emblem', colors: ['blue', 'yellow', 'black'], fact: 'No meio tem um tridente, o garfo de três pontas do deus do mar! 🔱' },
  { code: 'ug', name: 'Uganda', de: 'de', level: 6, capital: 'Kampala', pattern: 'h-stripes-disc', colors: ['black', 'yellow', 'red', 'white'], fact: 'No meio tem um grou-coroado, um pássaro com uma coroa de penas!' },
  { code: 'mv', name: 'Maldivas', de: 'das', level: 6, capital: 'Malé', pattern: 'crescent-box', colors: ['red', 'green', 'white'], fact: 'Uma lua branca dentro de um retângulo verde, com borda vermelha! 🌙' },
];

export const COUNTRIES: readonly Country[] = RAW.map((c) => ({ ...c, flag: flagUrl(c.code) }));

const BY_CODE = new Map(COUNTRIES.map((c) => [c.code, c]));

export function countryByCode(code: string): Country {
  const c = BY_CODE.get(code);
  if (!c) throw new Error(`País desconhecido: ${code}`);
  return c;
}
