# ============================================================
# EXERCÍCIO 3 — Otimização de Rota de Caminhão de Entrega
# Versão 3 — Avançada / Profissional
# ============================================================
# Conceitos usados: Programação Orientada a Objetos completa,
# classes com métodos especiais, enums, properties, exceções
# customizadas, logging, geração de relatório em texto,
# visualização ASCII do mapa, comparação extensiva de rotas.
# ============================================================

import math
import logging
from dataclasses import dataclass, field
from enum import Enum, auto
from typing import List, Tuple, Optional, Iterator
from copy import deepcopy

# ── Logging ──────────────────────────────────────────────────
logging.basicConfig(
    level=logging.INFO,
    format="%(levelname)s | %(message)s"
)
log = logging.getLogger(__name__)


# ============================================================
# Exceções customizadas
# ============================================================

class RotaInvalidaError(Exception):
    """Levantada quando a lista de pontos está vazia ou inválida."""


class CombustivelInsuficienteError(Exception):
    """Levantada quando um trecho é impossível mesmo com tanque cheio."""


# ============================================================
# Enums e tipos
# ============================================================

Ponto = Tuple[float, float]

class TipoEvento(Enum):
    PARTIDA        = auto()
    ENTREGA        = auto()
    RETORNO        = auto()
    REABASTECIMENTO = auto()


class StatusRota(Enum):
    OK              = "✔ Rota viável — sem reabastecimento"
    REABASTECE      = "⛽ Rota viável — com reabastecimento(s)"
    IMPOSSIVEL      = "✘ Trecho impossível mesmo com tanque cheio"


# ============================================================
# Dados imutáveis de configuração
# ============================================================

@dataclass(frozen=True)
class EspecificacoesCaminhao:
    consumo_l_km: float      = 0.35
    capacidade_tanque: float = 80.0
    modelo: str              = "Caminhão Padrão"

    def autonomia_maxima(self) -> float:
        """Distância máxima com tanque cheio (km)."""
        return self.capacidade_tanque / self.consumo_l_km

    def litros_para(self, km: float) -> float:
        return km * self.consumo_l_km


# ============================================================
# Evento de percurso
# ============================================================

@dataclass
class EventoPercurso:
    tipo: TipoEvento
    ponto_destino: Ponto
    distancia_trecho_km: float
    combustivel_antes_l: float
    combustivel_depois_l: float
    numero_entrega: Optional[int] = None   # índice na rota

    @property
    def litros_consumidos(self) -> float:
        if self.tipo == TipoEvento.REABASTECIMENTO:
            return 0.0
        return self.combustivel_antes_l - self.combustivel_depois_l

    def __str__(self) -> str:
        icones = {
            TipoEvento.PARTIDA:         "🚚",
            TipoEvento.ENTREGA:         "📦",
            TipoEvento.RETORNO:         "🏁",
            TipoEvento.REABASTECIMENTO: "⛽",
        }
        ic = icones[self.tipo]
        if self.tipo == TipoEvento.REABASTECIMENTO:
            return (f"  {ic} REABASTECIMENTO em {self.ponto_destino}  "
                    f"({self.combustivel_antes_l:.1f} → "
                    f"{self.combustivel_depois_l:.1f} L)")
        return (f"  {ic} [{self.tipo.name:<8}] "
                f"→ {str(self.ponto_destino):<14} "
                f"{self.distancia_trecho_km:6.2f} km  "
                f"| {self.combustivel_depois_l:5.2f} L restantes")


# ============================================================
# Classe Rota
# ============================================================

@dataclass
class Rota:
    nome: str
    pontos: List[Ponto]
    origem: Ponto = field(default_factory=lambda: (0.0, 0.0))

    # Calculados automaticamente
    _distancia: float = field(init=False, default=0.0)
    _sequencia_completa: List[Ponto] = field(init=False, default_factory=list)

    def __post_init__(self):
        if not self.pontos:
            raise RotaInvalidaError("A rota deve ter ao menos um ponto de entrega.")
        self._sequencia_completa = [self.origem] + self.pontos + [self.origem]
        self._distancia = self._calcular_distancia()

    # ── Propriedades ────────────────────────────────────────

    @property
    def distancia_km(self) -> float:
        return round(self._distancia, 4)

    @property
    def num_entregas(self) -> int:
        return len(self.pontos)

    @property
    def sequencia_completa(self) -> List[Ponto]:
        return list(self._sequencia_completa)

    # ── Métodos privados ────────────────────────────────────

    def _calcular_distancia(self) -> float:
        return sum(
            _dist_euclid(self._sequencia_completa[i], self._sequencia_completa[i + 1])
            for i in range(len(self._sequencia_completa) - 1)
        )

    # ── Representação ───────────────────────────────────────

    def __repr__(self) -> str:
        return f"Rota('{self.nome}', {self.num_entregas} entregas, {self.distancia_km:.2f} km)"

    def __lt__(self, other: "Rota") -> bool:
        return self.distancia_km < other.distancia_km


