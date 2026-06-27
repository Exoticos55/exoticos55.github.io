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
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/ODU2MTY4NzMyMjIw/details",
    descricao: "Formulário inicial de diagnóstico da disciplina.",
    arquivos: [
      { nome: "Questionário Diagnóstico - Algoritmos e Programação.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782254122282-Questionario-Diagnostico---Algoritmos-e-Programacao.pdf" },
    ],
  },
  {
    titulo: "Lista de 15 exercícios: escolher e resolver",
    data: "2026-03-31",
    status: "enviada",
    link: "",
    descricao: "Cada aluno deverá escolher e resolver no mínimo 15 exercícios a partir das apostilas, livros e sites cujos links estão disponíveis no Classroom.",
    enunciado: "Seleção ou geração via IA de 15 exercícios de lógica e algoritmos básicos com estruturas condicionais simples, aplicados à área de Engenharia, acompanhados de suas respectivas resoluções completas (em formato digital ou manuscrito).\n\nApostila usada; https://drive.google.com/file/d/1S0NM66Rm18fJjp0sNm6gcpFJDR8qUjdU/view?usp=sharing",
    arquivos: [
      { nome: "15atividades.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782252190595-15atividades.pdf" },
    ],
    tecnologias: ["python"],
  },
  {
    titulo: "Lista de 10 Exercícios da INTRODUCAO A ALGORITMOS com Python by Claude.ai",
    data: "2026-04-10",
    status: "enviada",
    link: "",
    descricao: "Exercícios introdutórios de algoritmos em Python.",
    enunciado: "Seleção e resolução em Python de no mínimo 10 exercícios extraídos da apostila \"Introdução a Algoritmos com Python\" (desenvolvida via Claude.ai), focando na aplicação prática da linguagem de programação e na correção textual de caracteres e acentuações.",
    arquivos: [
      { nome: "10atividadespy.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251919434-10atividadespy.pdf" },
      { nome: "Apostila_de_Logica_de_Programacao.pdf", url: "https://raw.githubusercontent.com/Exoticos55/exoticos55.github.io/main/arquivos/1782520541306-Apostila_de_Logica_de_Programacao.pdf" },
    ],
  },
  {
    titulo: "Geração e Avaliação de Exercícios de Algoritmos com LLMs",
    data: "2026-04-10",
    status: "enviada",
    link: "",
    descricao: "Uso de LLMs para gerar e avaliar exercícios de algoritmos.",
    enunciado: "Análise comparativa qualitativa de três LLMs na geração de problemas de algoritmos aplicados às Engenharias Elétrica, Mecânica e de Telecomunicações. O projeto avaliou a precisão de enunciados realistas, pseudocódigos e códigos Python produzidos por cada IA.",
    arquivos: [
      { nome: "exercicios_gemini.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782255404553-exercicios_gemini.py" },
      { nome: "exercicios_chatgpt.docx", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782255405843-exercicios_chatgpt.docx" },
      { nome: "analise_comparativa_llms.docx", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782255407165-analise_comparativa_llms.docx" },
      { nome: "exercicios_claude.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782255408402-exercicios_claude.py" },
    ],
    tecnologias: ["python"],
  },
  {
    titulo: "Quiz de Avaliação da Atividade: Uso de LLMs em Algoritmos e Programação",
    data: "2026-04-10",
    status: "enviada",
    link: "",
    descricao: "Quiz avaliativo sobre o uso de LLMs na disciplina.",
    enunciado: "Estudo de caso e preenchimento de questionário analítico focado na avaliação do uso de LLMs no ensino de algoritmos. O projeto envolveu documentar a percepção de aprendizado, identificar limitações técnicas das IAs e propor melhorias pedagógicas para a integração de ferramentas generativas na engenharia.",
    arquivos: [
      { nome: "Quiz de Avaliação da Atividade_ Uso de LLMs em Algoritmos e Programação.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782254797581-Quiz-de-Avaliacao-da-Atividade_-Uso-de-LLMs-em-Algoritmos-e-Programacao.pdf" },
    ],
  },
  {
    titulo: "Resolver os 5 exercícios em papel",
    data: "2026-04-21",
    status: "enviada",
    link: "",
    descricao: "Exercícios resolvidos manualmente, em papel.",
    arquivos: [
      { nome: "CodigosgeradosporLLM.pdf", url: "https://raw.githubusercontent.com/Exoticos55/exoticos55.github.io/main/arquivos/06-exercicios-papel/1782251787582-CodigosgeradosporLLM.pdf" },
      { nome: "IMG_20260418_163328.jpg", url: "https://raw.githubusercontent.com/Exoticos55/exoticos55.github.io/main/arquivos/06-exercicios-papel/IMG_20260418_163328.jpg" },
      { nome: "IMG_20260418_164248.jpg", url: "https://raw.githubusercontent.com/Exoticos55/exoticos55.github.io/main/arquivos/06-exercicios-papel/IMG_20260418_164248.jpg" },
      { nome: "IMG_20260418_164959.jpg", url: "https://raw.githubusercontent.com/Exoticos55/exoticos55.github.io/main/arquivos/06-exercicios-papel/IMG_20260418_164959.jpg" },
      { nome: "IMG_20260418_170031.jpg", url: "https://raw.githubusercontent.com/Exoticos55/exoticos55.github.io/main/arquivos/06-exercicios-papel/IMG_20260418_170031.jpg" },
    ],
  },
  {
    titulo: "Resolver os exercícios de listas/vetores/arrays em Python",
    data: "2026-04-24",
    status: "enviada",
    link: "",
    descricao: "Exercícios práticos de listas, vetores e arrays em Python.",
    enunciado: "Implementação prática e execução em ambiente local de algoritmos focados em estruturas de dados (listas, vetores e arrays). O projeto valida a corretude do código através de testes reais com evidências visuais de execução na máquina do desenvolvedor.",
    arquivos: [
      { nome: "listasvetoresarrays.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251698424-listasvetoresarrays.pdf" },
    ],
    tecnologias: ["Python"],
  },
  {
    titulo: "Formulação e Resolução de Problemas com Vetores/Listas usando LLMs",
    data: "2026-04-24",
    status: "enviada",
    link: "",
    descricao: "Problemas com vetores/listas formulados e resolvidos com apoio de LLMs.",
    enunciado: "Formulação de dois problemas práticos de Engenharia envolvendo operações com vetores/listas com apoio de LLM, seguidos de suas respectivas resoluções algorítmicas feitas de forma totalmente manual.",
    arquivos: [
      { nome: "IMG_20260424_142216.jpg", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251630505-IMG_20260424_142216.jpg" },
      { nome: "IMG_20260424_142226.jpg", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251638977-IMG_20260424_142226.jpg" },
      { nome: "exercicios_papel_com_codigo.pdf", url: "https://raw.githubusercontent.com/Exoticos55/exoticos55.github.io/main/arquivos/1782579055776-exercicios_papel_com_codigo.pdf" },
      { nome: "problema1_tensao.py", url: "https://raw.githubusercontent.com/Exoticos55/exoticos55.github.io/main/arquivos/1782579058795-problema1_tensao.py" },
      { nome: "problema2_resistores.py", url: "https://raw.githubusercontent.com/Exoticos55/exoticos55.github.io/main/arquivos/1782579059817-problema2_resistores.py" },
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
    link: "",
    descricao: "Resolução de problemas de outras disciplinas com múltiplas abordagens.",
    enunciado: "Resolução algorítmica multidisciplinar de um problema técnico extraído de outra disciplina do semestre acadêmico. O projeto envolveu a descrição lógica do problema e o desenvolvimento de três abordagens e implementações de software distintas em Python com o auxílio de LLMs.",
    arquivos: [
      { nome: "grafico_comparativo.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251149932-grafico_comparativo.py" },
      { nome: "abordagem2_simpson.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251151018-abordagem2_simpson.py" },
      { nome: "abordagem1_riemann.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251152254-abordagem1_riemann.py" },
      { nome: "abordagem3_scipy.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251153341-abordagem3_scipy.py" },
      { nome: "atividade_calculo.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782251154414-atividade_calculo.pdf" },
    ],
    tecnologias: ["python", "gemini"],
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
    link: "",
    descricao: "Resolução do segundo problema de engenharia da dupla proposta.",
    enunciado: "Conclusão do ciclo de projetos de engenharia com a implementação do segundo problema proposto (Treliças Planas ou Abastecimento de Água). O projeto consolidou o uso de vetores e listas dinâmicas em Python, exibição de dados em tabelas e gráficos, além de um novo teste de benchmarking de código e lógica em três LLMs distintas.",
    arquivos: [
      { nome: "comparação_das_LLM_e_prompt.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782250243914-comparacao_das_LLM_e_prompt.pdf" },
      { nome: "codigo.chatgpt.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782250252515-codigo.chatgpt.py" },
      { nome: "codigo.claude.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782250263236-codigo.claude.py" },
      { nome: "codigo.gemini.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782250272824-codigo.gemini.py" },
    ],
    tecnologias: ["python", "claude", "gemini", "cahtgpt"],
  },
  {
    titulo: "Escolher e resolver um problema de engenharia",
    data: "2026-05-19",
    status: "enviada",
    link: "",
    descricao: "Escolha e resolução de um novo problema de engenharia.",
    enunciado: "Desenvolvimento de uma solução autônoma de engenharia com total liberdade de escopo, utilizando Inteligência Artificial. O projeto consistiu na modelagem completa do problema escolhido, desenvolvimento do código-fonte em Python e criação de dashboards visuais com gráficos, tabelas e simulações para validação dos resultados.",
    arquivos: [
      { nome: "Apresentacao_Matheus_Peres_Final.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782250178092-Apresentacao_Matheus_Peres_Final.pdf" },
    ],
    tecnologias: ["claude"],
  },
  {
    titulo: "Evolução técnica da solução desenvolvida na atividade anterior",
    data: "2026-05-22",
    status: "enviada",
    link: "",
    descricao: "Aprimoramento técnico da solução da atividade anterior.",
    enunciado: "Refatoração e evolução técnica de uma prova de conceito de engenharia para um software robusto focado em experiência do usuário. O projeto envolveu a melhoria da interface, otimização de gráficos, organização do código-fonte e mapeamento de limitações sob a ótica de usabilidade e confiabilidade.",
    arquivos: [
      { nome: "telemetria.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782250142205-telemetria.py" },
    ],
    tecnologias: ["python"],
  },
  {
    titulo: "Modularização de Código e Avaliação de LLMs (em aula)",
    data: "2026-06-09",
    status: "enviada",
    link: "",
    descricao: "Modularização de código com avaliação de LLMs, feita em aula.",
    enunciado: "Esta atividade foca no desenvolvimento de um sistema de monitoramento de engenharia, priorizando a modularização de código e a avaliação crítica de soluções geradas por LLMs. O objetivo é comparar a qualidade, a estruturação e a legibilidade do código em Python produzido por diferentes IAs, consolidando a análise em um relatório técnico",
    arquivos: [
      { nome: "codigos_copilot.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782250018139-codigos_copilot.py" },
      { nome: "codigos_chatgpt.py", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782250028937-codigos_chatgpt.py" },
      { nome: "Relatorio_Final_Modularizacao_Eletrica.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782250038717-Relatorio_Final_Modularizacao_Eletrica.pdf" },
    ],
    tecnologias: ["chatgpt", "copilot", "gemini"],
  },
  {
    titulo: "Escreva um breve relato sincero sobre as entrevistas",
    data: "2026-06-09",
    status: "enviada",
    link: "",
    descricao: "Relato sincero sobre as entrevistas realizadas.",
    enunciado: "Submissão de feedback analítico e transparente sobre a experiência em processos de entrevista técnica e acadêmica. O relato cobriu aspectos de inteligência emocional, clareza das arguições, postura da banca examinadora e gestão do tempo, visando a melhoria contínua dos processos seletivos da instituição.",
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
    status: "enviada",
    link: "",
    descricao: "Quiz preparatório de lógica de programação, feito em aula.",
    nota: "Atividade foi realizada e marcada como concluída no site do quiz, mas não foi printada/confirmada no Classroom a tempo. Ficou registrada como não entregue.",
    arquivos: [
      { nome: "QUIZ – Lógica de Programação (Preparatório).pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782254242934-QUIZ---Logica-de-Programacao--Preparatorio-.pdf" },
    ],
  },
  {
    titulo: "Quiz – Diagnóstico de Lógica de Programação",
    data: "2026-03-27",
    status: "enviada",
    link: "",
    descricao: "Quiz diagnóstico de lógica de programação.",
    nota: "Atividade foi realizada e marcada como concluída no site do quiz, mas não foi printada/confirmada no Classroom a tempo. Ficou registrada como não entregue.",
    arquivos: [
      { nome: "QUIZ – Diagnóstico de Lógica de Programação.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782254197515-QUIZ---Diagnostico-de-Logica-de-Programacao.pdf" },
    ],
  },
  {
    titulo: "Projeto Final da Disciplina: Portfólio de Entregas no GitHub.io (Versão 1)",
    data: "2026-06-23",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk4MjkxNDc1Mjgy/details",
    descricao: "Cada aluno deverá desenvolver um site de portfólio contendo todas as entregas realizadas ao longo do semestre",
    nota: "Esta versão servirá como base para o desenvolvimento da versão final do projeto, que deverá conter todas as entregas da disciplina organizadas e documentadas de forma completa.",
    arquivos: [
      { nome: "sitev1.pdf", url: "https://raw.githubusercontent.com/Exoticos55/exoticos55.github.io/main/arquivos/1782254950886-sitev1.pdf" },
    ],
  },
  {
    titulo: "Atividade em Aula: Portfólio no GitHub.io – Versão 26.03.2026",
    data: "2026-06-26",
    status: "enviada",
    link: "https://classroom.google.com/c/Nzk2NTIwNDI4Nzg1/a/Nzk4MzIzMzMzMTIw/details",
    descricao: "Nesta atividade, cada aluno deverá evoluir o site do portfólio desenvolvido anteriormente.",
    nota: "Antes de realizar as alterações, converse com pelo menos dois colegas sobre seus portfólios. Apresente o seu site, conheça as soluções adotadas por eles e troque sugestões de organização, design, navegação e apresentação das entregas.\n\nCom base nessa troca de ideias, implemente pelo menos uma melhoria no seu portfólio e publique uma nova versão no GitHub.io. Identifiquem no site do portifólio todas as tecnologias que vocês estão utilizando, como GPT Versão X, Claude Versão Y, Gemini Versão Z, etc. Tecnologias Web (e.g., HTML, CSS, etc.). A própria IA pode ser utilizada para apresentar as tecnologias utilizadas para criar o site do portifólio de vocês.",
    arquivos: [
      { nome: "sitev2.pdf", url: "https://raw.githubusercontent.com/exoticos55/exoticos55.github.io/main/arquivos/1782496876914-sitev2.pdf" },
    ],
  },
];

// Não precisa editar nada abaixo desta linha.
if (typeof module !== "undefined") {
  module.exports = atividades;
}
