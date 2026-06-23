// ===================================================================
// Lógica do painel. Não precisa editar este arquivo no dia a dia —
// só o activities.js quando tiver atividade nova.
// ===================================================================

const STATUS_LABEL = {
  enviada: "Enviada",
  feita_nao_confirmada: "Feita, não confirmada",
  pendente: "Pendente",
  atrasada: "Atrasada",
};

function formatarData(isoStr) {
  const [ano, mes, dia] = isoStr.split("-");
  return `${dia}/${mes}/${ano}`;
}

function renderProgresso(lista) {
  const total = lista.length;
  const enviadas = lista.filter((a) => a.status === "enviada").length;
  const feitasNaoConfirmadas = lista.filter(
    (a) => a.status === "feita_nao_confirmada"
  ).length;
  const pendentes = lista.filter((a) => a.status === "pendente").length;
  const atrasadas = lista.filter((a) => a.status === "atrasada").length;

  const concluidas = enviadas + feitasNaoConfirmadas;
  const pct = total === 0 ? 0 : Math.round((concluidas / total) * 100);

  const raio = 45;
  const circunferencia = 2 * Math.PI * raio;
  const offset = circunferencia * (1 - pct / 100);

  const pctSeg = (n) => (total === 0 ? 0 : (n / total) * 100);

  const section = document.getElementById("progress-section");
  section.innerHTML = `
    <div class="progress-ring-wrap">
      <svg viewBox="0 0 110 110">
        <defs>
          <linearGradient id="progress-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#4d8dff" />
            <stop offset="100%" stop-color="#ffd23f" />
          </linearGradient>
        </defs>
        <circle class="progress-ring-bg" cx="55" cy="55" r="${raio}"></circle>
        <circle class="progress-ring-fill" cx="55" cy="55" r="${raio}"
          stroke-dasharray="${circunferencia}"
          stroke-dashoffset="${offset}"></circle>
      </svg>
      <div class="progress-ring-label">
        <span class="pct">${pct}%</span>
        <span class="pct-sub">concluído</span>
      </div>
    </div>
    <div class="progress-detail">
      <h3>${concluidas} de ${total} atividades concluídas</h3>
      <div class="progress-bar">
        <div class="seg enviada" style="width:${pctSeg(enviadas)}%"></div>
        <div class="seg feita_nao_confirmada" style="width:${pctSeg(feitasNaoConfirmadas)}%"></div>
        <div class="seg atrasada" style="width:${pctSeg(atrasadas)}%"></div>
        <div class="seg pendente" style="width:${pctSeg(pendentes)}%"></div>
      </div>
      <div class="progress-legend">
        <span class="item"><span class="dot enviada"></span>Enviadas (${enviadas})</span>
        <span class="item"><span class="dot feita_nao_confirmada"></span>Não confirmadas (${feitasNaoConfirmadas})</span>
        <span class="item"><span class="dot atrasada"></span>Atrasadas (${atrasadas})</span>
        <span class="item"><span class="dot pendente"></span>Pendentes (${pendentes})</span>
      </div>
    </div>
  `;
}

function renderResumo(lista) {
  const total = lista.length;
  const enviadas = lista.filter((a) => a.status === "enviada").length;
  const feitasNaoConfirmadas = lista.filter(
    (a) => a.status === "feita_nao_confirmada"
  ).length;
  const pendentes = lista.filter((a) => a.status === "pendente").length;
  const atrasadas = lista.filter((a) => a.status === "atrasada").length;

  const summary = document.getElementById("summary");
  summary.innerHTML = `
    <div class="stat total">
      <div class="num">${total}</div>
      <div class="label">total</div>
    </div>
    <div class="stat enviada">
      <div class="num">${enviadas}</div>
      <div class="label">enviadas</div>
    </div>
    <div class="stat feita_nao_confirmada">
      <div class="num">${feitasNaoConfirmadas}</div>
      <div class="label">feitas, não confirmadas</div>
    </div>
    <div class="stat pendente">
      <div class="num">${pendentes}</div>
      <div class="label">pendentes</div>
    </div>
    <div class="stat atrasada">
      <div class="num">${atrasadas}</div>
      <div class="label">atrasadas</div>
    </div>
  `;

  document.getElementById("contador-rodape").textContent =
    `${enviadas}/${total} atividades enviadas`;
}

