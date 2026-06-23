# ============================================================
# EXERCÍCIO 3 — Otimização de Rota de Caminhão de Entrega
# Versão 2 — Intermediária
# ============================================================
# Conceitos usados: dataclasses, list comprehensions,
# enumerate, zip, f-strings avançadas, funções com retorno
# múltiplo tipado, separação clara de lógica e apresentação.
# ============================================================

import math
from dataclasses import dataclass, field
from typing import List, Tuple, Optional


# ------------------------------------------------------------
# Configuração
# ------------------------------------------------------------

@dataclass
class ConfigCaminhao:
    consumo_l_km: float = 0.35
    capacidade_tanque: float = 80.0


@dataclass
class ResultadoRota:
    nome: str
    ordem: List[Tuple[int, int]]
    distancia_km: float
    consumo_litros: float = field(init=False)

    def __post_init__(self):
        self.consumo_litros = round(self.distancia_km * 0.35, 4)


@dataclass
class EventoRota:
    tipo: str          # "entrega" ou "reabastecimento"
    ponto: Tuple[int, int]
    distancia_trecho: float
    combustivel_antes: float
    combustivel_depois: float


# ------------------------------------------------------------
# Dados de entrada
# ------------------------------------------------------------

PONTOS: List[Tuple[int, int]] = [
    (2, 3), (5, 1), (8, 6), (4, 9), (7, 2), (1, 7), (6, 5)
]
ORIGEM: Tuple[int, int] = (0, 0)
CONFIG = ConfigCaminhao()


# ------------------------------------------------------------
# Funções de cálculo
# ------------------------------------------------------------

def distancia_euclidiana(a: Tuple[int, int], b: Tuple[int, int]) -> float:
    return math.sqrt((b[0] - a[0])**2 + (b[1] - a[1])**2)


def calcular_rota_original(pontos: List[Tuple[int, int]]) -> ResultadoRota:
    """(a) Distância percorrendo os pontos na ordem original."""
    sequencia = [ORIGEM] + pontos + [ORIGEM]
    distancia = sum(
        distancia_euclidiana(sequencia[i], sequencia[i + 1])
        for i in range(len(sequencia) - 1)
    )
    return ResultadoRota(
        nome="Rota Original",
        ordem=pontos,
        distancia_km=round(distancia, 4)
    )


def calcular_vizinho_mais_proximo(pontos: List[Tuple[int, int]]) -> ResultadoRota:
    """(b) Algoritmo do vizinho mais próximo a partir da origem."""
    nao_visitados = list(pontos)
    rota: List[Tuple[int, int]] = []
    atual = ORIGEM
    distancia_total = 0.0

    while nao_visitados:
        # Seleciona o ponto mais próximo usando min() com key
        proximo = min(nao_visitados, key=lambda p: distancia_euclidiana(atual, p))
        distancia_total += distancia_euclidiana(atual, proximo)
        rota.append(proximo)
        nao_visitados.remove(proximo)
        atual = proximo

    distancia_total += distancia_euclidiana(atual, ORIGEM)

    return ResultadoRota(
        nome="Rota Otimizada (Vizinho Mais Próximo)",
        ordem=rota,
        distancia_km=round(distancia_total, 4)
    )


def comparar_rotas(r1: ResultadoRota, r2: ResultadoRota) -> dict:
    """(c) Compara consumo entre duas rotas."""
    economia_litros = r1.consumo_litros - r2.consumo_litros
    economia_pct    = (economia_litros / r1.consumo_litros) * 100
    return {
        "economia_litros": round(economia_litros, 4),
        "economia_pct":    round(economia_pct, 2),
        "dist_economizada": round(r1.distancia_km - r2.distancia_km, 4),
    }


