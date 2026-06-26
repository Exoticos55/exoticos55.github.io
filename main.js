// CONFIGURAÇÕES E LABELS
const STATUS_LABEL = {
  enviada: "Enviada",
  feita_nao_confirmada: "Feita, não confirmada",
  pendente: "Pendente",
  atrasada: "Atrasada",
};

// ESTADO GLOBAL DOS FILTROS
const estadoFiltros = {
  status: "todas",
  dataDe: "",
  dataAte: "",
  ordem: "desc",
};

// FORMATAÇÃO DE DATA
function formatarData(isoStr) {
  if (!isoStr) return "--/--/----";
  const [ano, mes, dia] = isoStr.split("-");
  return `${dia}/${mes}/${ano}`;
}

// RENDERIZAÇÃO DA LISTA DE CARDS
function renderLista(lista, ordem) {
  const container = document.getElementById("activity-list");
  if (lista.length === 0) {
    container.innerHTML = `<p style="color:var(--ink-dim); font-family:var(--mono);">Nenhuma atividade encontrada.</p>`;
    return;
  }

  const direcao = ordem === "asc" ? -1 : 1;
  const ordenada = [...lista].sort((a, b) => (a.data < b.data ? 1 : -1) * direcao);

  container.innerHTML = ordenada.map((a) => `
    <article class="activity ${a.status}" onclick="abrirModalAtividade('${a.titulo.replace(/'/g, "\\'")}')">
      <div class="bar"></div>
      <div class="body">
        <h3>${a.titulo}</h3>
        <span class="date">Entrega: ${formatarData(a.data)}</span>
      </div>
      <div class="side">
        <span class="badge ${a.status}">${STATUS_LABEL[a.status]}</span>
        <span style="font-size:10px; color:var(--ink-dim);">Ver detalhes →</span>
      </div>
    </article>
  `).join("");
}

// FUNÇÕES DO NOVO MODAL DE DETALHES
function abrirModalAtividade(titulo) {
  const a = atividades.find(item => item.titulo === titulo);
  if (!a) return;

  const overlay = document.getElementById("activity-modal-overlay");
  document.getElementById("modal-titulo").textContent = a.titulo;
  document.getElementById("modal-data").textContent = `Prazo de entrega: ${formatarData(a.data)}`;
  document.getElementById("modal-descricao").textContent = a.descricao;
  
  // Badge
  document.getElementById("modal-badge-container").innerHTML = `<span class="badge ${a.status}">${STATUS_LABEL[a.status]}</span>`;

  // Arquivos
  const sectionArquivos = document.getElementById("modal-arquivos-section");
  const listaArquivos = document.getElementById("modal-arquivos-lista");
  if (a.arquivos && a.arquivos.length > 0) {
    sectionArquivos.classList.remove("hidden");
    listaArquivos.innerHTML = a.arquivos.map(arq => `
      <button class="file-chip" onclick="event.stopPropagation(); abrirModalArquivo('${arq.nome.replace(/'/g, "\\'")}', '${arq.url}')">
        ${arq.nome}
      </button>
    `).join("");
  } else {
    sectionArquivos.classList.add("hidden");
  }

  // Nota
  const sectionNota = document.getElementById("modal-nota-section");
  sectionNota.innerHTML = a.nota ? `<div class="note-box"><strong>Observação:</strong> ${a.nota}</div>` : "";

  // Link Classroom
  const linkContainer = document.getElementById("modal-link-container");
  linkContainer.innerHTML = a.link 
    ? `<a href="${a.link}" target="_blank" style="color:var(--accent-bright); font-family:var(--mono); text-decoration:none;">ABRIR NO CLASSROOM →</a>`
    : `<span style="color:var(--ink-dim); font-size:12px;">Link não disponível</span>`;

  overlay.classList.remove("hidden");
}

function fecharModalAtividade() {
  document.getElementById("activity-modal-overlay").classList.add("hidden");
}

