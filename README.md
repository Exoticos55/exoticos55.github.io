# Painel de Atividades — Algoritmos

Site simples para acompanhar as atividades enviadas no Google Classroom
da disciplina de Algoritmos. Mostra o que foi enviado, o que está
pendente e o que está atrasado, para o professor avaliar o histórico.

## Arquivos

- `index.html` — estrutura da página (não precisa editar quase nada aqui).
- `style.css` — visual do site (tema preto/azul, identidade de Eng. Elétrica).
- `icon-eletrica.svg` — símbolo de raio/circuito usado no cabeçalho.
- `activities.js` — **é o arquivo que você vai editar sempre.** Lista
  todas as atividades.
- `main.js` — lógica que monta a página a partir do `activities.js`.

## Status disponíveis

- `"enviada"` — já entregou no Classroom.
- `"feita_nao_confirmada"` — você fez a atividade, mas não confirmou/
  printou a tempo no Classroom, então ficou marcada como não entregue
  por lá. Use esse status pra deixar isso registrado e explicado (tem
  um campo `nota` pra escrever o que aconteceu).
- `"pendente"` — ainda não entregou, mas está no prazo.
- `"atrasada"` — passou do prazo e não foi feita.

## Como publicar no GitHub Pages (primeira vez)

1. Crie um repositório novo no GitHub (ex: `algoritmos-2026`).
2. Suba estes 5 arquivos (`index.html`, `style.css`, `icon-eletrica.svg`,
   `activities.js`, `main.js`) para a raiz do repositório.
   - Pelo site do GitHub: botão **Add file → Upload files**.
   - Ou por linha de comando:
     ```bash
     git init
     git add .
     git commit -m "site inicial do painel de atividades"
     git branch -M main
     git remote add origin https://github.com/SEU-USUARIO/SEU-REPOSITORIO.git
     git push -u origin main
     ```
3. No repositório, vá em **Settings → Pages**.
4. Em "Build and deployment", escolha **Source: Deploy from a branch**.
5. Em "Branch", escolha `main` e a pasta `/ (root)`. Clique em **Save**.
6. Espere 1–2 minutos. O link do site vai aparecer ali mesmo, geralmente:
   `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/`

Esse é o link que você manda pro professor.

## Como atualizar quando tiver atividade nova

Você só precisa editar o `activities.js`. Copie um bloco existente e
ajuste:

```js
{
  titulo: "Atividade 05 - Recursividade",
  data: "2026-05-19",
  status: "pendente", // troque pra "enviada" quando entregar
  link: "",            // cole o link da pasta no GitHub quando tiver
  descricao: "Exercícios de funções recursivas."
},
```

Valores aceitos para `status`:
- `"enviada"` — já entregou no Classroom
- `"pendente"` — ainda não entregou, mas está no prazo
- `"atrasada"` — passou do prazo

Depois de editar, salve e suba a alteração:

```bash
git add activities.js
git commit -m "atualiza atividade 05"
git push
```

O GitHub Pages atualiza automaticamente em alguns segundos/minutos.

## Personalizar seu nome

Abra `index.html` e troque o texto dentro de:

```html
<span class="meta-pill" id="nome-aluno">aluno: edite em index.html</span>
```

por algo como `aluno: Seu Nome — Turma X`.

## Se quiser linkar o código de cada atividade

Crie uma pasta no mesmo repositório para cada atividade (ex:
`atividade-01/`, `atividade-02/`) com os arquivos de código, e cole o
link da pasta no campo `link` do `activities.js`. Assim o professor
clica em "ver código" e vai direto pro exercício.
