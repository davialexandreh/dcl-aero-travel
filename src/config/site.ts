// Dados fixos da DCL. Itens marcados PENDENTE ainda dependem do cliente.
export const site = {
  nome: 'DCL Aero Travel',
  url: 'https://dclaerotravel.com.br',
  whatsapp: '5511947155818',
  whatsappExibicao: '(11) 94715-5818',
  email: 'contato@dclaerotravel.com.br',
  instagram: 'https://www.instagram.com/dclaero_travel/',
  // PENDENTE: link de convite do grupo de promoções no WhatsApp.
  grupoPromocoes: '',
  cnpj: '59.352.256/0001-00',
  // Na call de 23/10 o David disse que o número do Cadastur é o próprio CNPJ. Conferir na consulta pública.
  cadastur: '59.352.256/0001-00',
  responsavel: 'David Campos Luiz',
  gaId: import.meta.env.PUBLIC_GA_ID ?? '',
} as const;
