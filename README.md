# Portfólio — Matheus

Site estático de portfólio pessoal, pronto para publicar no GitHub Pages.

## Estrutura

```
.
├── index.html   → conteúdo do site
├── style.css    → estilos
├── script.js    → animações (linha de transmissão + reveal on scroll)
└── README.md
```

## Antes de publicar — edite estes pontos

No `index.html`, procure e substitua:

- `[Sobrenome]` — seu sobrenome no título
- `seu.email@exemplo.com` — seu e-mail
- `github.com/seu-usuario` — seu usuário do GitHub
- `linkedin.com/in/seu-usuario` — seu LinkedIn (ou remova o link se não usar)
- Os 3 cards de projetos — ajuste títulos, descrições e tags conforme seus projetos reais

## Como publicar no GitHub Pages

1. Crie um repositório no GitHub (ex: `portfolio` ou `seu-usuario.github.io`)
2. Suba estes arquivos para a raiz do repositório:
   ```bash
   git init
   git add .
   git commit -m "primeiro commit do portfólio"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/NOME-DO-REPO.git
   git push -u origin main
   ```
3. No GitHub, vá em **Settings → Pages**
4. Em "Source", selecione a branch `main` e a pasta `/ (root)`
5. Salve. Em alguns minutos o site estará no ar em:
   - `https://seu-usuario.github.io/NOME-DO-REPO/` (repositório comum)
   - ou `https://seu-usuario.github.io/` (se o repo se chamar `seu-usuario.github.io`)

## Testar localmente antes de subir

Com Python instalado, na pasta do projeto:

```bash
python3 -m http.server 8080
```

Depois abra `http://localhost:8080` no navegador.
