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

  const container = document.getElementById("progress-section");
  if (!container) return;

  container.innerHTML = `
    <div class="progress-card">
      <div class="chart-wrap">
        <svg viewBox="0 0 100 100" class="circle-chart">
          <circle class="circle-bg" cx="50" cy="50" r="${raio}"></circle>
          <circle class="circle-fg" cx="50" cy="50" r="${raio}"
                  style="stroke-dasharray: ${circunferencia}; stroke-dashoffset: ${offset};"></circle>
        </svg>
        <div class="chart-label">
          <span class="pct">${pct}%</span>
          <span class="txt">concluído</span>
        </div>
      </div>
      <div class="progress-details">
        <div class="progress-row">
          <span class="dot enviada"></span>
          <span class="label">Enviadas</span>
          <span class="count">${enviadas} <small>(${Math.round(pctSeg(enviadas))}%)</small></span>
        </div>
        <div class="progress-row">
          <span class="dot feita_nao_confirmada"></span>
          <span class="label">Feitas, ñ conf.</span>
          <span class="count">${feitasNaoConfirmadas} <small>(${Math.round(pctSeg(feitasNaoConfirmadas))}%)</small></span>
        </div>
        <div class="progress-row">
          <span class="dot pendente"></span>
          <span class="label">Pendentes</span>
          <span class="count">${pendentes} <small>(${Math.round(pctSeg(pendentes))}%)</small></span>
        </div>
        <div class="progress-row">
          <span class="dot atrasada"></span>
          <span class="label">Atrasadas</span>
          <span class="count">${atrasadas} <small>(${Math.round(pctSeg(atrasadas))}%)</small></span>
        </div>
      </div>
    </div>
  `;
}

function renderResumo(lista) {
  const container = document.getElementById("summary");
  if (!container) return;

  const total = lista.length;
  const enviadas = lista.filter((a) => a.status === "enviada").length;
  const feitasNaoConfirmadas = lista.filter(
    (a) => a.status === "feita_nao_confirmada"
  ).length;
  const concluidas = enviadas + feitasNaoConfirmadas;

  container.innerHTML = `
    <div class="summary-box">
      <div class="sum-item">
        <span class="val">${total}</span>
        <span class="desc">Total</span>
      </div>
      <div class="sum-item">
        <span class="val active-count">${concluidas}</span>
        <span class="desc">Entregues</span>
      </div>
    </div>
  `;
}

