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
//                 "enviada"   -> já entreguei no Classroom
//                 "pendente"  -> ainda não entreguei, mas no prazo
//                 "atrasada"  -> passou do prazo e não entreguei
//   link       -> link da atividade no GitHub (pasta/arquivo do código),
//                 ou "" se não tiver nada pra mostrar ainda
//   descricao  -> uma frase curta sobre o que era a atividade
// ===================================================================

const atividades = [
  {
    titulo: "Atividade 01 - Lógica de Programação Básica",
    data: "2026-03-10",
    status: "enviada",
    link: "https://github.com/SEU-USUARIO/SEU-REPOSITORIO/tree/main/atividade-01",
    descricao: "Exercícios introdutórios de sequência lógica e pseudocódigo."
  },
  {
    titulo: "Atividade 02 - Estruturas Condicionais",
    data: "2026-03-24",
    status: "enviada",
    link: "https://github.com/SEU-USUARIO/SEU-REPOSITORIO/tree/main/atividade-02",
    descricao: "Implementação de problemas usando if/else em pseudocódigo e Python."
  },
  {
    titulo: "Atividade 03 - Laços de Repetição",
    data: "2026-04-14",
    status: "atrasada",
    link: "",
    descricao: "Exercícios com for e while para repetição de tarefas."
  },
  {
    titulo: "Atividade 04 - Vetores e Matrizes",
    data: "2026-05-05",
    status: "pendente",
    link: "",
    descricao: "Manipulação de vetores e matrizes em algoritmos."
  },
];

// Não precisa editar nada abaixo desta linha.
if (typeof module !== "undefined") {
  module.exports = atividades;
}
