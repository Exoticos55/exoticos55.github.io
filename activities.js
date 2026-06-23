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
//   link       -> link da atividade no Classroom, ou "" se não tiver
//   descricao  -> uma frase curta sobre o que era a atividade
//   nota       -> (opcional) observação extra destacada no card
//   arquivos   -> (opcional) lista de anexos: [{ nome: "x.pdf", url: "..." }]
//                 aparecem como chips clicáveis dentro do card. Preenchido
//                 automaticamente pelo admin.html ao subir um arquivo.
// ===================================================================

const atividades = [
  {
    titulo: "Preenchimento do formulário de diagnóstico inicial",
    data: "2026-03-17",
    status: "enviada",
    link: "",
    descricao: "Formulário inicial de diagnóstico da disciplina.",
    arquivos: [
      { nome: "Questionário Diagnóstico - Algoritmos e Programação.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782254122282-Questionario-Diagnostico---Algoritmos-e-Programacao.pdf" },
    ],
  },
  {
    titulo: "Lista de 15 exercícios: escolher e resolver",
    data: "2026-03-31",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/ODU3OTMyNTMyNjI1/details",
    descricao: "Escolha e resolução de exercícios de uma lista de 15.",
    arquivos: [
      { nome: "15atividades.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782252190595-15atividades.pdf" },
    ],
  },
  {
    titulo: "Lista de 10 Exercícios da INTRODUCAO A ALGORITMOS com Python by Claude.ai",
    data: "2026-04-10",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk2OTk2MzY4ODI0/details",
    descricao: "Exercícios introdutórios de algoritmos em Python.",
    arquivos: [
      { nome: "10atividadespy.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251919434-10atividadespy.pdf" },
    ],
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
    arquivos: [
      { nome: "CodigosgeradosporLLM.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251787582-CodigosgeradosporLLM.pdf" },
      { nome: "IMG_20260418_163328.jpg", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251789542-IMG_20260418_163328.jpg" },
      { nome: "IMG_20260418_170031.jpg", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251799011-IMG_20260418_170031.jpg" },
      { nome: "IMG_20260418_164248.jpg", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251807157-IMG_20260418_164248.jpg" },
      { nome: "IMG_20260418_164959.jpg", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251815731-IMG_20260418_164959.jpg" },
    ],
  },
  {
    titulo: "Resolver os exercícios de listas/vetores/arrays em Python",
    data: "2026-04-24",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk3MjM1NDcyNTQ0/details",
    descricao: "Exercícios práticos de listas, vetores e arrays em Python.",
    arquivos: [
      { nome: "listasvetoresarrays.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251698424-listasvetoresarrays.pdf" },
    ],
  },
  {
    titulo: "Formulação e Resolução de Problemas com Vetores/Listas usando LLMs",
    data: "2026-04-24",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk3NDczMzk3Mzgy/details",
    descricao: "Problemas com vetores/listas formulados e resolvidos com apoio de LLMs.",
    arquivos: [
      { nome: "IMG_20260424_142216.jpg", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251630505-IMG_20260424_142216.jpg" },
      { nome: "IMG_20260424_142226.jpg", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251638977-IMG_20260424_142226.jpg" },
    ],
  },
  {
    titulo: "Atividade: Gerar as diferentes versões do código até ter resultados visuais interessantes e consistentes",
    data: "2026-05-05",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/ODYzMDE2ODMyNDUy/details",
    descricao: "Iteração de versões do código até obter resultados visuais consistentes.",
    arquivos: [
      { nome: "exercicio3_v4_com_graficos.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251393818-exercicio3_v4_com_graficos.py" },
      { nome: "exercicio3_v3_avancada.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251395126-exercicio3_v3_avancada.py" },
      { nome: "exercicio3_v2_intermediaria.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251396478-exercicio3_v2_intermediaria.py" },
      { nome: "exercicio3_v1_basica.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251397561-exercicio3_v1_basica.py" },
      { nome: "rota usando alegrete como exemplo.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251409509-rota-usando-alegrete-como-exemplo.pdf" },
      { nome: "mapa_simples_rota_otimizada.png.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251411509-mapa_simples_rota_otimizada.png.pdf" },
      { nome: "mapa_simples_rota_original.png.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251413007-mapa_simples_rota_original.png.pdf" },
    ],
  },
  {
    titulo: "Atividade: Problemas de outras disciplinas – resolução em múltiplas abordagens",
    data: "2026-05-08",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/ODYzNjU2NzEyMTk1/details",
    descricao: "Resolução de problemas de outras disciplinas com múltiplas abordagens.",
    arquivos: [
      { nome: "grafico_comparativo.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251149932-grafico_comparativo.py" },
      { nome: "abordagem2_simpson.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251151018-abordagem2_simpson.py" },
      { nome: "abordagem1_riemann.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251152254-abordagem1_riemann.py" },
      { nome: "abordagem3_scipy.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251153341-abordagem3_scipy.py" },
      { nome: "atividade_calculo.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251154414-atividade_calculo.pdf" },
    ],
  },
  {
    titulo: "Atividade: escolher e entregar 1 dos dois problemas de engenharia propostos",
    data: "2026-05-12",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/ODY0MTM1NzI0NTcx/details",
    descricao: "Resolução de um problema de engenharia escolhido entre dois propostos.",
    arquivos: [
      { nome: "codigos_gemini.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251037598-codigos_gemini.py" },
      { nome: "codigos_chatgpt.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251038725-codigos_chatgpt.py" },
      { nome: "codigos_claude.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251039731-codigos_claude.py" },
    ],
  },
  {
    titulo: "Atividade: entregar o outro dos dois problemas de engenharia propostos da aula passada",
    data: "2026-05-15",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk3ODMwODA3ODA5/details",
    descricao: "Resolução do segundo problema de engenharia da dupla proposta.",
    arquivos: [
      { nome: "comparação_das_LLM_e_prompt.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782250243914-comparacao_das_LLM_e_prompt.pdf" },
      { nome: "codigo.chatgpt.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782250252515-codigo.chatgpt.py" },
      { nome: "codigo.claude.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782250263236-codigo.claude.py" },
      { nome: "codigo.gemini.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782250272824-codigo.gemini.py" },
    ],
  },
  {
    titulo: "Escolher e resolver um problema de engenharia",
    data: "2026-05-19",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk3ODY4MDAzNTI3/details",
    descricao: "Escolha e resolução de um novo problema de engenharia.",
    arquivos: [
      { nome: "Apresentacao_Matheus_Peres_Final.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782250178092-Apresentacao_Matheus_Peres_Final.pdf" },
    ],
  },
  {
    titulo: "Evolução técnica da solução desenvolvida na atividade anterior",
    data: "2026-05-22",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/ODY1NzkxMDYxODM4/details",
    descricao: "Aprimoramento técnico da solução da atividade anterior.",
    arquivos: [
      { nome: "telemetria.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782250142205-telemetria.py" },
    ],
  },
  {
    titulo: "Modularização de Código e Avaliação de LLMs (em aula)",
    data: "2026-06-09",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk4MTQzMjAxNjY2/details",
    descricao: "Modularização de código com avaliação de LLMs, feita em aula.",
    arquivos: [
      { nome: "codigos_copilot.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782250018139-codigos_copilot.py" },
      { nome: "codigos_chatgpt.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782250028937-codigos_chatgpt.py" },
      { nome: "Relatorio_Final_Modularizacao_Eletrica.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782250038717-Relatorio_Final_Modularizacao_Eletrica.pdf" },
    ],
  },
  {
    titulo: "Escreva um breve relato sincero sobre as entrevistas",
    data: "2026-06-09",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/ODY3NDY1MDE4ODMy/details",
    descricao: "Relato sincero sobre as entrevistas realizadas.",
    arquivos: [
      { nome: "feedback_entrevista.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782249891904-feedback_entrevista.pdf" },
    ],
  },
  {
    titulo: "Avaliar criticamente o site alegrete.org",
    data: "2026-06-16",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk4MjE2NTk1NDU0/details",
    descricao: "Avaliação crítica do site alegrete.org.",
    arquivos: [
      { nome: "Relatorio_Avaliacao_Alegrete.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782249860527-Relatorio_Avaliacao_Alegrete.pdf" },
    ],
  },
  {
    titulo: "Atividade: Desenvolvimento Assistido por IA para o Portal Alegrete.org",
    data: "2026-06-16",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk4MjE2NjI2NzM2/details",
    descricao: "Desenvolvimento assistido por IA para o portal Alegrete.org.",
    arquivos: [
      { nome: "sitehtml.html", url: "https://raw.githubusercontent.com/Exoticos55/exoticos55.github.io/main/arquivos/1782249620120-sitehtml.html" },
      { nome: "codigopy.py", url: "https://raw.githubusercontent.com/Exoticos55/exoticos55.github.io/main/arquivos/1782249628913-codigopy.py" },
      { nome: "documento.txt", url: "https://raw.githubusercontent.com/Exoticos55/exoticos55.github.io/main/arquivos/1782249636087-documento.txt" },
    ],
  },
  {
    titulo: "Postar o link e um print do seu site .github.io",
    data: "2026-06-19",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk4MjU3ODA0MTc5/details",
    descricao: "Publicação do link e print do site pessoal no GitHub Pages.",
    arquivos: [
      { nome: "primeira versao site.pdf", url: "https://raw.githubusercontent.com/Exoticos55/exoticos55.github.io/main/arquivos/1782249530839-primeira-versao-site.pdf" },
    ],
  },
  {
    titulo: "Quiz – Lógica de Programação (Preparatório em aula)",
    data: "2026-03-20",
    status: "feita_nao_confirmada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk2NjkyMTA3NDYx/details",
    descricao: "Quiz preparatório de lógica de programação, feito em aula.",
    nota: "Atividade foi realizada e marcada como concluída no site do quiz, mas não foi printada/confirmada no Classroom a tempo. Ficou registrada como não entregue.",
    arquivos: [
      { nome: "QUIZ – Lógica de Programação (Preparatório).pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782254242934-QUIZ---Logica-de-Programacao--Preparatorio-.pdf" },
    ],
  },
  {
    titulo: "Quiz – Diagnóstico de Lógica de Programação",
    data: "2026-03-27",
    status: "feita_nao_confirmada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk2Njc5NDA1MDYy/details",
    descricao: "Quiz diagnóstico de lógica de programação.",
    nota: "Atividade foi realizada e marcada como concluída no site do quiz, mas não foi printada/confirmada no Classroom a tempo. Ficou registrada como não entregue.",
    arquivos: [
      { nome: "QUIZ – Diagnóstico de Lógica de Programação.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782254197515-QUIZ---Diagnostico-de-Logica-de-Programacao.pdf" },
    ],
  },
];

// Não precisa editar nada abaixo desta linha.
if (typeof module !== "undefined") {
  module.exports = atividades;
}