// FUNÇÕES DO MODAL DE ARQUIVO (VISUALIZAÇÃO)
async function abrirModalArquivo(nome, url) {
  const overlay = document.getElementById("file-modal-overlay");
  const titulo = document.getElementById("file-modal-titulo");
  const body = document.getElementById("file-modal-body");
  const linkAbrir = document.getElementById("file-modal-abrir");
  const linkBaixar = document.getElementById("file-modal-baixar");

  titulo.textContent = nome;
  linkAbrir.href = url;
  linkBaixar.href = url;
  linkBaixar.setAttribute("download", nome);
  overlay.classList.remove("hidden");

  const ext = nome.split(".").pop().toLowerCase();
  if (ext === "pdf") {
    body.innerHTML = `<iframe src="https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true"></iframe>`;
  } else if (["png", "jpg", "jpeg", "gif"].includes(ext)) {
    body.innerHTML = `<img src="${url}" />`;
  } else {
    body.innerHTML = `<div style="padding:20px; color:white; text-align:center;">Visualização não disponível.<br><br><a href="${url}" target="_blank" style="color:cyan">Clique aqui para baixar</a></div>`;
  }
}

function fecharModalArquivo() {
  document.getElementById("file-modal-overlay").classList.add("hidden");
  document.getElementById("file-modal-body").innerHTML = "";
}

// LOGICA DE FILTROS E PROGRESSO
function renderProgresso(lista) {
  const total = lista.length;
  const concluidas = lista.filter(a => a.status === "enviada" || a.status === "feita_nao_confirmada").length;
  const pct = total === 0 ? 0 : Math.round((concluidas / total) * 100);
  
  const section = document.getElementById("progress-section");
  section.innerHTML = `
    <div style="font-size:32px; font-weight:bold; font-family:var(--mono);">${pct}%</div>
    <div style="font-size:10px; color:var(--ink-dim); text-transform:uppercase;">Concluído</div>
    <div style="width:100%; height:4px; background:var(--line); border-radius:4px; margin-top:12px;">
      <div style="width:${pct}%; height:100%; background:var(--accent); border-radius:4px;"></div>
    </div>
  `;
}

function renderResumo(lista) {
  const total = lista.length;
  const enviadas = lista.filter(a => a.status === "enviada").length;
  document.getElementById("summary").innerHTML = `
    <div class="stat"><div class="num">${total}</div><div class="label">Total</div></div>
    <div class="stat"><div class="num" style="color:var(--accent-bright)">${enviadas}</div><div class="label">Enviadas</div></div>
  `;
  document.getElementById("contador-rodape").textContent = `${enviadas}/${total} Enviadas`;
}

function aplicarTodosFiltros() {
  let lista = estadoFiltros.status === "todas" ? atividades : atividades.filter(a => a.status === estadoFiltros.status);
  if (estadoFiltros.dataDe) lista = lista.filter(a => a.data >= estadoFiltros.dataDe);
  if (estadoFiltros.dataAte) lista = lista.filter(a => a.data <= estadoFiltros.dataAte);
  renderLista(lista, estadoFiltros.ordem);
}

// EVENT LISTENERS INICIAIS
function init() {
  renderProgresso(atividades);
  renderResumo(atividades);
  aplicarTodosFiltros();

  // Tabs
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".tab-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      if (btn.dataset.tab === "sobre") {
        document.getElementById("activity-list").classList.add("hidden");
        document.getElementById("painel-atividades").classList.add("hidden");
        document.getElementById("painel-sobre").classList.remove("hidden");
      } else {
        document.getElementById("activity-list").classList.remove("hidden");
        document.getElementById("painel-atividades").classList.remove("hidden");
        document.getElementById("painel-sobre").classList.add("hidden");
      }
    });
  });

  // Filtros de Status
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      estadoFiltros.status = btn.dataset.filter;
      aplicarTodosFiltros();
    });
  });

  // Ordenar
  document.getElementById("btn-ordenar").addEventListener("click", function() {
    estadoFiltros.ordem = estadoFiltros.ordem === "desc" ? "asc" : "desc";
    this.dataset.ordem = estadoFiltros.ordem;
    document.getElementById("ordenar-label").textContent = estadoFiltros.ordem === "desc" ? "Mais recentes primeiro" : "Mais antigas primeiro";
    aplicarTodosFiltros();
  });

  // Fechar modais
  document.getElementById("btn-fechar-modal-atividades").onclick = fecharModalAtividade;
  document.getElementById("file-modal-fechar").onclick = fecharModalArquivo;
  
  // Clique fora do modal para fechar
  window.onclick = (e) => {
    if (e.target.id === "activity-modal-overlay") fecharModalAtividade();
    if (e.target.id === "file-modal-overlay") fecharModalArquivo();
  };

  // Data de atualização
  document.getElementById("ultima-atualizacao").textContent = `página carregada em: ${new Date().toLocaleDateString("pt-BR")}`;
}

init();