function renderLista(lista, ordem) {
  const container = document.getElementById("activity-list");

  if (lista.length === 0) {
    container.innerHTML = `<p class="no-link">Nenhuma atividade encontrada com esses filtros.</p>`;
    return;
  }

  const direcao = ordem === "asc" ? -1 : 1;
  const ordenada = [...lista].sort((a, b) => (a.data < b.data ? 1 : -1) * direcao);

  container.innerHTML = ordenada
    .map((a) => {
      const linkHtml = a.link
        ? `<a class="link-btn" href="${a.link}" target="_blank" rel="noopener">ver no Classroom →</a>`
        : `<span class="no-link">sem link do Classroom</span>`;

      const notaHtml = a.nota
        ? `<div class="note-box"><strong>Observação:</strong> ${a.nota}</div>`
        : "";

      const arquivos = Array.isArray(a.arquivos) ? a.arquivos : [];
      const arquivosHtml = arquivos.length
        ? `<div class="file-chips">
            ${arquivos
              .map(
                (arq, i) => `
              <button type="button" class="file-chip" data-arquivo-nome="${arq.nome.replace(/"/g, "&quot;")}" data-arquivo-url="${arq.url}">
                <svg viewBox="0 0 16 16" width="13" height="13" fill="none" stroke="currentColor" stroke-width="1.4">
                  <path d="M9.5 1.5H3.5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V5.5L9.5 1.5Z"/>
                  <path d="M9.5 1.5V5h4"/>
                </svg>
                <span>${arq.nome}</span>
              </button>
            `
              )
              .join("")}
          </div>`
        : "";

      return `
        <article class="activity ${a.status} reveal">
          <div class="bar"></div>
          <div class="body">
            <h3>${a.titulo}</h3>
            <p>${a.descricao}</p>
            <span class="date">entrega: ${formatarData(a.data)}</span>
            ${arquivosHtml}
            ${notaHtml}
          </div>
          <div class="side">
            <span class="badge ${a.status}">${STATUS_LABEL[a.status]}</span>
            ${linkHtml}
          </div>
        </article>
      `;
    })
    .join("");

  setupFileChips();
}

const estadoFiltros = {
  status: "todas",
  dataDe: "",
  dataAte: "",
  ordem: "desc",
};

function aplicarTodosFiltros() {
  let lista =
    estadoFiltros.status === "todas"
      ? atividades
      : atividades.filter((a) => a.status === estadoFiltros.status);

  if (estadoFiltros.dataDe) {
    lista = lista.filter((a) => a.data >= estadoFiltros.dataDe);
  }
  if (estadoFiltros.dataAte) {
    lista = lista.filter((a) => a.data <= estadoFiltros.dataAte);
  }

  renderLista(lista, estadoFiltros.ordem);
  setupScrollReveal();
}

function setupTabs() {
  const botoes = document.querySelectorAll(".tab-btn");
  const painelAtividades = document.getElementById("activity-list");
  const filtrosAtividades = document.getElementById("painel-atividades");
  const painelSobre = document.getElementById("painel-sobre");

  botoes.forEach((btn) => {
    btn.addEventListener("click", () => {
      botoes.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      const aba = btn.dataset.tab;
      if (aba === "sobre") {
        painelAtividades.classList.add("hidden");
        filtrosAtividades.classList.add("hidden");
        painelSobre.classList.remove("hidden");
      } else {
        painelAtividades.classList.remove("hidden");
        filtrosAtividades.classList.remove("hidden");
        painelSobre.classList.add("hidden");
      }
    });
  });
}

function setupFiltros() {
  const botoes = document.querySelectorAll(".filter-btn");
  botoes.forEach((btn) => {
    btn.addEventListener("click", () => {
      botoes.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      estadoFiltros.status = btn.dataset.filter;
      aplicarTodosFiltros();
    });
  });
}

function setupFiltroData() {
  const btnOrdenar = document.getElementById("btn-ordenar");
  const ordenarLabel = document.getElementById("ordenar-label");
  const inputDe = document.getElementById("data-de");
  const inputAte = document.getElementById("data-ate");
  const btnLimpar = document.getElementById("btn-limpar-datas");

  btnOrdenar.addEventListener("click", () => {
    estadoFiltros.ordem = estadoFiltros.ordem === "desc" ? "asc" : "desc";
    btnOrdenar.dataset.ordem = estadoFiltros.ordem;
    ordenarLabel.textContent =
      estadoFiltros.ordem === "desc" ? "Mais recentes primeiro" : "Mais antigas primeiro";
    aplicarTodosFiltros();
  });

  inputDe.addEventListener("change", () => {
    estadoFiltros.dataDe = inputDe.value;
    aplicarTodosFiltros();
  });

  inputAte.addEventListener("change", () => {
    estadoFiltros.dataAte = inputAte.value;
    aplicarTodosFiltros();
  });

  btnLimpar.addEventListener("click", () => {
    inputDe.value = "";
    inputAte.value = "";
    estadoFiltros.dataDe = "";
    estadoFiltros.dataAte = "";
    aplicarTodosFiltros();
  });
}