function renderLista(lista, ordem) {
  const container = document.getElementById("activity-list");
  if (!container) return;

  const listaOrdenada = [...lista].sort((a, b) => {
    const dataA = new Date(a.data);
    const dataB = new Date(b.data);
    return ordem === "asc" ? dataA - dataB : dataB - dataA;
  });

  container.innerHTML = listaOrdenada
    .map((a) => {
      const arquivosHtml =
        a.arquivos && a.arquivos.length > 0
          ? a.arquivos
              .map(
                (arq) =>
                  `<span class="file-chip" data-arquivo-nome="${arq.nome}" data-arquivo-url="${arq.url}" onclick="event.stopPropagation()">${arq.nome}</span>`
              )
              .join("")
          : "";

      const notaHtml = a.nota
        ? `<div class="note-box"><strong>Nota:</strong> ${a.nota}</div>`
        : "";

      const linkHtml = a.link
        ? `<a href="${a.link}" target="_blank" rel="noopener" class="card-link" onclick="event.stopPropagation()">Ver no Classroom &rarr;</a>`
        : "";

      // Transforma o objeto da atividade em texto seguro para injetar no evento click do card
      const atividadeStr = JSON.stringify(a).replace(/"/g, '&quot;');

      return `
        <article class="activity-card reveal" onclick="abrirModalAtividade(${atividadeStr})">
          <div class="main-info">
            <time class="card-date">${formatarData(a.data)}</time>
            <h2>${a.titulo}</h2>
            <p class="card-desc">${a.descricao || ""}</p>
            <div class="activity-card-files">
              ${arquivosHtml}
            </div>
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
      if (aba === "atividades") {
        if (painelAtividades) painelAtividades.style.display = "grid";
        if (filtrosAtividades) filtrosAtividades.style.display = "block";
        if (painelSobre) painelSobre.classList.add("hidden");
      } else if (aba === "sobre") {
        if (painelAtividades) painelAtividades.style.display = "none";
        if (filtrosAtividades) filtrosAtividades.style.display = "none";
        if (painelSobre) painelSobre.classList.remove("hidden");
      }
    });
  });
}

function setupFiltrosDOM() {
  const fStatus = document.getElementById("filter-status");
  if (fStatus) {
    fStatus.addEventListener("change", (e) => {
      estadoFiltros.status = e.target.value;
      aplicarTodosFiltros();
    });
  }

  const fDataDe = document.getElementById("filter-date-start");
  if (fDataDe) {
    fDataDe.addEventListener("change", (e) => {
      estadoFiltros.dataDe = e.target.value;
      aplicarTodosFiltros();
    });
  }

  const fDataAte = document.getElementById("filter-date-end");
  if (fDataAte) {
    fDataAte.addEventListener("change", (e) => {
      estadoFiltros.dataAte = e.target.value;
      aplicarTodosFiltros();
    });
  }

  const fOrdem = document.getElementById("filter-sort");
  if (fOrdem) {
    fOrdem.addEventListener("change", (e) => {
      estadoFiltros.ordem = e.target.value;
      aplicarTodosFiltros();
    });
  }
}

function renderDataUltimaAtividade() {
  const elemento = document.getElementById("ultima-atualizacao");
  if (!elemento || atividades.length === 0) return;

  const datas = atividades.map((a) => new Date(a.data));
  const maisRecente = new Date(Math.max(...datas));

  const dia = String(maisRecente.getDate()).padStart(2, "0");
  const mes = String(maisRecente.getMonth() + 1).padStart(2, "0");
  const ano = maisRecente.getFullYear();

  elemento.innerText = `atualizado em: ${dia}/${mes}/${ano}`;
}

async function abrirModalArquivo(nome, url) {
  const overlay = document.getElementById("file-modal-overlay");
  const titulo = document.getElementById("file-modal-titulo");
  const body = document.getElementById("file-modal-body");
  const btnBaixar = document.getElementById("file-modal-baixar");
  const btnAbrir = document.getElementById("file-modal-abrir");

  btnBaixar.style.display = "";
  btnAbrir.style.display = "";

  titulo.innerText = nome;
  btnBaixar.href = url;
  btnAbrir.href = url;

  body.innerHTML = `<div class="file-loading">A carregar conteúdo do arquivo...</div>`;
  overlay.classList.remove("hidden");

  try {
    const resposta = await fetch(url);
    if (!resposta.ok) throw new Error();

    const extensao = nome.split(".").pop().toLowerCase();
    const formatoTexto = ["js", "py", "c", "txt", "md", "json", "html", "css"];

    if (formatoTexto.includes(extensao)) {
      const texto = await resposta.text();
      body.innerHTML = `
        <pre class="file-code-view"><code>${escaparHtml(texto)}</code></pre>
      `;
    } else if (["png", "jpg", "jpeg", "gif", "svg"].includes(extensao)) {
      body.innerHTML = `
        <div style="display:flex; justify-content:center; padding:10px;">
          <img src="${url}" alt="${nome}" style="max-width:100%; max-height:65vh; border-radius:6px; border:1px solid var(--line);">
        </div>
      `;
    } else {
      body.innerHTML = `
        <div style="padding:40px 20px; text-align:center; color:var(--ink-dim); font-family:var(--mono); font-size:13px;">
          Este tipo de arquivo (.${extensao}) não pode ser pré-visualizado diretamente.<br><br>
          <a href="${url}" download style="color:var(--accent); text-decoration:none;">Clique aqui para descarregar</a> ou use os botões acima.
        </div>
      `;
    }
  } catch {
    body.innerHTML = `
      <div style="padding:40px 20px; text-align:center; color:var(--danger); font-family:var(--mono); font-size:13px;">
        Não foi possível carregar a pré-visualização inline.<br><br>
        Pode abrir diretamente <a href="${url}" target="_blank" style="color:var(--accent);">nesta ligação</a>.
      </div>
    `;
  }
}

function abrirModalAtividade(atividade) {
  const titulo = document.getElementById("file-modal-titulo");
  const body = document.getElementById("file-modal-body");
  const overlay = document.getElementById("file-modal-overlay");
  
  // Oculta os botões de download de arquivos que pertencem à pré-visualização de código
  document.getElementById("file-modal-baixar").style.display = "none";
  document.getElementById("file-modal-abrir").style.display = "none";

  titulo.innerText = atividade.titulo;

  const arquivosHtml = atividade.arquivos && atividade.arquivos.length > 0
    ? `<h3 style="font-family: var(--mono); font-size: 14px; color: var(--accent-bright); margin-top: 20px;">Evidências Anexadas:</h3>
       <div class="activity-card-files" style="margin-bottom: 15px;">` + 
       atividade.arquivos.map(arq => `<span class="file-chip" data-arquivo-nome="${arq.nome}" data-arquivo-url="${arq.url}">${arq.nome}</span>`).join("") + 
       `</div>`
    : "";

  const notaHtml = atividade.nota
    ? `<div class="note-box" style="margin-top: 20px; border: 1px solid var(--warn); background: rgba(242,193,78,0.06);"><strong>Nota / Observação:</strong> ${atividade.nota}</div>`
    : "";

  const linkHtml = atividade.link
    ? `<p style="margin-top: 25px;"><a href="${atividade.link}" target="_blank" rel="noopener" class="card-link" style="color: var(--accent); text-decoration: none; font-family: var(--mono);">Acessar à atividade no Classroom original &rarr;</a></p>`
    : "";

  body.innerHTML = `
    <div style="padding: 10px 5px; line-height: 1.6;">
      <p style="font-family: var(--mono); font-size: 12px; color: var(--ink-dim); margin-bottom: 15px;">
        <strong>Data de Entrega:</strong> ${formatarData(atividade.data)}
      </p>
      <h3 style="font-family: var(--mono); font-size: 14px; color: var(--accent-bright); margin-bottom: 8px;">Descrição Completa:</h3>
      <p style="color: var(--ink); font-size: 14px; white-space: pre-wrap;">${atividade.descricao || "Nenhuma descrição detalhada fornecida."}</p>
      ${arquivosHtml}
      ${notaHtml}
      ${linkHtml}
    </div>
  `;

  overlay.classList.remove("hidden");
  setupFileChips();
}

function escaparHtml(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function fecharModalArquivo() {
  document.getElementById("file-modal-overlay").classList.add("hidden");
  const body = document.getElementById("file-modal-body");
  body.innerHTML = "";
}

function setupFileChips() {
  document.querySelectorAll(".file-chip").forEach((chip) => {
    chip.replaceWith(chip.cloneNode(true));
  });

  document.querySelectorAll(".file-chip").forEach((chip) => {
    chip.addEventListener("click", (e) => {
      e.stopPropagation();
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
renderLista(atividades, estadoFiltros.ordem);
setupTabs();
setupFiltrosDOM();
renderDataUltimaAtividade();
setupModalGlobal();
setupScrollReveal();
