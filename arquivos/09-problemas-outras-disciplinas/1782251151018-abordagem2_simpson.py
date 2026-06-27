# =============================================================
# Atividade: Problemas de outras disciplinas
# Disciplina: Cálculo
# Curso: Engenharia Elétrica
# Problema: Cálculo da Energia Dissipada por um Resistor
#           usando Integral Definida
# =============================================================
# ABORDAGEM 2 — Regra de Simpson
# =============================================================

import numpy as np

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


print("=" * 50)
print("ABORDAGEM 2 — Regra de Simpson")
print("=" * 50)

n = 1000  # deve ser par
h = (b - a) / n
t_vals = np.linspace(a, b, n + 1)
p_vals = P(t_vals)

# Pesos: 1 nos extremos, 4 nos ímpares, 2 nos pares intermediários
pesos = np.ones(n + 1)
pesos[1:-1:2] = 4
pesos[2:-2:2] = 2

energia_simpson = (h / 3) * np.dot(pesos, p_vals)

print(f"Energia dissipada: {energia_simpson:.6f} J")
