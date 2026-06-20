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

function renderLista(lista) {
  const container = document.getElementById("activity-list");

  if (lista.length === 0) {
    container.innerHTML = `<p class="no-link">Nenhuma atividade nesse filtro.</p>`;
    return;
  }

  // Mais recentes primeiro
  const ordenada = [...lista].sort((a, b) => (a.data < b.data ? 1 : -1));

  container.innerHTML = ordenada
    .map((a) => {
      const linkHtml = a.link
        ? `<a class="link-btn" href="${a.link}" target="_blank" rel="noopener">ver código →</a>`
        : `<span class="no-link">sem link ainda</span>`;

      const notaHtml = a.nota
        ? `<div class="note-box"><strong>Observação:</strong> ${a.nota}</div>`
        : "";

      return `
        <article class="activity ${a.status}">
          <div class="bar"></div>
          <div class="body">
            <h3>${a.titulo}</h3>
            <p>${a.descricao}</p>
            <span class="date">entrega: ${formatarData(a.data)}</span>
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
}

function aplicarFiltro(filtro) {
  const lista =
    filtro === "todas"
      ? atividades
      : atividades.filter((a) => a.status === filtro);
  renderLista(lista);
}

function setupFiltros() {
  const botoes = document.querySelectorAll(".filter-btn");
  botoes.forEach((btn) => {
    btn.addEventListener("click", () => {
      botoes.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      aplicarFiltro(btn.dataset.filter);
    });
  });
}

function setupDataAtualizacao() {
  const hoje = new Date();
  const dataFormatada = hoje.toLocaleDateString("pt-BR");
  document.getElementById("ultima-atualizacao").textContent =
    `página carregada em: ${dataFormatada}`;
}

// Inicialização
renderProgresso(atividades);
renderResumo(atividades);
renderLista(atividades);
setupFiltros();
setupDataAtualizacao();
