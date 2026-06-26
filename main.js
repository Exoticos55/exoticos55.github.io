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

function renderLista(lista, ordem) {
  const container = document.getElementById("activity-list");

  if (lista.length === 0) {
    container.innerHTML = `<p class="no-link">Nenhuma atividade encontrada com esses filtros.</p>`;
    return;
  }

  const direcao = ordem === "asc" ? -1 : 1;
  // Mantém o índice original (posição no array "atividades") para linkar certo,
  // mesmo depois de filtrar e ordenar a lista exibida.
  const comIndiceOriginal = lista.map((a) => ({
    atividade: a,
    indiceOriginal: atividades.indexOf(a),
  }));
  const ordenada = [...comIndiceOriginal].sort(
    (x, y) => (x.atividade.data < y.atividade.data ? 1 : -1) * direcao
  );

  container.innerHTML = ordenada
    .map(({ atividade: a, indiceOriginal }) => {
      const arquivos = Array.isArray(a.arquivos) ? a.arquivos : [];
      const qtdArquivos = arquivos.length;
      const tecnologias = Array.isArray(a.tecnologias) ? a.tecnologias : [];

      const tecnologiasHtml = tecnologias.length
        ? `<div class="card-tech-tags">
            ${tecnologias
              .slice(0, 3)
              .map((t) => `<span class="card-tech-tag">${t}</span>`)
              .join("")}
            ${tecnologias.length > 3 ? `<span class="card-tech-tag">+${tecnologias.length - 3}</span>` : ""}
          </div>`
        : "";

      const arquivoIndicador = qtdArquivos
        ? `<span class="card-file-indicator">
            <svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.4">
              <path d="M9.5 1.5H3.5a1 1 0 0 0-1 1v11a1 1 0 0 0 1 1h9a1 1 0 0 0 1-1V5.5L9.5 1.5Z"/>
              <path d="M9.5 1.5V5h4"/>
            </svg>
            ${qtdArquivos} ${qtdArquivos === 1 ? "arquivo" : "arquivos"}
          </span>`
        : `<span class="card-file-indicator card-file-indicator-empty">sem arquivo</span>`;

      return `
        <a class="activity ${a.status} reveal" href="atividade.html?id=${indiceOriginal}">
          <div class="bar"></div>
          <div class="body">
            <span class="badge ${a.status}">${STATUS_LABEL[a.status]}</span>
            <h3>${a.titulo}</h3>
            <p>${a.descricao}</p>
            ${tecnologiasHtml}
          </div>
          <div class="card-footer">
            <span class="date">entrega: ${formatarData(a.data)}</span>
            ${arquivoIndicador}
          </div>
        </a>
      `;
    })
    .join("");
}

const estadoFiltros = {
  dataDe: "",
  dataAte: "",
  ordem: "desc",
};

function aplicarTodosFiltros() {
  let lista = atividades;

  if (estadoFiltros.dataDe) {
    lista = lista.filter((a) => a.data >= estadoFiltros.dataDe);
  }
  if (estadoFiltros.dataAte) {
    lista = lista.filter((a) => a.data <= estadoFiltros.dataAte);
  }

  renderLista(lista, estadoFiltros.ordem);

  const contador = document.getElementById("contador-rodape");
  if (contador) {
    const enviadas = atividades.filter((a) => a.status === "enviada").length;
    contador.textContent = `${enviadas}/${atividades.length} atividades enviadas`;
  }

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

function setupHero() {
  const btnVerAtividades = document.querySelector('[data-scroll-to="painel-atividades"]');
  const btnSobreMim = document.querySelector('[data-goto-tab="sobre"]');

  if (btnVerAtividades) {
    btnVerAtividades.addEventListener("click", () => {
      document.getElementById("painel-atividades").scrollIntoView({ behavior: "smooth" });
    });
  }

  if (btnSobreMim) {
    btnSobreMim.addEventListener("click", () => {
      const tabSobre = document.querySelector('.tab-btn[data-tab="sobre"]');
      if (tabSobre) tabSobre.click();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
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
aplicarTodosFiltros();
setupFiltroData();
setupTabs();
setupHero();
setupDataAtualizacao();
setupScrollReveal();
