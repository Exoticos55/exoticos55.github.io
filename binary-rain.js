// ===================================================================
// Efeito visual no fundo do cabeçalho: símbolos matemáticos flutuando
// (camada principal) + trechos de código fluindo (camada sutil).
// Puramente decorativo — não depende de nenhum dado do site.
// ===================================================================

const SIMBOLOS_MATEMATICOS = [
  "∑", "∫", "√", "π", "Δ", "∞", "λ", "θ", "x²", "f(x)", "n!",
  "α", "β", "≈", "∂", "∇", "Σ", "log", "sin", "cos",
];

const CORES_SIMBOLOS = [
  "121,176,255",  // azul
  "168,140,255",  // roxo
  "255,210,63",   // amarelo
  "121,210,255",  // ciano
];

const TRECHOS_DE_CODIGO = [
  "for i in range(n):", "def soma(a, b):", "if x > 0:", "while True:",
  "return resultado", "import math", "class Estudante:", "print(valor)",
  "x = []", "n += 1", "try:", "except ValueError:",
];

function iniciarEfeitoCabecalho() {
  const canvas = document.getElementById("binary-rain");
  if (!canvas) return;

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const ctx = canvas.getContext("2d");
  const header = canvas.parentElement;

  let particulasMatematicas = [];
  let particulasCodigo = [];

  function numeroDeParticulas(largura) {
    return Math.max(6, Math.round(largura / 140));
  }

  function criarParticulaMatematica(largura, altura) {
    return {
      texto: SIMBOLOS_MATEMATICOS[Math.floor(Math.random() * SIMBOLOS_MATEMATICOS.length)],
      cor: CORES_SIMBOLOS[Math.floor(Math.random() * CORES_SIMBOLOS.length)],
      x: Math.random() * largura,
      y: Math.random() * altura,
      velocidade: 0.12 + Math.random() * 0.18,
      tamanho: 13 + Math.random() * 9,
      opacidadeBase: 0.10 + Math.random() * 0.12,
    };
  }

  function criarParticulaCodigo(largura, altura) {
    return {
      texto: TRECHOS_DE_CODIGO[Math.floor(Math.random() * TRECHOS_DE_CODIGO.length)],
      x: largura + Math.random() * 200,
      y: Math.random() * altura,
      velocidade: 0.25 + Math.random() * 0.25,
      opacidade: 0.06 + Math.random() * 0.05,
    };
  }

  function redimensionar() {
    const dpr = window.devicePixelRatio || 1;
    const largura = header.offsetWidth;
    const altura = header.offsetHeight;

    canvas.width = largura * dpr;
    canvas.height = altura * dpr;
    canvas.style.width = `${largura}px`;
    canvas.style.height = `${altura}px`;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const qtd = numeroDeParticulas(largura);
    particulasMatematicas = new Array(qtd)
      .fill(0)
      .map(() => criarParticulaMatematica(largura, altura));
    particulasCodigo = new Array(Math.max(2, Math.round(qtd / 3)))
      .fill(0)
      .map(() => criarParticulaCodigo(largura, altura));
  }

  function desenhar() {
    const largura = header.offsetWidth;
    const altura = header.offsetHeight;

    ctx.clearRect(0, 0, largura, altura);

    // Camada de fundo: trechos de código fluindo da direita para a esquerda
    ctx.font = "11px monospace";
    for (const p of particulasCodigo) {
      ctx.fillStyle = `rgba(121,176,255,${p.opacidade})`;
      ctx.fillText(p.texto, p.x, p.y);
      p.x -= p.velocidade;
      if (p.x < -200) {
        p.x = largura + Math.random() * 100;
        p.y = Math.random() * altura;
      }
    }

    // Camada principal: símbolos matemáticos subindo lentamente
    for (const p of particulasMatematicas) {
      ctx.font = `${p.tamanho}px monospace`;
      ctx.fillStyle = `rgba(${p.cor},${p.opacidadeBase})`;
      ctx.fillText(p.texto, p.x, p.y);
      p.y -= p.velocidade;
      if (p.y < -20) {
        p.y = altura + 20;
        p.x = Math.random() * largura;
      }
    }

    requestAnimationFrame(desenhar);
  }

  redimensionar();
  window.addEventListener("resize", redimensionar);
  requestAnimationFrame(desenhar);
}

iniciarEfeitoCabecalho();
