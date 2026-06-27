import json
import csv
import os

# 1. BASE DE DADOS ESTRUTURADA (Eventos Esportivos de Alegrete-RS)
eventos_esportivos = [
    {
        "id": 1,
        "nome": "EFIPAN — Encontro de Futebol Infantil Pan-Americano",
        "modalidade": "Futebol",
        "badge": "Futebol Masculino Sub-14",
        "data": "Janeiro (Anual)",
        "local": "Estádio Municipal Farroupilha",
        "bg_color": "#d4f0e0",
        "badge_class": "badge-futebol",
        "emoji": "⚽",
        "link_oficial": "https://www.efipan.com.br",
        "redes_sociais": {
            "instagram": "https://instagram.com/efipan_oficial",
            "facebook": "https://facebook.com/efipan"
        },
        "historico": "Criado em 1980, é um dos torneios de futebol infantil mais tradicionais da América Latina, revelando craques como Ronaldinho Gaúcho, Neymar e Alexandre Pato."
    },
    {
        "id": 2,
        "nome": "Trilha dos Cerros de Alegrete",
        "modalidade": "Ciclismo",
        "badge": "Mountain Bike / Ciclismo",
        "data": "Novembro",
        "local": "Zonas Rurais e Cerros de Alegrete",
        "bg_color": "#dbeafe",
        "badge_class": "badge-ciclismo",
        "emoji": "🚵",
        "link_oficial": "https://www.trilhadoscerros.com.br",
        "redes_sociais": {
            "instagram": "https://instagram.com/trilhadoscerros"
        },
        "historico": "Evento que reúne ciclistas de todo o estado e do Uruguai para desafiar o relevo de cerros característico do bioma Pampa."
    },
    {
        "id": 3,
        "nome": "Rústica Municipal do Aniversário de Alegrete",
        "modalidade": "Atletismo",
        "badge": "Corrida de Rua / Atletismo",
        "data": "25 de Outubro",
        "local": "Praça Getúlio Vargas",
        "bg_color": "#fef3c7",
        "badge_class": "badge-atletismo",
        "emoji": "🏃",
        "link_oficial": "https://www.alegrete.rs.gov.br",
        "redes_sociais": {
            "facebook": "https://facebook.com/prefeituraalegrete"
        },
        "historico": "Competição tradicional que celebra o aniversário da cidade, envolvendo atletas locais de diversas faixas etárias e categorias."
    }
]

# FORÇAR O CAMINHO PARA A SUA PASTA DE DOWNLOADS
pasta_downloads = r"C:\Users\2610102765\Downloads"

caminho_json = os.path.join(pasta_downloads, "eventos_esportivos.json")
caminho_csv = os.path.join(pasta_downloads, "eventos_esportivos.csv")
caminho_html = os.path.join(pasta_downloads, "catalogo_esportivo_alegrete.html")

# 2. EXPORTAÇÃO DOS ARQUIVOS DE DADOS (Salva direto no Downloads)
with open(caminho_json, "w", encoding="utf-8") as f:
    json.dump(eventos_esportivos, f, ensure_ascii=False, indent=4)

with open(caminho_csv, "w", newline="", encoding="utf-8") as f:
    writer = csv.writer(f)
    writer.writerow(["ID", "Nome", "Modalidade", "Data", "Local", "Link", "Histórico"])
    for ev in eventos_esportivos:
        writer.writerow([ev["id"], ev["nome"], ev["modalidade"], ev["data"], ev["local"], ev["link_oficial"], ev["historico"]])