# ============================================================
# Calculadora de rotas
# ============================================================

class CalculadoraRota:
    """Encapsula os algoritmos de roteamento."""

    ORIGEM: Ponto = (0.0, 0.0)

    @staticmethod
    def rota_original(pontos: List[Ponto]) -> Rota:
        """(a) Rota na ordem original da lista."""
        log.info("Calculando rota original (%d pontos)...", len(pontos))
        return Rota(nome="Rota Original", pontos=list(pontos))

    @staticmethod
    def vizinho_mais_proximo(pontos: List[Ponto]) -> Rota:
        """(b) Heurística greedy: sempre visita o ponto mais próximo."""
        log.info("Executando heurística do vizinho mais próximo...")
        nao_visitados = list(pontos)
        rota_ordenada: List[Ponto] = []
        atual = CalculadoraRota.ORIGEM

        while nao_visitados:
            proximo = min(nao_visitados, key=lambda p: _dist_euclid(atual, p))
            rota_ordenada.append(proximo)
            nao_visitados.remove(proximo)
            atual = proximo

        return Rota(nome="Rota Otimizada (Vizinho Mais Próximo)", pontos=rota_ordenada)


# ============================================================
# Simulador de percurso
# ============================================================

class SimuladorPercurso:
    """
    Simula o percurso trecho a trecho, controlando o nível
    de combustível e registrando todos os eventos.
    """

    def __init__(self, specs: EspecificacoesCaminhao):
        self.specs = specs

    def simular(self, rota: Rota) -> List[EventoPercurso]:
        """Retorna a lista cronológica de eventos do percurso."""
        eventos: List[EventoPercurso] = []
        combustivel = self.specs.capacidade_tanque
        atual = rota.origem

        # Evento de partida
        eventos.append(EventoPercurso(
            tipo=TipoEvento.PARTIDA,
            ponto_destino=atual,
            distancia_trecho_km=0.0,
            combustivel_antes_l=combustivel,
            combustivel_depois_l=combustivel,
        ))

        sequencia = list(enumerate(rota.pontos, start=1)) + [(None, rota.origem)]

        for num, ponto in sequencia:
            trecho = _dist_euclid(atual, ponto)
            litros = self.specs.litros_para(trecho)

            # Verifica se é impossível mesmo com tanque cheio
            if litros > self.specs.capacidade_tanque:
                raise CombustivelInsuficienteError(
                    f"Trecho {atual} → {ponto} ({trecho:.2f} km) exige "
                    f"{litros:.2f} L, mas o tanque suporta apenas "
                    f"{self.specs.capacidade_tanque:.1f} L."
                )

            # Reabastece se necessário
            if litros > combustivel:
                comb_antes = combustivel
                combustivel = self.specs.capacidade_tanque
                eventos.append(EventoPercurso(
                    tipo=TipoEvento.REABASTECIMENTO,
                    ponto_destino=atual,
                    distancia_trecho_km=0.0,
                    combustivel_antes_l=round(comb_antes, 4),
                    combustivel_depois_l=round(combustivel, 4),
                ))

            comb_antes = combustivel
            combustivel -= litros
            tipo = TipoEvento.RETORNO if ponto == rota.origem else TipoEvento.ENTREGA

            eventos.append(EventoPercurso(
                tipo=tipo,
                ponto_destino=ponto,
                distancia_trecho_km=round(trecho, 4),
                combustivel_antes_l=round(comb_antes, 4),
                combustivel_depois_l=round(combustivel, 4),
                numero_entrega=num,
            ))
            atual = ponto

        return eventos

    def status(self, eventos: List[EventoPercurso]) -> StatusRota:
        reabs = [e for e in eventos if e.tipo == TipoEvento.REABASTECIMENTO]
        if not reabs:
            return StatusRota.OK
        return StatusRota.REABASTECE


