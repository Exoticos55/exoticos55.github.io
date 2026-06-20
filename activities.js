// ===================================================================
// LISTA DE ATIVIDADES
// ===================================================================
// Edite esta lista sempre que tiver uma atividade nova do Classroom,
// ou use o admin.html para adicionar sem editar código.
//
// Campos:
//   titulo     -> nome da atividade (igual ao Classroom, se possível)
//   data       -> data de entrega no formato "AAAA-MM-DD"
//   status     -> "enviada" | "feita_nao_confirmada" | "pendente" | "atrasada"
//   link       -> link da atividade no GitHub, ou "" se não tiver
//   descricao  -> uma frase curta sobre o que era a atividade
//   nota       -> (opcional) observação extra destacada no card
// ===================================================================

const atividades = [
  {
    titulo: "Preenchimento do formulário de diagnóstico inicial",
    data: "2026-03-17",
    status: "enviada",
    link: "",
    descricao: "Formulário inicial de diagnóstico da disciplina.",
  },
  {
    titulo: "Lista de 15 exercícios: escolher e resolver",
    data: "2026-03-31",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/ODU3OTMyNTMyNjI1/details",
    descricao: "Escolha e resolução de exercícios de uma lista de 15.",
  },
  {
    titulo: "Lista de 10 Exercícios da INTRODUCAO A ALGORITMOS com Python by Claude.ai",
    data: "2026-04-10",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk2OTk2MzY4ODI0/details",
    descricao: "Exercícios introdutórios de algoritmos em Python.",
  },
  {
    titulo: "Geração e Avaliação de Exercícios de Algoritmos com LLMs",
    data: "2026-04-10",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/ODU4NTI5NjQyNzU0/details",
    descricao: "Uso de LLMs para gerar e avaliar exercícios de algoritmos.",
  },
  {
    titulo: "Quiz de Avaliação da Atividade: Uso de LLMs em Algoritmos e Programação",
    data: "2026-04-10",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/ODU4NTI5MjQ2OTE1/details",
    descricao: "Quiz avaliativo sobre o uso de LLMs na disciplina.",
  },
  {
    titulo: "Resolver os 5 exercícios em papel",
    data: "2026-04-21",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk3MjMyNjQ5OTYz/details",
    descricao: "Exercícios resolvidos manualmente, em papel.",
  },
  {
    titulo: "Resolver os exercícios de listas/vetores/arrays em Python",
    data: "2026-04-24",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk3MjM1NDcyNTQ0/details",
    descricao: "Exercícios práticos de listas, vetores e arrays em Python.",
  },
  {
    titulo: "Formulação e Resolução de Problemas com Vetores/Listas usando LLMs",
    data: "2026-04-24",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk3NDczMzk3Mzgy/details",
    descricao: "Problemas com vetores/listas formulados e resolvidos com apoio de LLMs.",
  },
  {
    titulo: "Atividade: Gerar as diferentes versões do código até ter resultados visuais interessantes e consistentes",
    data: "2026-05-05",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/ODYzMDE2ODMyNDUy/details",
    descricao: "Iteração de versões do código até obter resultados visuais consistentes.",
  },
  {
    titulo: "Atividade: Problemas de outras disciplinas – resolução em múltiplas abordagens",
    data: "2026-05-08",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/ODYzNjU2NzEyMTk1/details",
    descricao: "Resolução de problemas de outras disciplinas com múltiplas abordagens.",
  },
  {
    titulo: "Atividade: escolher e entregar 1 dos dois problemas de engenharia propostos",
    data: "2026-05-12",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/ODY0MTM1NzI0NTcx/details",
    descricao: "Resolução de um problema de engenharia escolhido entre dois propostos.",
  },
  {
    titulo: "Atividade: entregar o outro dos dois problemas de engenharia propostos da aula passada",
    data: "2026-05-15",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk3ODMwODA3ODA5/details",
    descricao: "Resolução do segundo problema de engenharia da dupla proposta.",
  },
  {
    titulo: "Escolher e resolver um problema de engenharia",
    data: "2026-05-19",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk3ODY4MDAzNTI3/details",
    descricao: "Escolha e resolução de um novo problema de engenharia.",
  },
  {
    titulo: "Evolução técnica da solução desenvolvida na atividade anterior",
    data: "2026-05-22",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/ODY1NzkxMDYxODM4/details",
    descricao: "Aprimoramento técnico da solução da atividade anterior.",
  },
  {
    titulo: "Modularização de Código e Avaliação de LLMs (em aula)",
    data: "2026-06-09",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk4MTQzMjAxNjY2/details",
    descricao: "Modularização de código com avaliação de LLMs, feita em aula.",
  },
  {
    titulo: "Escreva um breve relato sincero sobre as entrevistas",
    data: "2026-06-09",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/ODY3NDY1MDE4ODMy/details",
    descricao: "Relato sincero sobre as entrevistas realizadas.",
  },
  {
    titulo: "Avaliar criticamente o site alegrete.org",
    data: "2026-06-16",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk4MjE2NTk1NDU0/details",
    descricao: "Avaliação crítica do site alegrete.org.",
  },
  {
    titulo: "Atividade: Desenvolvimento Assistido por IA para o Portal Alegrete.org",
    data: "2026-06-16",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk4MjE2NjI2NzM2/details",
    descricao: "Desenvolvimento assistido por IA para o portal Alegrete.org.",
  },
  {
    titulo: "Postar o link e um print do seu site .github.io",
    data: "2026-06-19",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk4MjU3ODA0MTc5/details",
    descricao: "Publicação do link e print do site pessoal no GitHub Pages.",
  },

  // ---------------------------------------------------------------
  // Os 2 quiz feitos, mas não confirmados a tempo no Classroom.
  // ---------------------------------------------------------------
  {
    titulo: "Quiz – Lógica de Programação (Preparatório em aula)",
    data: "2026-03-20",
    status: "feita_nao_confirmada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk2NjkyMTA3NDYx/details",
    descricao: "Quiz preparatório de lógica de programação, feito em aula.",
    nota: "Atividade foi realizada e marcada como concluída no site do quiz, mas não foi printada/confirmada no Classroom a tempo. Ficou registrada como não entregue.",
  },
  {
    titulo: "Quiz – Diagnóstico de Lógica de Programação",
    data: "2026-03-27",
    status: "feita_nao_confirmada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk2Njc5NDA1MDYy/details",
    descricao: "Quiz diagnóstico de lógica de programação.",
    nota: "Atividade foi realizada e marcada como concluída no site do quiz, mas não foi printada/confirmada no Classroom a tempo. Ficou registrada como não entregue.",
  },
];

// Não precisa editar nada abaixo desta linha.
if (typeof module !== "undefined") {
  module.exports = atividades;
}
