# -*- coding: utf-8 -*-
"""
Problema 2 (Engenharia Elétrica)
Uma empresa fabrica resistores. Suas resistências medidas em Ohms:
    R = [10, 15, 20, 25, 30]

Determine:
1. A média dos resistores
2. A média: quantos resistores tem resistência maior que 20 Ohms?
3. Quantos valores são maiores que a média (excesso)?
"""

R = [10, 15, 20, 25, 30]

# --- 1. Média ---
soma = 0
for valor in R:
    soma = soma + valor

media = soma / len(R)
print(f"Média dos resistores: {media} Ohms")

# --- 2. Quantos resistores têm resistência maior que 20 Ohms ---
contador = 0
for valor in R:
    if valor > 20:
        contador = contador + 1

print(f"Quantidade de resistores acima de 20 Ohms: {contador}")

# --- 3. Quais valores excedem a média ---
excesso = []
for valor in R:
    if valor > media:
        excesso.append(valor)

print(f"Valores acima da média: {excesso}")
