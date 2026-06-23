# =============================================================
# Atividade: Problemas de outras disciplinas
# Disciplina: Cálculo
# Curso: Engenharia Elétrica
# Problema: Cálculo da Energia Dissipada por um Resistor
#           usando Integral Definida
# =============================================================
# ABORDAGEM 1 — Soma de Riemann (Regra do Ponto Médio)
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
print("ABORDAGEM 1 — Soma de Riemann (Ponto Médio)")
print("=" * 50)

n = 1000          # número de subdivisões
h = (b - a) / n   # tamanho de cada subintervalo

energia_riemann = 0.0
for i in range(n):
    t_meio = a + (i + 0.5) * h      # ponto médio do subintervalo
    energia_riemann += P(t_meio) * h # área do retângulo

print(f"Energia dissipada: {energia_riemann:.6f} J")
