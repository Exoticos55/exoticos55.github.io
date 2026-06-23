# =============================================================
# Atividade: Problemas de outras disciplinas
# Disciplina: Cálculo
# Curso: Engenharia Elétrica
# Problema: Cálculo da Energia Dissipada por um Resistor
#           usando Integral Definida
# =============================================================
# ABORDAGEM 3 — Integração com scipy.integrate.quad
# =============================================================

import numpy as np
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


print("=" * 50)
print("ABORDAGEM 3 — scipy.integrate.quad")
print("=" * 50)

energia_quad, erro = quad(P, a, b)

print(f"Energia dissipada: {energia_quad:.6f} J")
print(f"Erro estimado:     {erro:.2e} J")
