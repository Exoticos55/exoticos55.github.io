# ============================================================
# EXERCÍCIO 3 — Otimização de Rota de Caminhão de Entrega
# Versão 1 — Básica / Didática
# ============================================================
# Conceitos usados: funções simples, math, listas, loops for,
# comparações if/else. Ideal para quem está aprendendo Python.
# ============================================================

import math

# --- Dados de entrada ---
pontos_entrega = [(2, 3), (5, 1), (8, 6), (4, 9), (7, 2), (1, 7), (6, 5)]

CONSUMO = 0.35   # litros por km
TANQUE  = 80.0   # capacidade máxima em litros


# ------------------------------------------------------------
# Funções auxiliares
# ------------------------------------------------------------

def distancia(ponto_a, ponto_b):
    """Calcula a distância euclidiana entre dois pontos (x, y)."""
    dx = ponto_b[0] - ponto_a[0]
    dy = ponto_b[1] - ponto_a[1]
    return math.sqrt(dx**2 + dy**2)


# ------------------------------------------------------------
# (a) Distância seguindo a ordem original da lista
# ------------------------------------------------------------

def distancia_rota_original(pontos):
    """
    Percorre os pontos na ordem em que estão na lista,
    partindo da origem (0,0) e voltando à origem no final.
    """
    origem = (0, 0)
    distancia_total = 0.0

    ponto_atual = origem
    for ponto in pontos:
        d = distancia(ponto_atual, ponto)
        distancia_total += d
        ponto_atual = ponto

    # Volta à origem
    distancia_total += distancia(ponto_atual, origem)

    return distancia_total


# ------------------------------------------------------------
# (b) Algoritmo do Vizinho Mais Próximo
# ------------------------------------------------------------

def vizinho_mais_proximo(pontos):
    """
    A partir da origem, sempre visita o ponto não visitado
    mais próximo. Retorna a ordem visitada e a distância total.
    """
    origem = (0, 0)
    nao_visitados = list(pontos)   # cópia da lista original
    rota = []
    distancia_total = 0.0

    ponto_atual = origem

    while nao_visitados:
        # Encontra o ponto mais próximo do ponto atual
        mais_proximo = None
        menor_dist = float('inf')

        for ponto in nao_visitados:
            d = distancia(ponto_atual, ponto)
            if d < menor_dist:
                menor_dist = d
                mais_proximo = ponto

        # Visita o ponto mais próximo
        rota.append(mais_proximo)
        distancia_total += menor_dist
        nao_visitados.remove(mais_proximo)
        ponto_atual = mais_proximo

    # Retorna à origem
    distancia_total += distancia(ponto_atual, origem)

    return rota, distancia_total


# ------------------------------------------------------------
# (c) Comparação de consumo de combustível
# ------------------------------------------------------------

def comparar_consumo(dist_original, dist_otimizada):
    """Calcula e compara o consumo das duas rotas."""
    consumo_original  = dist_original  * CONSUMO
    consumo_otimizado = dist_otimizada * CONSUMO
    economia = consumo_original - consumo_otimizado
    return consumo_original, consumo_otimizado, economia


# ------------------------------------------------------------
# (d) Verificação de reabastecimento na rota otimizada
# ------------------------------------------------------------

def verificar_reabastecimento(rota_otimizada):
    """
    Percorre a rota otimizada verificando se o combustível
    acaba antes de terminar o trajeto.
    """
    origem = (0, 0)
    combustivel = TANQUE   # começa com tanque cheio
    paradas_reabastecimento = []

    ponto_atual = origem
    for i, ponto in enumerate(rota_otimizada):
        d = distancia(ponto_atual, ponto)
        litros_necessarios = d * CONSUMO

        if litros_necessarios > combustivel:
            paradas_reabastecimento.append(i)  # índice da entrega
            combustivel = TANQUE               # reabastece

        combustivel -= litros_necessarios
        ponto_atual = ponto

    # Verifica o trecho de volta à origem
    d_volta = distancia(ponto_atual, origem)
    if d_volta * CONSUMO > combustivel:
        paradas_reabastecimento.append("retorno")
        combustivel = TANQUE

    combustivel -= d_volta * CONSUMO

    return paradas_reabastecimento, combustivel


# ============================================================
# PROGRAMA PRINCIPAL
# ============================================================

print("=" * 55)
print("   EXERCÍCIO 3 — ROTA DE CAMINHÃO DE ENTREGA")
print("   Versão 1 — Didática")
print("=" * 55)

print("\nPontos de entrega:", pontos_entrega)
print(f"Consumo: {CONSUMO} L/km  |  Tanque: {TANQUE} L\n")

# --- (a) Rota original ---
dist_orig = distancia_rota_original(pontos_entrega)
print(f"(a) Distância — Rota Original: {dist_orig:.2f} km")

# --- (b) Rota otimizada ---
rota_otim, dist_otim = vizinho_mais_proximo(pontos_entrega)
print(f"\n(b) Rota Otimizada (vizinho mais próximo):")
print(f"    Ordem visitada: {rota_otim}")
print(f"    Distância total: {dist_otim:.2f} km")

# --- (c) Consumo ---
cons_orig, cons_otim, economia = comparar_consumo(dist_orig, dist_otim)
print(f"\n(c) Comparação de Consumo:")
print(f"    Rota original : {cons_orig:.2f} L")
print(f"    Rota otimizada: {cons_otim:.2f} L")
print(f"    Economia      : {economia:.2f} L  "
      f"({economia / cons_orig * 100:.1f}%)")

# --- (d) Reabastecimento ---
paradas, combustivel_final = verificar_reabastecimento(rota_otim)
print(f"\n(d) Verificação de Reabastecimento:")
if not paradas:
    print("    ✔ O caminhão completa a rota sem precisar reabastecer.")
    print(f"    Combustível restante ao final: {combustivel_final:.2f} L")
else:
    print(f"    ✘ O caminhão precisa reabastecer {len(paradas)} vez(es).")
    print(f"    Pontos de reabastecimento: {paradas}")

print("\n" + "=" * 55)
