# -*- coding: utf-8 -*-
"""
Problema 7 (Engenharia Elétrica)
Uma linha de transmissão possui medições de tensão (em volts)
registradas ao longo do dia:
    V = [200, 215, 230, 225, 210, 205, 240]

Determine:
1. A média das medições
2. A maior tensão registrada
3. Quantas medições estão abaixo de 220 V
"""

V = [200, 215, 230, 225, 210, 205, 240]

soma = 0
maior = V[0]
contador = 0

for i in range(len(V)):
    soma = soma + V[i]

    if V[i] > maior:
        maior = V[i]

    if V[i] < 220:
        contador = contador + 1

media = soma / len(V)

print(f"Média das medições: {media:.2f} V")
print(f"Maior tensão registrada: {maior} V")
print(f"Quantidade de medições abaixo de 220 V: {contador}")
