"""
Problema 02: Análise de Estabilidade e Custo em Sistemas de Abastecimento de Água
Disciplina: Algoritmos e Programação
Data: 12/05/2026

Funcionalidades:
- Entrada de dados para N bairros definidos pelo usuário
- Cálculo de indicadores de eficiência e risco
- Geração de tabela e gráficos comparativos
- Simulação de 7 dias com variação aleatória de demanda (±20%)
"""

import random
import math

# ─────────────────────────────────────────────
# Bloco 1 – Tentativa de importar matplotlib
# ─────────────────────────────────────────────
try:
    import matplotlib
    matplotlib.use("Agg")          # backend sem janela (seguro em qualquer ambiente)
    import matplotlib.pyplot as plt
    import matplotlib.patches as mpatches
    MATPLOTLIB_OK = True
except ImportError:
    MATPLOTLIB_OK = False
    print("[AVISO] matplotlib não encontrado. Gráficos não serão gerados.")
    print("        Instale com: pip install matplotlib\n")


# ═══════════════════════════════════════════════════════════════
#  FUNÇÕES AUXILIARES
# ═══════════════════════════════════════════════════════════════

def limpar_linha():
    print("-" * 72)


def validar_float(mensagem, minimo=0.0, permitir_zero=False):
    """Lê um número float do usuário, com validação de entrada."""
    while True:
        try:
            valor = float(input(mensagem))
            if permitir_zero and valor < minimo:
                print(f"  ✖ Valor deve ser ≥ {minimo}. Tente novamente.")
            elif not permitir_zero and valor <= minimo:
                print(f"  ✖ Valor deve ser > {minimo}. Tente novamente.")
            else:
                return valor
        except ValueError:
            print("  ✖ Entrada inválida. Digite um número.")


def validar_inteiro(mensagem, minimo=1):
    """Lê um inteiro positivo do usuário, com validação de entrada."""
    while True:
        try:
            valor = int(input(mensagem))
            if valor < minimo:
                print(f"  ✖ Valor deve ser ≥ {minimo}. Tente novamente.")
            else:
                return valor
        except ValueError:
            print("  ✖ Entrada inválida. Digite um número inteiro.")


def validar_percentual(mensagem):
    """Lê um percentual entre 0 e 100 (exclusivo de 100)."""
    while True:
        try:
            valor = float(input(mensagem))
            if 0 <= valor < 100:
                return valor
            print("  ✖ Percentual deve estar entre 0 e 99,99. Tente novamente.")
        except ValueError:
            print("  ✖ Entrada inválida. Digite um número.")


# ═══════════════════════════════════════════════════════════════
#  CÁLCULOS DE INDICADORES
# ═══════════════════════════════════════════════════════════════

def calcular_indicadores(demanda, capacidade, volume_inicial, perc_perda, custo_bombeamento):
    """
    Calcula os indicadores de desempenho para um bairro.

    Retorna dicionário com:
        volume_entregue   – m³ efetivamente entregue ao bairro
        volume_perdido    – m³ perdido na tubulação
        custo_diario      – R$ custo diário de bombeamento
        autonomia         – dias que o reservatório suporta sem reabastecimento
        risco             – 'Baixo' | 'Médio' | 'Alto'
    """
    fator_perda      = perc_perda / 100.0
    volume_perdido   = demanda * fator_perda
    volume_entregue  = demanda * (1 - fator_perda)
    custo_diario     = demanda * custo_bombeamento

    # Autonomia: quantos dias o volume inicial dura entregando a demanda real
    if demanda > 0:
        autonomia = volume_inicial / demanda
    else:
        autonomia = float("inf")

    # Classificação de risco
    if autonomia > 3:
        risco = "Baixo"
    elif autonomia >= 1:
        risco = "Médio"
    else:
        risco = "Alto"

    return {
        "volume_entregue":  volume_entregue,
        "volume_perdido":   volume_perdido,
        "custo_diario":     custo_diario,
        "autonomia":        autonomia,
        "risco":            risco,
    }


# ═══════════════════════════════════════════════════════════════
#  ENTRADA DE DADOS
# ═══════════════════════════════════════════════════════════════