def simular_viagem(rota: ResultadoRota) -> List[EventoRota]:
    """
    (d) Simula o percurso trecho a trecho, registrando
    reabastecimentos quando o combustível é insuficiente.
    """
    eventos: List[EventoRota] = []
    combustivel = CONFIG.capacidade_tanque
    atual = ORIGEM

    # Inclui retorno à origem como último "ponto"
    sequencia = rota.ordem + [ORIGEM]

    for ponto in sequencia:
        trecho = distancia_euclidiana(atual, ponto)
        litros_necessarios = trecho * CONFIG.consumo_l_km

        comb_antes = combustivel

        if litros_necessarios > combustivel:
            # Reabastece antes de seguir
            eventos.append(EventoRota(
                tipo="reabastecimento",
                ponto=atual,
                distancia_trecho=0.0,
                combustivel_antes=combustivel,
                combustivel_depois=CONFIG.capacidade_tanque,
            ))
            combustivel = CONFIG.capacidade_tanque
            comb_antes  = combustivel

        combustivel -= litros_necessarios

        eventos.append(EventoRota(
            tipo="entrega" if ponto != ORIGEM else "retorno",
            ponto=ponto,
            distancia_trecho=round(trecho, 4),
            combustivel_antes=round(comb_antes, 4),
            combustivel_depois=round(combustivel, 4),
        ))

        atual = ponto

    return eventos


# ------------------------------------------------------------
# Apresentação dos resultados
# ------------------------------------------------------------

def exibir_rota(resultado: ResultadoRota) -> None:
    print(f"\n{'─' * 50}")
    print(f"  {resultado.nome}")
    print(f"{'─' * 50}")
    print(f"  Ordem: {resultado.ordem}")
    print(f"  Distância total : {resultado.distancia_km:.2f} km")
    print(f"  Consumo estimado: {resultado.consumo_litros:.2f} L")


def exibir_comparacao(comp: dict) -> None:
    print(f"\n{'─' * 50}")
    print("  (c) Comparação de Consumo")
    print(f"{'─' * 50}")
    print(f"  Distância economizada : {comp['dist_economizada']:.2f} km")
    print(f"  Combustível economizado: {comp['economia_litros']:.2f} L "
          f"({comp['economia_pct']:.1f}%)")


def exibir_simulacao(eventos: List[EventoRota]) -> None:
    reabastecimentos = [e for e in eventos if e.tipo == "reabastecimento"]

    print(f"\n{'─' * 50}")
    print("  (d) Simulação do Percurso (Rota Otimizada)")
    print(f"{'─' * 50}")

    for e in eventos:
        if e.tipo == "reabastecimento":
            print(f"  ⛽ REABASTECIMENTO em {e.ponto}  "
                  f"({e.combustivel_antes:.1f} → {e.combustivel_depois:.1f} L)")
        else:
            icone = "🏁" if e.tipo == "retorno" else "📦"
            print(f"  {icone} → {str(e.ponto):<12} "
                  f"{e.distancia_trecho:5.2f} km  |  "
                  f"Comb.: {e.combustivel_depois:.2f} L restantes")

    if not reabastecimentos:
        print("\n  ✔ Rota concluída sem reabastecimento.")
    else:
        print(f"\n  ✘ {len(reabastecimentos)} reabastecimento(s) necessário(s).")


# ============================================================
# PROGRAMA PRINCIPAL
# ============================================================

def main():
    print("=" * 50)
    print("  EXERCÍCIO 3 — ROTA DE CAMINHÃO  |  Versão 2")
    print("=" * 50)
    print(f"  Pontos: {PONTOS}")
    print(f"  Consumo: {CONFIG.consumo_l_km} L/km  |  Tanque: {CONFIG.capacidade_tanque} L")

    # (a) e (b)
    rota_orig = calcular_rota_original(PONTOS)
    rota_otim = calcular_vizinho_mais_proximo(PONTOS)

    exibir_rota(rota_orig)
    exibir_rota(rota_otim)

    # (c)
    comp = comparar_rotas(rota_orig, rota_otim)
    exibir_comparacao(comp)

    # (d)
    eventos = simular_viagem(rota_otim)
    exibir_simulacao(eventos)

    print("\n" + "=" * 50)


if __name__ == "__main__":
    main()
