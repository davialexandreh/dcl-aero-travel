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
  // A4–A6 pedidos pelo cliente em 24/11/2026 (substituem a mentoria). Textos em rascunho até o cliente aprovar.
  {
    slug: 'personalizacao-de-roteiros',
    portao: 'A4',
    nome: 'Personalização de roteiros',
    tituloSeo: 'Personalização de roteiros | DCL Aero Travel',
    descricaoSeo: 'Roteiro de viagem montado com você, de acordo com o seu jeito de viajar, o seu tempo e o seu orçamento.',
    titulo: 'Roteiro personalizado para o seu jeito de viajar',
    lede: 'Você conta o que gosta, quanto tempo tem e quanto quer gastar. Nossa equipe monta o roteiro com você.',
    mensagem: 'Olá! Vim pelo site da DCL e quero um roteiro personalizado.',
    ref: 'roteiros',
    etapas: [
      { rotulo: 'Conversa', texto: 'Você conta o destino, as datas, quem vai e o que gosta de fazer.' },
      { rotulo: 'Roteiro', texto: 'Nossa equipe monta o roteiro e te manda para aprovar.' },
      { rotulo: 'Ajustes', texto: 'Você pede as mudanças e a DCL ajusta até ficar do seu jeito.' },
      { rotulo: 'Reservas', texto: 'Se quiser, a DCL cota as passagens, o hotel e o carro do roteiro.' },
    ],
    inclui: ['Roteiro montado com você', 'Ajustes até ficar do seu jeito', 'Passagem, hotel e carro, se você quiser'],
  },
  {
    slug: 'seguro-viagem',
    portao: 'A5',
    nome: 'Seguro viagem',
    tituloSeo: 'Seguro viagem | DCL Aero Travel',
    descricaoSeo: 'Seguro viagem cotado pela DCL para o seu destino e as suas datas, junto com a passagem ou separado.',
    titulo: 'Seguro viagem para o seu destino e as suas datas',
    lede: 'Nossa equipe cota o seguro junto com a sua viagem ou separado, e te explica o que cada opção cobre.',
    mensagem: 'Olá! Vim pelo site da DCL e quero cotar um seguro viagem.',
    ref: 'seguro',
    etapas: [
      { rotulo: 'Pedido', texto: 'Você manda o destino, as datas e a idade de quem vai viajar.' },
      { rotulo: 'Cotação', texto: 'Nossa equipe compara as opções e te explica o que cada uma cobre.' },
      { rotulo: 'Contratação', texto: 'Escolheu, a DCL contrata o seguro e te manda os documentos pelo WhatsApp.' },
    ],
    inclui: ['Cotação para o seu destino e as suas datas', 'Junto com a passagem ou separado', 'Explicação do que cada opção cobre'],
  },
  {
    slug: 'cruzeiros',
    portao: 'A6',
    nome: 'Cruzeiros',
    tituloSeo: 'Cruzeiros | DCL Aero Travel',
    descricaoSeo: 'Cruzeiros cotados pela DCL, com roteiro, datas e cabine escolhidos com você e acompanhamento do orçamento à volta.',
    titulo: 'Cruzeiros com o roteiro e a cabine escolhidos com você',
    lede: 'Nossa equipe compara roteiros, navios e cabines e acompanha a sua viagem do orçamento à volta.',
    mensagem: 'Olá! Vim pelo site da DCL e quero cotar um cruzeiro.',
    ref: 'cruzeiros',
    etapas: [
      { rotulo: 'Conversa', texto: 'Você conta as datas, quem vai e de onde quer sair.' },
      { rotulo: 'Proposta', texto: 'Nossa equipe compara roteiros, navios e cabines e te manda as opções.' },
      { rotulo: 'Reserva', texto: 'Fechou, a DCL confirma a reserva e envia os documentos pelo WhatsApp.' },
      { rotulo: 'Embarque', texto: 'Se precisar, a DCL cota também a passagem até o porto.' },
    ],
    inclui: ['Roteiro, datas e cabine escolhidos com você', 'Passagem até o porto, se você precisar', 'Acompanhamento do orçamento à volta'],
  },
];