def coletar_dados():
    """Solicita dados ao usuário e retorna lista de dicionários por bairro."""
    print("\n" + "═" * 72)
    print("   SISTEMA DE ANÁLISE DE ABASTECIMENTO DE ÁGUA")
    print("═" * 72)

    n = validar_inteiro("Informe o número de bairros a analisar: ")

    bairros = []           # lista de tamanho variável, definida conforme N
    nomes_usados = set()

    for i in range(n):
        limpar_linha()
        print(f"  BAIRRO {i + 1} de {n}")
        limpar_linha()

        # Nome com verificação de duplicidade
        while True:
            nome = input("  Nome do bairro: ").strip()
            if not nome:
                print("  ✖ Nome não pode ser vazio.")
            elif nome.lower() in nomes_usados:
                print("  ✖ Já existe um bairro com esse nome. Use outro nome.")
            else:
                nomes_usados.add(nome.lower())
                break

        demanda          = validar_float("  Demanda diária estimada (m³): ")
        capacidade       = validar_float("  Capacidade do reservatório (m³): ")

        # Volume inicial não pode exceder a capacidade
        while True:
            volume_inicial = validar_float(
                f"  Volume inicial disponível (m³, máx {capacidade:.1f}): ",
                minimo=0.0, permitir_zero=True
            )
            if volume_inicial > capacidade:
                print(f"  ✖ Volume inicial não pode ser maior que a capacidade ({capacidade:.1f} m³).")
            else:
                break

        perc_perda       = validar_percentual("  Percentual de perda na tubulação (%): ")
        custo_bombeamento = validar_float("  Custo de bombeamento por m³ (R$): ")

        indicadores = calcular_indicadores(
            demanda, capacidade, volume_inicial, perc_perda, custo_bombeamento
        )

        bairros.append({
            "nome":             nome,
            "demanda":          demanda,
            "capacidade":       capacidade,
            "volume_inicial":   volume_inicial,
            "perc_perda":       perc_perda,
            "custo_bombeamento": custo_bombeamento,
            **indicadores,
        })

    return bairros


# ═══════════════════════════════════════════════════════════════
#  SAÍDA: TABELA NO TERMINAL
# ═══════════════════════════════════════════════════════════════

def imprimir_tabela(bairros):
    """Exibe tabela formatada com todos os indicadores por bairro."""
    print("\n" + "═" * 72)
    print("   RESULTADOS POR BAIRRO")
    print("═" * 72)

    cab = (
        f"{'Bairro':<18} {'Demanda':>9} {'Entregue':>10} "
        f"{'Perdido':>9} {'Custo/dia':>11} {'Autonomia':>10} {'Risco':<7}"
    )
    print(cab)
    print("  (m³)      (m³)       (m³)      (R$)      (dias)")
    limpar_linha()

    for b in bairros:
        aut = f"{b['autonomia']:.2f}" if b["autonomia"] != float("inf") else "∞"
        print(
            f"{b['nome']:<18} {b['demanda']:>9.2f} {b['volume_entregue']:>10.2f} "
            f"{b['volume_perdido']:>9.2f} {b['custo_diario']:>11.2f} "
            f"{aut:>10} {b['risco']:<7}"
        )

    limpar_linha()

    # Bairro mais crítico (menor autonomia)
    critico = min(bairros, key=lambda b: b["autonomia"])
    print(f"\n  ⚠  Bairro mais crítico: {critico['nome'].upper()}")
    print(f"     Autonomia: {critico['autonomia']:.2f} dias | Risco: {critico['risco']}")

    # Totais
    total_demanda   = sum(b["demanda"]         for b in bairros)
    total_entregue  = sum(b["volume_entregue"] for b in bairros)
    total_custo     = sum(b["custo_diario"]    for b in bairros)
    print(f"\n  📊 Total demanda : {total_demanda:.2f} m³")
    print(f"     Total entregue: {total_entregue:.2f} m³")
    print(f"     Custo total/dia: R$ {total_custo:.2f}")
    print("═" * 72)


# ═══════════════════════════════════════════════════════════════
#  GRÁFICOS
# ═══════════════════════════════════════════════════════════════

COR_DEMANDA   = "#1a6eb5"
COR_ENTREGUE  = "#27ae60"
COR_BAIXO     = "#2ecc71"
COR_MEDIO     = "#f1c40f"
COR_ALTO      = "#e74c3c"
PALETA_LINHAS = ["#1a6eb5","#e74c3c","#27ae60","#e67e22","#9b59b6",
                 "#16a085","#c0392b","#2980b9","#8e44ad","#f39c12"]

