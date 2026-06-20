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
renderResumo(atividades);
renderLista(atividades);
setupFiltros();
setupDataAtualizacao();