# ============================================================
# Comparador de rotas
# ============================================================

@dataclass
class ComparativoRotas:
    rota_a: Rota
    rota_b: Rota
    specs: EspecificacoesCaminhao

    @property
    def economia_km(self) -> float:
        return round(self.rota_a.distancia_km - self.rota_b.distancia_km, 4)

    @property
    def economia_litros(self) -> float:
        return round(
            self.specs.litros_para(self.rota_a.distancia_km)
            - self.specs.litros_para(self.rota_b.distancia_km),
            4
        )

    @property
    def economia_pct(self) -> float:
        base = self.specs.litros_para(self.rota_a.distancia_km)
        return round((self.economia_litros / base) * 100, 2)

    @property
    def melhor(self) -> Rota:
        return self.rota_b if self.rota_b < self.rota_a else self.rota_a


# ============================================================
# Visualizador ASCII
# ============================================================

class MapaASCII:
    """Renderiza o mapa cartesiano em caracteres ASCII."""

    def __init__(self, largura: int = 30, altura: int = 15):
        self.largura = largura
        self.altura  = altura

    def renderizar(self, rota: Rota, titulo: str = "") -> str:
        pontos = rota.pontos
        if not pontos:
            return "(sem pontos)"

        xs = [p[0] for p in pontos] + [0]
        ys = [p[1] for p in pontos] + [0]
        x_min, x_max = min(xs), max(xs)
        y_min, y_max = min(ys), max(ys)

        def normalizar(px, py):
            nx = int((px - x_min) / max(x_max - x_min, 1) * (self.largura - 1))
            ny = int((py - y_min) / max(y_max - y_min, 1) * (self.altura - 1))
            return nx, self.altura - 1 - ny   # inverte Y para exibição

        grade = [["·"] * self.largura for _ in range(self.altura)]

        # Plota pontos de entrega
        for i, p in enumerate(pontos):
            cx, cy = normalizar(*p)
            grade[cy][cx] = str((i + 1) % 10)   # dígito do ponto

        # Plota origem
        ox, oy = normalizar(0, 0)
        grade[oy][ox] = "O"

        linhas = [f"  ┌{'─' * self.largura}┐"]
        if titulo:
            linhas.insert(0, f"  {titulo}")
        for linha in grade:
            linhas.append("  │" + "".join(linha) + "│")
        linhas.append(f"  └{'─' * self.largura}┘")
        linhas.append(f"  O = Origem  |  1–{len(pontos)} = entregas (ordem de visita)")
        return "\n".join(linhas)


# ============================================================
# Gerador de relatório
# ============================================================