MAPA_RISCO = {"Baixo": COR_BAIXO, "Médio": COR_MEDIO, "Alto": COR_ALTO}


def gerar_graficos_basicos(bairros):
    """Gera um único PNG com os 3 gráficos obrigatórios lado a lado."""
    if not MATPLOTLIB_OK:
        return

    nomes     = [b["nome"]            for b in bairros]
    demandas  = [b["demanda"]         for b in bairros]
    entregues = [b["volume_entregue"] for b in bairros]
    custos    = [b["custo_diario"]    for b in bairros]
    cores_bar = [MAPA_RISCO[b["risco"]] for b in bairros]

    contagem  = {"Baixo": 0, "Médio": 0, "Alto": 0}
    for b in bairros:
        contagem[b["risco"]] += 1
    rot_pizza = [k for k, v in contagem.items() if v > 0]
    val_pizza = [contagem[k] for k in rot_pizza]
    cor_pizza = [MAPA_RISCO[k] for k in rot_pizza]

    n = len(nomes)
    x = list(range(n))
    w = 0.38

    largura_base = max(14, n * 2.2)
    fig, axes = plt.subplots(1, 3, figsize=(largura_base, 5))
    fig.suptitle("Análise de Abastecimento de Água – Visão Geral",
                 fontsize=13, fontweight="bold", y=1.01)

    # ── Subplot 1: Demanda vs Entregue ──────────────────────────────
    ax1 = axes[0]
    b1 = ax1.bar([i - w/2 for i in x], demandas,  width=w,
                 label="Demanda (m³)", color=COR_DEMANDA, edgecolor="white")
    b2 = ax1.bar([i + w/2 for i in x], entregues, width=w,
                 label="Entregue (m³)", color=COR_ENTREGUE, edgecolor="white")
    for bar in list(b1) + list(b2):
        ax1.text(bar.get_x() + bar.get_width() / 2,
                 bar.get_height() + max(demandas) * 0.01,
                 f"{bar.get_height():.1f}",
                 ha="center", va="bottom", fontsize=7)
    ax1.set_xticks(x)
    ax1.set_xticklabels(nomes, rotation=22, ha="right", fontsize=9)
    ax1.set_ylabel("Volume (m³)")
    ax1.set_title("Demanda vs Volume Entregue")
    ax1.legend(fontsize=8)
    ax1.grid(axis="y", alpha=0.3)

    # ── Subplot 2: Custo Diário ──────────────────────────────────────
    ax2 = axes[1]
    bars2 = ax2.bar(x, custos, color=cores_bar, edgecolor="white")
    for bar in bars2:
        ax2.text(bar.get_x() + bar.get_width() / 2,
                 bar.get_height() + max(custos) * 0.01,
                 f"R${bar.get_height():.0f}",
                 ha="center", va="bottom", fontsize=7)
    ax2.set_xticks(x)
    ax2.set_xticklabels(nomes, rotation=22, ha="right", fontsize=9)
    ax2.set_ylabel("Custo (R$)")
    ax2.set_title("Custo Diário de Bombeamento")
    legenda2 = [
        mpatches.Patch(color=COR_BAIXO, label="Risco Baixo"),
        mpatches.Patch(color=COR_MEDIO, label="Risco Médio"),
        mpatches.Patch(color=COR_ALTO,  label="Risco Alto"),
    ]
    ax2.legend(handles=legenda2, fontsize=8)
    ax2.grid(axis="y", alpha=0.3)

    # ── Subplot 3: Pizza de Risco ────────────────────────────────────
    ax3 = axes[2]
    wedges, texts, autotexts = ax3.pie(
        val_pizza, labels=rot_pizza, colors=cor_pizza,
        autopct="%1.1f%%", startangle=90,
        wedgeprops=dict(edgecolor="white", linewidth=1.5),
    )
    for at in autotexts:
        at.set_fontsize(9)
    ax3.set_title("Distribuição dos Níveis de Risco")

    fig.tight_layout()
    fig.savefig("graficos_analise.png", dpi=130, bbox_inches="tight")
    plt.close(fig)
    print("  ✔ Gráfico salvo: graficos_analise.png")


