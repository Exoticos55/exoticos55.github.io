// ===================================================================
// Lógica da página de detalhes de uma atividade (atividade.html).
// Lê o parâmetro ?id= da URL e busca a atividade correspondente em
// "atividades" (vindo de activities.js).
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

function obterIdDaUrl() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  return id !== null ? parseInt(id, 10) : null;
}

function renderErro(mensagem) {
  const container = document.getElementById("detail-content");
  container.innerHTML = `
    <div class="detail-card">
      <p class="no-link">${mensagem}</p>
    </div>
  `;
}

function renderDetalhe(atividade) {
  const container = document.getElementById("detail-content");

  const linkHtml = atividade.link
    ? `<a class="link-btn" href="${atividade.link}" target="_blank" rel="noopener">ver no Classroom →</a>`
    : `<span class="no-link">sem link do Classroom</span>`;

  const notaHtml = atividade.nota
    ? `<div class="note-box"><strong>Observação:</strong> ${atividade.nota}</div>`
    : "";

  const enunciadoHtml = atividade.enunciado
    ? `<div class="detail-section">
        <h3>Enunciado</h3>
        <p class="detail-enunciado">${escaparHtml(atividade.enunciado)}</p>
      </div>`
    : "";

  const tecnologias = Array.isArray(atividade.tecnologias) ? atividade.tecnologias : [];
  const tecnologiasHtml = tecnologias.length
    ? `<div class="detail-section">
        <h3>Tecnologias utilizadas</h3>
        <div class="skill-tags">
          ${tecnologias.map((t) => `<span class="skill-tag">${t}</span>`).join("")}
        </div>
      </div>`
    : "";

  const arquivos = Array.isArray(atividade.arquivos) ? atividade.arquivos : [];
  const arquivosHtml = `
    <div class="detail-section">
      <h3>Arquivos e resultados</h3>
      ${
        arquivos.length
          ? `<div class="file-chips">
              ${arquivos
                .map(
                  (arq) => `
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
          : `<p class="no-link">Nenhum arquivo anexado a esta atividade.</p>`
      }
    </div>
  `;

  container.innerHTML = `
    <div class="detail-card">
      <span class="badge ${atividade.status}">${STATUS_LABEL[atividade.status]}</span>
      <h1>${atividade.titulo}</h1>
      <span class="date">entrega: ${formatarData(atividade.data)}</span>

      <div class="detail-section">
        <h3>Objetivo</h3>
        <p>${atividade.descricao}</p>
      </div>

      ${enunciadoHtml}
      ${tecnologiasHtml}
      ${arquivosHtml}

      <div class="detail-section detail-classroom">
        <h3>Referência no Classroom</h3>
        ${linkHtml}
      </div>

      ${notaHtml}
    </div>
  `;

  setupFileChips();
}

function inicializar() {
  const id = obterIdDaUrl();

  if (id === null || isNaN(id) || !atividades[id]) {
    renderErro("Atividade não encontrada. Volte para o painel e tente novamente.");
    return;
  }

  const atividade = atividades[id];
  document.title = `${atividade.titulo} — Algoritmos`;
  renderDetalhe(atividade);
  setupModalGlobal();
}

inicializar();