# 3. GERAÇÃO AUTOMÁTICA DA INTERFACE WEB INTERATIVA
def gerar_pagina_web():
    html_cards = ""
    for ev in eventos_esportivos:
        redes = ""
        if "instagram" in ev["redes_sociais"]:
            redes += f'<a href="{ev["redes_sociais"]["instagram"]}" class="social-link" target="_blank">Instagram</a>\n        '
        if "facebook" in ev["redes_sociais"]:
            redes += f'<a href="{ev["redes_sociais"]["facebook"]}" class="social-link" target="_blank">Facebook</a>'

        html_cards += f"""
  <div class="event-card" data-modal="{ev["modalidade"]}">
    <div class="card-img" style="background:{ev["bg_color"]};">
      <div class="card-img-bg">{ev["emoji"]}</div>
      <div class="card-img-overlay"></div>
      <span class="card-badge {ev["badge_class"]}">{ev["badge"]}</span>
    </div>
    <div class="card-body">
      <div class="card-title">{ev["nome"]}</div>
      <div class="card-meta">
        <div class="meta-row">📅 {ev["data"]}</div>
        <div class="meta-row">📍 {ev["local"]}</div>
      </div>
      <p class="card-hist">{ev["historico"]}</p>
    </div>
    <div class="card-footer">
      <a href="{ev["link_oficial"]}" class="btn-site" target="_blank">Site oficial</a>
      <div class="social-links">
        Redes: {redes}
      </div>
    </div>
  </div>\n"""

    template_html = f"""<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Catálogo de Eventos Esportivos de Alegrete-RS</title>
<style>
* {{ box-sizing: border-box; margin: 0; padding: 0; }}
body {{ font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; background: #f3f4f6; padding-bottom: 3rem; }}

.portal-header {{
  background: #1a4a2e;
  color: #fff;
  padding: 2.5rem 2rem 2rem;
  position: relative;
  overflow: hidden;
}}
.eyebrow {{
  font-size: 11px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: #7ed8a4;
  margin-bottom: 0.5rem;
}}
.portal-header h1 {{
  font-size: 22px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 0.4rem;
}}
.portal-header p {{
  font-size: 14px;
  color: rgba(255,255,255,0.6);
}}

.stats-bar {{
  display: flex;
  background: #ffffff;
  border-bottom: 0.5px solid #e5e7eb;
}}
.stat-cell {{
  flex: 1;
  text-align: center;
  padding: 0.75rem;
  border-right: 0.5px solid #e5e7eb;
}}
.stat-cell:last-child {{ border-right: none; }}
.stat-num {{ font-size: 18px; font-weight: 500; color: #1a4a2e; }}
.stat-lbl {{ font-size: 11px; color: #4b5563; margin-top: 2px; }}

.filter-bar {{
  display: flex;
  gap: 8px;
  padding: 1.25rem 1.5rem;
  background: #ffffff;
  border-bottom: 0.5px solid #e5e7eb;
  align-items: center;
}}
.filter-label {{
  font-size: 12px;
  color: #4b5563;
  margin-right: 4px;
}}
.chip {{
  font-size: 12px;
  padding: 4px 14px;
  border-radius: 999px;
  border: 0.5px solid #d1d5db;
  background: #f9fafb;
  color: #4b5563;
  cursor: pointer;
  transition: all 0.15s;
}}
.chip.active {{
  background: #1a4a2e;
  color: #fff;
  border-color: #1a4a2e;
}}

.cards-grid {{
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: 1.5rem;
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
}}

.event-card {{
  background: #ffffff;
  border-radius: 12px;
  border: 0.5px solid #e5e7eb;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 3px rgba(0,0,0,0.05);
}}
.card-img {{
  height: 160px;
  position: relative;
  display: flex;
  align-items: flex-end;
  padding: 12px;
}}
.card-img-bg {{
  position: absolute; inset: 0;
  display: flex align-items: center; justify-content: center;
  font-size: 56px;
  opacity: 0.8;
}}
.card-img-overlay {{
  position: absolute; inset: 0;
  background: linear-gradient(to top, rgba(0,0,0,0.4) 0%, transparent 70%);
}}
.card-badge {{
  position: relative;
  font-size: 11px;
  padding: 4px 10px;
  border-radius: 999px;
  font-weight: 500;
  z-index: 1;
}}
.badge-futebol {{ background: #e8f5e9; color: #1a4a2e; border: 1px solid #c8e6c9; }}
.badge-ciclismo {{ background: #e3f2fd; color: #1e40af; border: 1px solid #bbdefb; }}
.badge-atletismo {{ background: #fff8e1; color: #92400e; border: 1px solid #ffecb3; }}

.card-body {{ padding: 1.25rem; flex: 1; display: flex; flex-direction: column; gap: 10px; }}
.card-title {{ font-size: 16px; font-weight: 600; color: #111827; line-height: 1.4; }}
.card-meta {{ display: flex; flex-direction: column; gap: 6px; }}
.meta-row {{ font-size: 13px; color: #4b5563; display: flex; align-items: center; }}
.card-hist {{
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
  margin-top: 4px;
}}

.card-footer {{
  padding: 1rem 1.25rem;
  border-top: 0.5px solid #e5e7eb;
  background: #f9fafb;
  display: flex;
  align-items: center;
  justify-content: space-between;
}}
.btn-site {{
  font-size: 12px;
  font-weight: 500;
  padding: 6px 14px;
  border-radius: 6px;
  background: #1a4a2e;
  color: #fff;
  text-decoration: none;
  transition: background 0.2s;
}}
.btn-site:hover {{ background: #133822; }}
.social-links {{ font-size: 12px; color: #6b7280; }}
.social-link {{
  color: #1a4a2e;
  text-decoration: none;
  margin-left: 4px;
  font-weight: 500;
}}
.social-link:hover {{ text-decoration: underline; }}

.empty-state {{
  grid-column: 1/-1;
  text-align: center;
  padding: 4rem 2rem;
  color: #6b7280;
  font-size: 14px;
}}
</style>
</head>
<body>

<div class="portal-header">
  <div class="eyebrow">alegrete.org · esportes</div>
  <h1>Catálogo de Eventos Esportivos</h1>
  <p>Tradição esportiva de Alegrete — RS</p>
</div>

<div class="stats-bar">
  <div class="stat-cell"><div class="stat-num">3</div><div class="stat-lbl">Eventos</div></div>
  <div class="stat-cell"><div class="stat-num">3</div><div class="stat-lbl">Modalidades</div></div>
  <div class="stat-cell"><div class="stat-num">+40</div><div class="stat-lbl">Anos de história</div></div>
</div>

<div class="filter-bar">
  <span class="filter-label">Filtrar:</span>
  <button class="chip active" onclick="filtrar('todos')">Todos</button>
  <button class="chip" onclick="filtrar('Futebol')">Futebol</button>
  <button class="chip" onclick="filtrar('Ciclismo')">Ciclismo</button>
  <button class="chip" onclick="filtrar('Atletismo')">Atletismo</button>
</div>

<div class="cards-grid" id="grid">
{html_cards}
</div>

<script>
function filtrar(mod) {{
  document.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
  event.target.classList.add('active');
  const cards = document.querySelectorAll('.event-card');
  let visible = 0;
  cards.forEach(card => {{
    const match = mod === 'todos' || card.dataset.modal === mod;
    card.style.display = match ? 'flex' : 'none';
    if (match) visible++;
  }});
  
  const oldEmpty = document.querySelector('.empty-state');
  if (oldEmpty) oldEmpty.remove();
  
  if (visible === 0) {{
    const el = document.createElement('div');
    el.className = 'empty-state';
    el.textContent = 'Nenhum evento encontrado para esta modalidade.';
    document.getElementById('grid').appendChild(el);
  }}
}}
</script>

</body>
</html>
"""
    with open(caminho_html, "w", encoding="utf-8") as f_html:
        f_html.write(template_html)
    print(f"[✓] Arquivo salvo em: {caminho_html}")

gerar_pagina_web()
print("Processo concluído com sucesso!")