# ═══════════════════════════════════════════════════════════════
#  SIMULAÇÃO DE 7 DIAS
# ═══════════════════════════════════════════════════════════════

def simular_7_dias(bairros):
    """
    Simula 7 dias com demanda variável (±20%).
    Retorna histórico de volumes e lista de dias/bairros críticos.
    """
    NUM_DIAS = 7
    VARIACAO = 0.20

    # histórico[bairro_idx][dia] = volume no início do dia
    historico = [[b["volume_inicial"]] for b in bairros]
    criticos  = []   # tuplas (dia, nome_bairro)

    volumes = [b["volume_inicial"] for b in bairros]

    print("\n" + "═" * 72)
    print("   SIMULAÇÃO – 7 DIAS")
    print("═" * 72)

    for dia in range(1, NUM_DIAS + 1):
        print(f"\n  DIA {dia}")
        limpar_linha()
        algum_critico = False

        for idx, b in enumerate(bairros):
            # Demanda do dia com variação aleatória ±20 %
            fator      = 1 + random.uniform(-VARIACAO, VARIACAO)
            dem_dia    = b["demanda"] * fator
            consumido  = dem_dia * (1 - b["perc_perda"] / 100)

            # Volume resultante ao final do dia (não pode ser negativo)
            novo_vol = max(0.0, volumes[idx] - consumido)

            # Autonomia residual com a demanda do dia
            autonomia = novo_vol / dem_dia if dem_dia > 0 else float("inf")

            if autonomia < 1:
                risco = "Alto  ⚠"
                criticos.append((dia, b["nome"]))
                algum_critico = True
            elif autonomia < 3:
                risco = "Médio"
            else:
                risco = "Baixo"

            print(
                f"    {b['nome']:<16}  dem={dem_dia:7.2f} m³  "
                f"vol_final={novo_vol:8.2f} m³  aut={autonomia:5.2f}d  {risco}"
            )

            volumes[idx] = novo_vol
            historico[idx].append(novo_vol)

        if not algum_critico:
            print("    → Nenhum bairro em situação crítica neste dia.")

    print("\n" + "═" * 72)

    # Resumo dos dias críticos
    if criticos:
        print("  DIAS COM SITUAÇÃO CRÍTICA:")
        for dia, nome in criticos:
            print(f"    • Dia {dia}: {nome}")
    else:
        print("  Nenhum bairro entrou em situação crítica ao longo da simulação.")

    print("═" * 72)
    return historico, criticos


