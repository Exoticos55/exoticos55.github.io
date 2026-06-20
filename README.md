# Painel de Atividades — Algoritmos

Site simples para acompanhar as atividades enviadas no Google Classroom
da disciplina de Algoritmos. Mostra o que foi enviado, o que está
pendente e o que está atrasado, para o professor avaliar o histórico.

## Arquivos

- `index.html` — estrutura da página (não precisa editar quase nada aqui).
- `admin.html` — painel para adicionar atividades sem editar código.
- `style.css` — visual do site (tema preto/azul, identidade de Eng. Elétrica).
- `icon-eletrica.svg` — símbolo de raio usado no cabeçalho.
- `activities.js` — lista de todas as atividades (editado automaticamente
  pelo `admin.html`, mas também pode ser editado manualmente).
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
2. Suba estes 6 arquivos (`index.html`, `admin.html`, `style.css`,
   `icon-eletrica.svg`, `activities.js`, `main.js`) para a raiz do
   repositório.
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

## Como atualizar quando tiver atividade nova (sem editar código)

Agora existe um painel (`admin.html`) que escreve direto no
`activities.js` do repositório usando a API do GitHub — você não
precisa mais editar arquivo nem fazer `git push` na mão.

### Configuração (uma vez só)

1. Vá em **https://github.com/settings/tokens?type=beta**
2. Clique em **Generate new token**.
3. Preencha:
   - **Token name**: qualquer nome, ex. `painel-atividades`
   - **Expiration**: 90 dias (depois é só gerar outro)
   - **Repository access**: "Only select repositories" → escolha este repositório
4. Em **Repository permissions**, ache **Contents** e mude para
   **Read and write**.
5. Clique em **Generate token** e copie o valor mostrado (começa com
   `github_pat_...`). Você só vê esse valor uma vez — guarde com
   cuidado e nunca compartilhe.

⚠️ Esse token funciona como uma senha de escrita no repositório. Não
cole em conversas, não suba pro GitHub, não mande pra ninguém.

### Usando o painel

1. Abra `https://SEU-USUARIO.github.io/SEU-REPOSITORIO/admin.html`
2. Preencha usuário do GitHub, nome do repositório e cole o token.
3. Clique em **Salvar conexão neste navegador** (isso guarda usuário
   e repositório, mas **nunca** o token — por segurança, ele pede o
   token de novo a cada visita).
4. Preencha os dados da atividade e clique em **Salvar atividade no
   site**.
5. Em poucos segundos o `activities.js` do repositório é atualizado
   automaticamente e o painel principal já reflete a mudança.

### Atualizando manualmente (alternativa, sem o painel)

Se preferir editar direto, o formato de cada atividade no
`activities.js` é:

```js
{
  titulo: "Atividade 05 - Recursividade",
  data: "2026-05-19",
  status: "pendente", // troque pra "enviada" quando entregar
  link: "",            // cole o link da pasta no GitHub quando tiver
  descricao: "Exercícios de funções recursivas."
},
```

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
