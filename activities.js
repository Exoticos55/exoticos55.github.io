// ===================================================================
// LISTA DE ATIVIDADES
// ===================================================================
// Edite esta lista sempre que tiver uma atividade nova do Classroom.
// Copie um bloco { ... } e ajuste os dados. Não precisa tocar em
// nenhum outro arquivo do site.
//
// Campos:
//   titulo     -> nome da atividade (igual ao Classroom, se possível)
//   data       -> data de entrega no formato "AAAA-MM-DD"
//   status     -> use exatamente um destes valores:
//                 "enviada"              -> já entreguei no Classroom
//                 "feita_nao_confirmada" -> eu fiz, mas não confirmei/
//                                           printei a tempo e o Classroom
//                                           ficou marcando como não feita
//                 "pendente"             -> ainda não entreguei, mas no prazo
//                 "atrasada"             -> passou do prazo e não fiz
//   link       -> link da atividade no GitHub (pasta/arquivo do código),
//                 ou "" se não tiver nada pra mostrar ainda
//   descricao  -> uma frase curta sobre o que era a atividade
//   nota       -> (opcional) observação extra que aparece destacada no
//                 card. Use pra explicar casos como o do quiz. Se não
//                 precisar, pode deixar "" ou remover a linha.
// ===================================================================

const atividades = [
  // ---------------------------------------------------------------
  // 19 atividades já entregues. Troque "Atividade XX" e a data pelo
  // título e data reais de cada uma (igual aparece no Classroom).
  // ---------------------------------------------------------------
  {
    titulo: "Atividade 01",
    data: "2026-03-10",
    status: "enviada",
    link: "",
    descricao: "Descreva aqui o que era essa atividade.",
  },
  {
    titulo: "Atividade 02",
    data: "2026-03-12",
    status: "enviada",
    link: "",
    descricao: "Descreva aqui o que era essa atividade.",
  },
  {
    titulo: "Atividade 03",
    data: "2026-03-14",
    status: "enviada",
    link: "",
    descricao: "Descreva aqui o que era essa atividade.",
  },
  {
    titulo: "Atividade 04",
    data: "2026-03-17",
    status: "enviada",
    link: "",
    descricao: "Descreva aqui o que era essa atividade.",
  },
  {
    titulo: "Atividade 05",
    data: "2026-03-19",
    status: "enviada",
    link: "",
    descricao: "Descreva aqui o que era essa atividade.",
  },
  {
    titulo: "Atividade 06",
    data: "2026-03-21",
    status: "enviada",
    link: "",
    descricao: "Descreva aqui o que era essa atividade.",
  },
  {
    titulo: "Atividade 07",
    data: "2026-03-24",
    status: "enviada",
    link: "",
    descricao: "Descreva aqui o que era essa atividade.",
  },
  {
    titulo: "Atividade 08",
    data: "2026-03-26",
    status: "enviada",
    link: "",
    descricao: "Descreva aqui o que era essa atividade.",
  },
  {
    titulo: "Atividade 09",
    data: "2026-03-28",
    status: "enviada",
    link: "",
    descricao: "Descreva aqui o que era essa atividade.",
  },
  {
    titulo: "Atividade 10",
    data: "2026-03-31",
    status: "enviada",
    link: "",
    descricao: "Descreva aqui o que era essa atividade.",
  },
  {
    titulo: "Atividade 11",
    data: "2026-04-02",
    status: "enviada",
    link: "",
    descricao: "Descreva aqui o que era essa atividade.",
  },
  {
    titulo: "Atividade 12",
    data: "2026-04-04",
    status: "enviada",
    link: "",
    descricao: "Descreva aqui o que era essa atividade.",
  },
  {
    titulo: "Atividade 13",
    data: "2026-04-07",
    status: "enviada",
    link: "",
    descricao: "Descreva aqui o que era essa atividade.",
  },
  {
    titulo: "Atividade 14",
    data: "2026-04-09",
    status: "enviada",
    link: "",
    descricao: "Descreva aqui o que era essa atividade.",
  },
  {
    titulo: "Atividade 15",
    data: "2026-04-11",
    status: "enviada",
    link: "",
    descricao: "Descreva aqui o que era essa atividade.",
  },
  {
    titulo: "Atividade 16",
    data: "2026-04-14",
    status: "enviada",
    link: "",
    descricao: "Descreva aqui o que era essa atividade.",
  },
  {
    titulo: "Atividade 17",
    data: "2026-04-16",
    status: "enviada",
    link: "",
    descricao: "Descreva aqui o que era essa atividade.",
  },
  {
    titulo: "Atividade 18",
    data: "2026-04-18",
    status: "enviada",
    link: "",
    descricao: "Descreva aqui o que era essa atividade.",
  },
  {
    titulo: "Atividade 19",
    data: "2026-04-21",
    status: "enviada",
    link: "",
    descricao: "Descreva aqui o que era essa atividade.",
  },

  // ---------------------------------------------------------------
  // Os 2 quiz feitos, mas não confirmados a tempo no Classroom.
  // Troque o título e a data pelos reais, e ajuste a "nota" se quiser.
  // ---------------------------------------------------------------
  {
    titulo: "Quiz - Módulo X",
    data: "2026-05-05",
    status: "feita_nao_confirmada",
    link: "",
    descricao: "Quiz feito no site indicado pelo professor.",
    nota: "Atividade foi realizada e marcada como concluída no site do quiz, mas não foi printada/confirmada no Classroom a tempo. Ficou registrada como não entregue.",
  },
  {
    titulo: "Quiz - Módulo Y",
    data: "2026-05-08",
    status: "feita_nao_confirmada",
    link: "",
    descricao: "Quiz feito no site indicado pelo professor.",
    nota: "Atividade foi realizada e marcada como concluída no site do quiz, mas não foi printada/confirmada no Classroom a tempo. Ficou registrada como não entregue.",
  },
  {
    titulo: "teste 1",
    data: "2026-03-11",
    status: "atrasada",
    link: "",
    descricao: "fdazer isto",
    nota: "ur du",
  },
];

// Não precisa editar nada abaixo desta linha.
if (typeof module !== "undefined") {
  module.exports = atividades;
}