def grafico_simulacao(bairros, historico):
    """
    Gera um único PNG com os 4 gráficos:
      linha 1 → (demanda/entregue) | (custo diário) | (pizza risco)
      linha 2 → (simulação 7 dias, largura total)
    """
    if not MATPLOTLIB_OK:
        return

    nomes     = [b["nome"]            for b in bairros]
    demandas  = [b["demanda"]         for b in bairros]
    entregues = [b["volume_entregue"] for b in bairros]
    custos    = [b["custo_diario"]    for b in bairros]
    cores_bar = [MAPA_RISCO[b["risco"]] for b in bairros]

    contagem  = {"Baixo": 0, "Médio": 0, "Alto": 0}
    for b in bairros:
        contagem[b["risco"]] += 1
    rot_pizza = [k for k, v in contagem.items() if v > 0]
    val_pizza = [contagem[k] for k in rot_pizza]
    cor_pizza = [MAPA_RISCO[k] for k in rot_pizza]

    n  = len(nomes)
    x  = list(range(n))
    w  = 0.38
    largura = max(14, n * 2.2)

    fig = plt.figure(figsize=(largura, 10))
    fig.suptitle("Análise de Abastecimento de Água – Relatório Completo",
                 fontsize=14, fontweight="bold", y=1.01)

    # Grade 2×3; a linha 2 ocupa as 3 colunas
    gs = fig.add_gridspec(2, 3, hspace=0.45, wspace=0.35)
    ax1 = fig.add_subplot(gs[0, 0])
    ax2 = fig.add_subplot(gs[0, 1])
    ax3 = fig.add_subplot(gs[0, 2])
    ax4 = fig.add_subplot(gs[1, :])   # linha inteira

    # ── 1) Demanda vs Entregue ───────────────────────────────────────
    b1 = ax1.bar([i - w/2 for i in x], demandas,  width=w,
                 label="Demanda (m³)", color=COR_DEMANDA, edgecolor="white")
    b2 = ax1.bar([i + w/2 for i in x], entregues, width=w,
                 label="Entregue (m³)", color=COR_ENTREGUE, edgecolor="white")
    for bar in list(b1) + list(b2):
        ax1.text(bar.get_x() + bar.get_width() / 2,
                 bar.get_height() + max(demandas) * 0.01,
                 f"{bar.get_height():.1f}",
                 ha="center", va="bottom", fontsize=7)
    ax1.set_xticks(x)
    ax1.set_xticklabels(nomes, rotation=22, ha="right", fontsize=8)
    ax1.set_ylabel("Volume (m³)")
    ax1.set_title("Demanda vs Volume Entregue")
    ax1.legend(fontsize=7)
    ax1.grid(axis="y", alpha=0.3)

    # ── 2) Custo Diário ──────────────────────────────────────────────
    bars2 = ax2.bar(x, custos, color=cores_bar, edgecolor="white")
    for bar in bars2:
        ax2.text(bar.get_x() + bar.get_width() / 2,
                 bar.get_height() + max(custos) * 0.01,
                 f"R${bar.get_height():.0f}",
                 ha="center", va="bottom", fontsize=7)
    ax2.set_xticks(x)
    ax2.set_xticklabels(nomes, rotation=22, ha="right", fontsize=8)
    ax2.set_ylabel("Custo (R$)")
    ax2.set_title("Custo Diário de Bombeamento")
    legenda2 = [
        mpatches.Patch(color=COR_BAIXO, label="Risco Baixo"),
        mpatches.Patch(color=COR_MEDIO, label="Risco Médio"),
        mpatches.Patch(color=COR_ALTO,  label="Risco Alto"),
    ]
    ax2.legend(handles=legenda2, fontsize=7)
    ax2.grid(axis="y", alpha=0.3)

    # ── 3) Pizza de Risco ────────────────────────────────────────────
    _, _, autotexts = ax3.pie(
        val_pizza, labels=rot_pizza, colors=cor_pizza,
        autopct="%1.1f%%", startangle=90,
        wedgeprops=dict(edgecolor="white", linewidth=1.5),
    )
    for at in autotexts:
        at.set_fontsize(8)
    ax3.set_title("Distribuição dos Níveis de Risco")

    # ── 4) Simulação 7 dias ──────────────────────────────────────────
    dias = list(range(8))
    for idx, b in enumerate(bairros):
        ax4.plot(
            dias, historico[idx],
            marker="o",
            label=b["nome"],
            color=PALETA_LINHAS[idx % len(PALETA_LINHAS)],
            linewidth=2,
        )
    ax4.set_xticks(dias)
    ax4.set_xticklabels(["Inicial"] + [f"Dia {d}" for d in range(1, 8)])
    ax4.set_ylabel("Volume disponível (m³)")
    ax4.set_title("Simulação – Evolução do Volume nos Reservatórios (7 dias)")
    ax4.legend(loc="upper right", fontsize=8)
    ax4.grid(alpha=0.3)

    fig.tight_layout()
    fig.savefig("graficos_completos.png", dpi=130, bbox_inches="tight")
    plt.close(fig)
    print("  ✔ Gráfico unificado salvo: graficos_completos.png")


# ═══════════════════════════════════════════════════════════════
#  PROGRAMA PRINCIPAL
# ═══════════════════════════════════════════════════════════════

def main():
    random.seed()   # semente aleatória baseada no tempo

    # 1. Coleta de dados
    bairros = coletar_dados()

    # 2. Tabela de resultados
    imprimir_tabela(bairros)

    # 3. Gráficos básicos (demanda vs entregue, custo, distribuição de risco)
    gerar_graficos_basicos(bairros)

    # 4. Simulação de 7 dias
    historico, _ = simular_7_dias(bairros)

    # 5. Gráfico de linhas da simulação
    if MATPLOTLIB_OK:
        grafico_simulacao(bairros, historico)

    print("\n  Processamento concluído. Verifique os arquivos PNG gerados.\n")


if __name__ == "__main__":
    main()