class RelatorioRota:
    """Compõe e imprime o relatório completo."""

    SEP  = "═" * 60
    SEP2 = "─" * 60

    def __init__(
        self,
        specs: EspecificacoesCaminhao,
        rota_orig: Rota,
        rota_otim: Rota,
        eventos: List[EventoPercurso],
        comparativo: ComparativoRotas,
    ):
        self.specs       = specs
        self.rota_orig   = rota_orig
        self.rota_otim   = rota_otim
        self.eventos     = eventos
        self.comp        = comparativo
        self.simulador   = SimuladorPercurso(specs)
        self.status      = self.simulador.status(eventos)

    def imprimir(self) -> None:
        self._cabecalho()
        self._secao_a()
        self._secao_b()
        self._secao_c()
        self._secao_d()
        self._rodape()

    # ── Seções ──────────────────────────────────────────────

    def _cabecalho(self):
        print(self.SEP)
        print(f"  EXERCÍCIO 3 — ROTA DE CAMINHÃO DE ENTREGA")
        print(f"  Versão 3 — Avançada / Profissional")
        print(self.SEP)
        print(f"  Veículo  : {self.specs.modelo}")
        print(f"  Consumo  : {self.specs.consumo_l_km} L/km")
        print(f"  Tanque   : {self.specs.capacidade_tanque} L  "
              f"(autonomia máx.: {self.specs.autonomia_maxima():.1f} km)")
        print(f"  Entregas : {self.rota_orig.num_entregas} pontos\n")

    def _secao_a(self):
        print(self.SEP2)
        print("  (a) ROTA ORIGINAL")
        print(self.SEP2)
        print(f"  Ordem   : {self.rota_orig.pontos}")
        print(f"  Distância : {self.rota_orig.distancia_km:.2f} km")
        print(f"  Consumo   : {self.specs.litros_para(self.rota_orig.distancia_km):.2f} L\n")

    def _secao_b(self):
        mapa = MapaASCII()
        print(self.SEP2)
        print("  (b) ROTA OTIMIZADA — Vizinho Mais Próximo")
        print(self.SEP2)
        print(f"  Ordem   : {self.rota_otim.pontos}")
        print(f"  Distância : {self.rota_otim.distancia_km:.2f} km")
        print(f"  Consumo   : {self.specs.litros_para(self.rota_otim.distancia_km):.2f} L")
        print()
        print(mapa.renderizar(self.rota_otim, titulo="  Mapa — Rota Otimizada"))
        print()

    def _secao_c(self):
        print(self.SEP2)
        print("  (c) COMPARAÇÃO DE CONSUMO")
        print(self.SEP2)

        col = 28
        print(f"  {'Métrica':<{col}} {'Orig':>10}  {'Otim':>10}  {'Δ':>10}")
        print(f"  {'─'*col} {'─'*10}  {'─'*10}  {'─'*10}")

        d_orig = self.rota_orig.distancia_km
        d_otim = self.rota_otim.distancia_km
        c_orig = self.specs.litros_para(d_orig)
        c_otim = self.specs.litros_para(d_otim)

        def linha(label, v_orig, v_otim, unidade):
            delta = v_orig - v_otim
            print(f"  {label:<{col}} {v_orig:>9.2f}{unidade}  "
                  f"{v_otim:>9.2f}{unidade}  "
                  f"{delta:>+9.2f}{unidade}")

        linha("Distância total", d_orig, d_otim, " km")
        linha("Consumo total",   c_orig, c_otim, " L ")
        print(f"\n  Economia: {self.comp.economia_litros:.2f} L  "
              f"({self.comp.economia_pct:.1f}% menos combustível)\n")

    def _secao_d(self):
        reabs = [e for e in self.eventos if e.tipo == TipoEvento.REABASTECIMENTO]
        ultimo = next(
            (e for e in reversed(self.eventos)
             if e.tipo in (TipoEvento.RETORNO, TipoEvento.ENTREGA)),
            None
        )

        print(self.SEP2)
        print("  (d) SIMULAÇÃO DO PERCURSO — ROTA OTIMIZADA")
        print(self.SEP2)
        for e in self.eventos:
            if e.tipo != TipoEvento.PARTIDA:
                print(e)
        print()
        print(f"  Status do percurso : {self.status.value}")
        if reabs:
            print(f"  Reabastecimentos   : {len(reabs)}")
        if ultimo:
            print(f"  Combustível final  : {ultimo.combustivel_depois_l:.2f} L")
        print()

    def _rodape(self):
        print(self.SEP)
        print(f"  Rota recomendada: {self.comp.melhor.nome}")
        print(self.SEP)


# ============================================================
# Funções utilitárias
# ============================================================

def _dist_euclid(a: Ponto, b: Ponto) -> float:
    return math.sqrt((b[0] - a[0])**2 + (b[1] - a[1])**2)


# ============================================================
# PROGRAMA PRINCIPAL
# ============================================================

def main():
    # Dados de entrada
    pontos: List[Ponto] = [
        (2, 3), (5, 1), (8, 6), (4, 9), (7, 2), (1, 7), (6, 5)
    ]
    specs = EspecificacoesCaminhao(
        consumo_l_km=0.35,
        capacidade_tanque=80.0,
        modelo="VW Delivery 11.180"
    )

    try:
        # Calcula as rotas
        calc     = CalculadoraRota()
        rota_orig = calc.rota_original(pontos)
        rota_otim = calc.vizinho_mais_proximo(pontos)

        # Simula o percurso otimizado
        sim    = SimuladorPercurso(specs)
        eventos = sim.simular(rota_otim)

        # Compara
        comp = ComparativoRotas(rota_orig, rota_otim, specs)

        # Gera e imprime o relatório
        relatorio = RelatorioRota(specs, rota_orig, rota_otim, eventos, comp)
        relatorio.imprimir()

    except RotaInvalidaError as e:
        log.error("Rota inválida: %s", e)
    except CombustivelInsuficienteError as e:
        log.error("Combustível insuficiente: %s", e)


if __name__ == "__main__":
    main()