function setupDataAtualizacao() {
  const hoje = new Date();
  const dataFormatada = hoje.toLocaleDateString("pt-BR");
  document.getElementById("ultima-atualizacao").textContent =
    `página carregada em: ${dataFormatada}`;
}

function detectarTipoArquivo(nome) {
  const ext = nome.split(".").pop().toLowerCase();
  if (ext === "pdf") return "pdf";
  if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext)) return "imagem";
  if (
    ["py", "js", "ts", "jsx", "tsx", "java", "c", "cpp", "cs", "go", "rb",
     "php", "html", "css", "json", "txt", "md", "sql", "sh", "yml", "yaml"]
      .includes(ext)
  ) return "codigo";
  return "outro";
}

function escaparHtml(texto) {
  const div = document.createElement("div");
  div.textContent = texto;
  return div.innerHTML;
}

async function abrirModalArquivo(nome, url) {
  const overlay = document.getElementById("file-modal-overlay");
  const titulo = document.getElementById("file-modal-titulo");
  const body = document.getElementById("file-modal-body");
  const linkAbrir = document.getElementById("file-modal-abrir");

  titulo.textContent = nome;
  linkAbrir.href = url;
  overlay.classList.remove("hidden");

  const tipo = detectarTipoArquivo(nome);
  if (tipo === "pdf") {
    const urlVisualizacao = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
    body.innerHTML = `<iframe src="${urlVisualizacao}" title="${nome}"></iframe>`;
  } else if (tipo === "imagem") {
    body.innerHTML = `<img src="${url}" alt="${nome}" />`;
  } else if (tipo === "codigo") {
    body.innerHTML = `<div class="file-modal-fallback">Carregando conteúdo...</div>`;
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error("Não consegui carregar o arquivo.");
      const texto = await resp.text();
      body.innerHTML = `<pre class="file-code-view"><code>${escaparHtml(texto)}</code></pre>`;
    } catch (erro) {
      body.innerHTML = `<div class="file-modal-fallback">
        Não consegui carregar o conteúdo aqui.<br/>
        Use "Abrir em outra aba" para ver o arquivo.
      </div>`;
    }
  } else {
    body.innerHTML = `<div class="file-modal-fallback">
      Esse tipo de arquivo não tem visualização direta aqui.<br/>
      Use "Abrir em outra aba" para baixar ou ver o conteúdo.
    </div>`;
  }
}

function fecharModalArquivo() {
  const overlay = document.getElementById("file-modal-overlay");
  const body = document.getElementById("file-modal-body");
  overlay.classList.add("hidden");
  body.innerHTML = "";
}

function setupFileChips() {
  document.querySelectorAll(".file-chip").forEach((chip) => {
    chip.addEventListener("click", () => {
      abrirModalArquivo(chip.dataset.arquivoNome, chip.dataset.arquivoUrl);
    });
  });
}

function setupModalGlobal() {
  const overlay = document.getElementById("file-modal-overlay");
  document.getElementById("file-modal-fechar").addEventListener("click", fecharModalArquivo);
  overlay.addEventListener("click", (evento) => {
    if (evento.target === overlay) fecharModalArquivo();
  });
  document.addEventListener("keydown", (evento) => {
    if (evento.key === "Escape") fecharModalArquivo();
  });
}

function setupScrollReveal() {
  const elementos = document.querySelectorAll(".reveal:not(.is-visible)");

  if (!("IntersectionObserver" in window)) {
    elementos.forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add("is-visible");
          observer.unobserve(entrada.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  elementos.forEach((el) => observer.observe(el));
}

// Inicialização
renderProgresso(atividades);
renderResumo(atividades);
aplicarTodosFiltros();
setupFiltros();
setupFiltroData();
setupTabs();
setupDataAtualizacao();
setupModalGlobal();
setupScrollReveal();
