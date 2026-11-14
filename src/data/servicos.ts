// Conteúdo das páginas de serviço. Só afirmações confirmadas pelo cliente ou pelo site atual.
export interface Servico {
  slug: string;
  portao: string;
  nome: string;
  tituloSeo: string;
  descricaoSeo: string;
  titulo: string;
  lede: string;
  mensagem: string;
  ref: string;
  rotuloBotao?: string;
  etapas: { rotulo: string; texto: string }[];
  inclui: string[];
  modalidades?: { nome: string; texto: string }[];
  mostraPacotes?: boolean;
}

export const servicos: Servico[] = [
  {
    slug: 'passagens-aereas',
    portao: 'A1',
    nome: 'Passagens aéreas',
    tituloSeo: 'Passagens aéreas | DCL Aero Travel',
    descricaoSeo: 'Passagens aéreas nacionais e internacionais pelo melhor preço que a DCL encontrar, com parcelamento no cartão e check-in feito pela DCL.',
    titulo: 'Passagens aéreas pelo melhor preço que a DCL encontrar',
    lede: 'Voos nacionais e internacionais com parcelamento no cartão. Nossa equipe compara as opções e você só aprova.',
    mensagem: 'Olá! Vim pelo site da DCL e quero cotar uma passagem aérea.',
    ref: 'passagens',
    etapas: [
      { rotulo: 'Pedido', texto: 'Você manda origem, destino, datas e quantas pessoas vão viajar.' },
      { rotulo: 'Busca', texto: 'Nossa equipe compara as opções de voo e preço e te passa a melhor.' },
      { rotulo: 'Emissão', texto: 'Aprovou, a DCL emite a passagem no seu nome e manda tudo pelo WhatsApp.' },
      { rotulo: 'Check-in', texto: 'Perto do voo, o check-in também fica com a DCL.' },
    ],
    inclui: ['Voos nacionais e internacionais', 'Parcelamento no cartão', 'Check-in feito pela DCL', 'Acompanhamento até a volta'],
  },
  {
    slug: 'pacotes',
    portao: 'A2',
    nome: 'Pacotes de viagem',
    tituloSeo: 'Pacotes de viagem | DCL Aero Travel',
    descricaoSeo: 'Pacotes com passagem, hotel e passeios, montados para o seu jeito de viajar e acompanhados do orçamento à volta.',
    titulo: 'Pacotes com passagem, hotel e passeios',
    lede: 'Montados para o seu jeito de viajar, com a mesma equipe acompanhando do orçamento à volta.',
    mensagem: 'Olá! Vim pelo site da DCL e quero cotar um pacote de viagem.',
    ref: 'pacotes',
    etapas: [
      { rotulo: 'Conversa', texto: 'Você conta o destino, as datas, quem vai e o que espera da viagem.' },
      { rotulo: 'Proposta', texto: 'Nossa equipe monta o pacote com voo, hotel e passeios e te manda as opções.' },
      { rotulo: 'Reserva', texto: 'Fechou, a DCL emite as passagens, confirma as reservas e envia os documentos.' },
      { rotulo: 'Viagem', texto: 'Do check-in à volta, nossa equipe acompanha se está tudo correndo bem.' },
    ],
    inclui: ['Passagem, hotel e passeios num pacote só', 'Roteiro montado para você', 'Parcelamento no cartão', 'Acompanhamento durante a viagem'],
    mostraPacotes: true,
  },
  {
    slug: 'aluguel-de-carros',
    portao: 'A3',
    nome: 'Aluguel de carros',
    tituloSeo: 'Aluguel de carros | DCL Aero Travel',
    descricaoSeo: 'Carro reservado para retirar no aeroporto, do popular ao SUV, junto com a sua viagem ou separado.',
    titulo: 'Aluguel de carros para retirar no aeroporto',
    lede: 'Do popular ao SUV, reservado junto com a sua viagem ou separado.',
    mensagem: 'Olá! Vim pelo site da DCL e quero cotar aluguel de carro.',
    ref: 'carros',
    etapas: [
      { rotulo: 'Pedido', texto: 'Você diz a cidade, as datas de retirada e devolução e o tipo de carro.' },
      { rotulo: 'Cotação', texto: 'Nossa equipe compara as opções e te passa a melhor.' },
      { rotulo: 'Reserva', texto: 'A DCL confirma a reserva e te manda os dados pelo WhatsApp.' },
      { rotulo: 'Retirada', texto: 'Você retira o carro no aeroporto e segue viagem.' },
    ],
    inclui: ['Retirada nos principais aeroportos', 'Do popular ao SUV', 'Reserva junto com a passagem, se você quiser'],
  },
  {
    slug: 'mentoria-de-viagens',
    portao: 'A4',
    nome: 'Mentoria de viagens',
    tituloSeo: 'Mentoria de viagens | DCL Aero Travel',
    descricaoSeo: 'Treinamento para aprender a planejar e emitir as suas próprias passagens, ou gestão completa dos seus programas de fidelidade.',
    titulo: 'Mentoria de viagens',
    lede: 'Para quem acumula milhas e quer aprender a usar, ou prefere que alguém cuide disso.',
    mensagem: 'Olá! Vim pelo site da DCL e quero saber sobre a mentoria de viagens.',
    ref: 'mentoria',
    etapas: [
      { rotulo: 'Conversa', texto: 'Você conta como acumula milhas hoje e o que quer fazer com elas.' },
      { rotulo: 'Plano', texto: 'Nossa equipe indica o treinamento ou a gestão, conforme o seu caso.' },
      { rotulo: 'Acompanha', texto: 'A DCL acompanha os resultados com você e ajusta o caminho.' },
    ],
    modalidades: [
      { nome: 'Treinamento', texto: 'Você aprende a acumular milhas e a emitir as suas próprias passagens com elas.' },
      { nome: 'Gestão de milhas', texto: 'Nossa equipe cuida das suas contas de milhas: bancos e cartões, transferências bonificadas, acúmulo e emissões.' },
    ],
    inclui: [],
  },
];
