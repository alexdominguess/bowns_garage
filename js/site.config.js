/*
 * Brown´s Garage: configuração editável do site.
 *
 * Altere apenas este arquivo para trocar telefone, endereço, horários,
 * redes sociais, serviços, galeria e avaliações.
 *
 * Valores vazios ("") ou com "a definir" são placeholders:
 * - whatsapp.number vazio: os botões de WhatsApp levam até a seção de contato.
 * - social.instagram vazio: o link do Instagram some do site.
 * - reviews vazio: a seção de avaliações fica oculta.
 *
 * Para trocar uma imagem, substitua o arquivo em assets/img/ mantendo o nome,
 * ou aponte "image" / "src" para o novo caminho.
 */
window.SITE_CONFIG = {
  brand: {
    name: "Brown´s Garage",
    description: "Estética automotiva com precisão, técnica e cuidado em cada detalhe do seu veículo."
  },

  whatsapp: {
    // Número com DDI e DDD, somente dígitos. Exemplo: "5511912345678"
    number: "",
    scheduleMessage: "Olá! Gostaria de agendar um horário na Brown´s Garage.",
    quoteMessage: "Olá! Gostaria de solicitar um orçamento na Brown´s Garage.",
    // {servico} é substituído pelo nome do serviço
    serviceMessage: "Olá! Gostaria de solicitar um orçamento de {servico} na Brown´s Garage."
  },

  contact: {
    address: "Endereço a definir",
    phone: "(00) 00000-0000"
  },

  // Horários exibidos na seção de contato e no rodapé
  hours: [
    { label: "Segunda a sexta", time: "A definir" },
    { label: "Sábado", time: "A definir" }
  ],

  social: {
    instagram: "",            // URL completa, exemplo: "https://www.instagram.com/seuperfil"
    instagramLabel: "@seu-perfil"
  },

  legal: {
    cnpj: "CNPJ a definir"
  },

  // Comparador antes e depois. Ilustrativo: quando "before" e "after" apontam para a mesma foto,
  // o lado "antes" recebe um filtro de tons de cinza. Troque pelo par real da empresa.
  comparison: {
    before: { src: "assets/img/comparador-antes-depois.webp", alt: "Comparação ilustrativa: pintura antes do polimento" },
    after: { src: "assets/img/comparador-antes-depois.webp", alt: "Comparação ilustrativa: pintura depois do polimento" }
  },

  // Serviços na ordem de exibição. A grade se organiza automaticamente em 3 linhas de 2 itens.
  services: [
    {
      name: "Lavagem detalhada",
      description: "Limpeza cuidadosa da parte externa e dos detalhes do veículo.",
      image: "assets/img/servico-lavagem.webp",
      alt: "Lavagem manual de um carro escuro em área externa"
    },
    {
      name: "Higienização interna",
      description: "Limpeza profunda de bancos, carpetes, plásticos e superfícies internas.",
      image: "assets/img/servico-higienizacao.webp",
      alt: "Painel e volante de um veículo com acabamento interno"
    },
    {
      name: "Polimento técnico",
      description: "Correção de imperfeições superficiais e recuperação do brilho da pintura.",
      image: "assets/img/servico-polimento.webp",
      alt: "Sedã preto com pintura de alto brilho em via asfaltada"
    },
    {
      name: "Vitrificação e proteção",
      description: "Proteção da pintura com produtos específicos, conforme o serviço contratado.",
      image: "assets/img/servico-vitrificacao.webp",
      alt: "Traseira de carro esportivo recebendo jato de água"
    },
    {
      name: "Revitalização de faróis",
      description: "Recuperação da aparência e da transparência dos faróis, quando tecnicamente possível.",
      image: "assets/img/servico-farois.webp",
      alt: "Close do farol dianteiro de um veículo"
    },
    {
      name: "Detalhamento automotivo",
      description: "Cuidados específicos com rodas, pneus, vidros, acabamentos e outros componentes.",
      image: "assets/img/servico-detalhamento.webp",
      alt: "Veículo esportivo com linhas de carroceria em destaque"
    }
  ],

  // Galeria. Fotos ilustrativas: substitua pelos registros reais da empresa.
  // size: "wide" (larga) | "tall" (alta, ocupa duas linhas) | "square" | "half"
  // Vazia por enquanto: a galeria só aparece quando houver itens. Exemplo de item:
  // { src: "assets/img/galeria-01.webp", alt: "Descrição da foto", caption: "Legenda", size: "wide" }
  gallery: [],

  // Depoimentos reais. Formato: { author: "Nome", rating: 5, text: "Texto da avaliação." }
  reviews: []
};
