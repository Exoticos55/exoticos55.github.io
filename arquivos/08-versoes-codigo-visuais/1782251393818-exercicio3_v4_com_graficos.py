# ============================================================
# EXERCÍCIO 3 — Otimização de Rota de Caminhão de Entrega
# Versão 4 — Com Representação Gráfica
# ============================================================
# Esta versão mantém o cálculo das rotas e gera dois gráficos:
# 1) rota original
# 2) rota otimizada pelo vizinho mais próximo
# ============================================================

import math
import matplotlib.pyplot as plt

# Dados de entrada
PONTOS = [(2, 3), (5, 1), (8, 6), (4, 9), (7, 2), (1, 7), (6, 5)]
ORIGEM = (0, 0)
CONSUMO = 0.35   # L/km
TANQUE = 80.0    # litros


def distancia(a, b):
    """Calcula a distância euclidiana entre dois pontos."""
    return math.sqrt((b[0] - a[0])**2 + (b[1] - a[1])**2)


def distancia_rota_original(pontos):
    """Calcula a distância total seguindo a ordem original."""
    rota_completa = [ORIGEM] + pontos + [ORIGEM]
    total = 0

    for i in range(len(rota_completa) - 1):
        total += distancia(rota_completa[i], rota_completa[i + 1])

    return total


def vizinho_mais_proximo(pontos):
    """Aplica o algoritmo do vizinho mais próximo."""
    nao_visitados = pontos.copy()
    rota = []
    atual = ORIGEM
    total = 0

    while nao_visitados:
        proximo = min(nao_visitados, key=lambda p: distancia(atual, p))
        total += distancia(atual, proximo)
        rota.append(proximo)
        nao_visitados.remove(proximo)
        atual = proximo

    total += distancia(atual, ORIGEM)
    return rota, total


def consumo_combustivel(distancia_total):
    """Calcula o consumo de combustível em litros."""
    return distancia_total * CONSUMO


def precisa_reabastecer(distancia_otimizada):
    """Verifica se o tanque cheio é suficiente para a rota otimizada."""
    consumo_total = consumo_combustivel(distancia_otimizada)
    return consumo_total > TANQUE


def plotar_rota(pontos, titulo, nome_arquivo):
    """Gera o gráfico da rota e salva como imagem PNG."""
    rota_completa = [ORIGEM] + pontos + [ORIGEM]
    xs = [p[0] for p in rota_completa]
    ys = [p[1] for p in rota_completa]

    plt.figure(figsize=(8, 6))
    plt.plot(xs, ys, marker="o")
    plt.scatter([ORIGEM[0]], [ORIGEM[1]], s=120, label="Origem")

    for i, ponto in enumerate(pontos, start=1):
        plt.text(ponto[0] + 0.1, ponto[1] + 0.1, str(i), fontsize=10)

    plt.title(titulo)
    plt.xlabel("Coordenada X (km)")
    plt.ylabel("Coordenada Y (km)")
    plt.grid(True)
    plt.legend()
    plt.savefig(nome_arquivo, dpi=300, bbox_inches="tight")
    plt.show()


# ============================================================
# PROGRAMA PRINCIPAL
# ============================================================

# (a) rota original
Dist_original = distancia_rota_original(PONTOS)

# (b) rota otimizada
rota_otimizada, dist_otimizada = vizinho_mais_proximo(PONTOS)

# (c) comparação de consumo
consumo_original = consumo_combustivel(Dist_original)
consumo_otimizado = consumo_combustivel(dist_otimizada)
economia_litros = consumo_original - consumo_otimizado
economia_porcentagem = (economia_litros / consumo_original) * 100

# (d) reabastecimento
reabastece = precisa_reabastecer(dist_otimizada)
combustivel_final = TANQUE - consumo_otimizado

print("=" * 60)
print("EXERCÍCIO 3 — OTIMIZAÇÃO DE ROTA DE CAMINHÃO")
print("=" * 60)

print("\nPontos de entrega:", PONTOS)

print("\n(a) Rota original")
print("Ordem:", PONTOS)
print(f"Distância total: {Dist_original:.2f} km")
print(f"Consumo: {consumo_original:.2f} L")

print("\n(b) Rota otimizada — vizinho mais próximo")
print("Nova ordem:", rota_otimizada)
print(f"Distância total: {dist_otimizada:.2f} km")
print(f"Consumo: {consumo_otimizado:.2f} L")

print("\n(c) Comparação")
print(f"Economia de distância: {Dist_original - dist_otimizada:.2f} km")
print(f"Economia de combustível: {economia_litros:.2f} L")
print(f"Redução percentual: {economia_porcentagem:.2f}%")

print("\n(d) Reabastecimento")
if reabastece:
    print("O caminhão precisa reabastecer durante a rota otimizada.")
else:
    print("O caminhão NÃO precisa reabastecer durante a rota otimizada.")
    print(f"Combustível restante ao final: {combustivel_final:.2f} L")

# Representações gráficas
plotar_rota(PONTOS, "Rota Original", "/mnt/data/rota_original.png")
plotar_rota(rota_otimizada, "Rota Otimizada — Vizinho Mais Próximo", "/mnt/data/rota_otimizada.png")
