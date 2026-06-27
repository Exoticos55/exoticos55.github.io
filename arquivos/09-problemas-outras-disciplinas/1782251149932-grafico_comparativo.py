# =============================================================
# Atividade: Problemas de outras disciplinas
# Disciplina: Cálculo
# Curso: Engenharia Elétrica
# Problema: Cálculo da Energia Dissipada por um Resistor
#           usando Integral Definida
# =============================================================
# GRÁFICO E RESUMO COMPARATIVO
# =============================================================

import numpy as np
import matplotlib.pyplot as plt
from scipy.integrate import quad

# --- Parâmetros globais ---
V0    = 10.0
f     = 60.0
omega = 2 * np.pi * f
R     = 5.0
a     = 0.0
b     = 1.0 / 60.0

# Função de potência
def P(t):
    return (V0 * np.sin(omega * t))**2 / R


# --- Recalcula os três métodos para o resumo ---

# Abordagem 1 — Soma de Riemann
n = 1000
h = (b - a) / n
energia_riemann = sum(P(a + (i + 0.5) * h) * h for i in range(n))

# Abordagem 2 — Regra de Simpson
t_vals = np.linspace(a, b, n + 1)
p_vals = P(t_vals)
pesos = np.ones(n + 1)
pesos[1:-1:2] = 4
pesos[2:-2:2] = 2
energia_simpson = (h / 3) * np.dot(pesos, p_vals)

# Abordagem 3 — scipy quad
energia_quad, _ = quad(P, a, b)

# Valor analítico exato
energia_analitica = (V0**2 / R) * (b - a) / 2

# --- Resumo ---
print("=" * 50)
print("RESUMO COMPARATIVO")
print("=" * 50)
print(f"Soma de Riemann:   {energia_riemann:.6f} J")
print(f"Regra de Simpson:  {energia_simpson:.6f} J")
print(f"scipy quad:        {energia_quad:.6f} J")
print(f"Valor analítico:   {energia_analitica:.6f} J")

# --- Gráfico ---
t_plot = np.linspace(a, b, 1000)

plt.figure(figsize=(9, 5))
plt.plot(t_plot, P(t_plot), color="royalblue", linewidth=2, label="P(t) = [V₀·sen(ωt)]² / R")
plt.fill_between(t_plot, P(t_plot), alpha=0.25, color="royalblue", label=f"Energia ≈ {energia_quad:.4f} J")
plt.xlabel("Tempo (s)", fontsize=12)
plt.ylabel("Potência (W)", fontsize=12)
plt.title("Potência Instantânea Dissipada no Resistor\nEnergia = Área sob a curva", fontsize=13)
plt.legend(fontsize=11)
plt.grid(True, linestyle="--", alpha=0.6)
plt.tight_layout()
plt.show()
