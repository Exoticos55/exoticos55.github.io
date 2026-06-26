// ===================================================================
// Lógica do modal de visualização de arquivo.
// Compartilhado entre index.html (main.js) e atividade.html (detalhe.js).
// ===================================================================

function detectarTipoArquivo(nome) {
  const ext = nome.split(".").pop().toLowerCase();
  if (ext === "pdf") return "pdf";
  if (["png", "jpg", "jpeg", "gif", "webp", "svg"].includes(ext)) return "imagem";
  if (["doc", "docx", "xls", "xlsx", "ppt", "pptx"].includes(ext)) return "documento";
  if (
    ["py", "js", "ts", "jsx", "tsx", "java", "c", "cpp", "cs", "go", "rb",
     "php", "html", "css", "json", "txt", "md", "sql", "sh", "yml", "yaml"]
      .includes(ext)
  ) return "codigo";
  return "outro";
}

function linguagemHighlightJs(nome) {
  const ext = nome.split(".").pop().toLowerCase();
  const mapa = {
    py: "python", js: "javascript", ts: "typescript", jsx: "javascript",
    tsx: "typescript", java: "java", c: "c", cpp: "cpp", cs: "csharp",
    go: "go", rb: "ruby", php: "php", html: "xml", css: "css",
    json: "json", txt: "plaintext", md: "markdown", sql: "sql",
    sh: "bash", yml: "yaml", yaml: "yaml",
  };
  return mapa[ext] || "plaintext";
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
  const linkBaixar = document.getElementById("file-modal-baixar");

  titulo.textContent = nome;
  linkAbrir.href = url;
  linkBaixar.href = url;
  linkBaixar.setAttribute("download", nome);
  overlay.classList.remove("hidden");

  const tipo = detectarTipoArquivo(nome);
  if (tipo === "pdf") {
    const urlVisualizacao = `https://docs.google.com/viewer?url=${encodeURIComponent(url)}&embedded=true`;
    body.innerHTML = `<iframe src="${urlVisualizacao}" title="${nome}"></iframe>`;
  } else if (tipo === "documento") {
    const urlVisualizacao = `https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(url)}`;
    body.innerHTML = `<iframe src="${urlVisualizacao}" title="${nome}"></iframe>`;
  } else if (tipo === "imagem") {
    body.innerHTML = `<img src="${url}" alt="${nome}" />`;
  } else if (tipo === "codigo") {
    body.innerHTML = `<div class="file-modal-fallback">Carregando conteúdo...</div>`;
    try {
      const resp = await fetch(url);
      if (!resp.ok) throw new Error("Não consegui carregar o arquivo.");
      const texto = await resp.text();
      const linguagem = linguagemHighlightJs(nome);
      body.innerHTML = `
        <div class="code-view-wrap">
          <button type="button" class="code-copy-btn" id="code-copy-btn">Copiar</button>
          <pre class="file-code-view"><code class="language-${linguagem}">${escaparHtml(texto)}</code></pre>
        </div>
      `;
      if (window.hljs) {
        window.hljs.highlightElement(body.querySelector("code"));
      }
      document.getElementById("code-copy-btn").addEventListener("click", () => {
        navigator.clipboard.writeText(texto).then(() => {
          const btn = document.getElementById("code-copy-btn");
          btn.textContent = "Copiado!";
          setTimeout(() => { btn.textContent = "Copiar"; }, 1500);
        });
      });
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
