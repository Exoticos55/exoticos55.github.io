# -*- coding: utf-8 -*-
"""
Lista Consolidada de Exercícios de Algoritmos - Engenharia
Este arquivo contém os enunciados, pseudocódigos e implementações em Python de 10 exercícios.
"""

import math

# ==============================================================================
# ENGENHARIA ELÉTRICA
# ==============================================================================

def exercicio_1():
    print("\n--- Exercício 1: Análise de Carga e Fator de Potência ---")
    """
    Enunciado: Um engenheiro eletricista precisa avaliar a eficiência energética de uma fábrica. 
    O algoritmo deve receber a potência ativa (kW) e a potência reativa (kvar) consumidas por uma máquina, 
    calcular o fator de potência (FP) e emitir um alerta caso o FP esteja abaixo do limite 
    regulamentado de 0.92, sugerindo a necessidade de um banco de capacitores.
    
    Pseudocódigo:
    Algoritmo AnaliseFatorPotencia
    Var
        potAtiva, potReativa, potAparente, FP : Real
    Inicio
        Escreva("Digite a potência ativa (kW): ")
        Leia(potAtiva)
        Escreva("Digite a potência reativa (kvar): ")
        Leia(potReativa)
        potAparente <- RaizQuadrada((potAtiva * potAtiva) + (potReativa * potReativa))
        Se potAparente > 0 Entao
            FP <- potAtiva / potAparente
            Escreva("Fator de Potência Calculado: ", FP)
            Se FP < 0.92 Entao
                Escreva("Alerta: Fator de potência abaixo de 0.92! Instalar banco de capacitores.")
            Senao
                Escreva("Fator de potência adequado.")
            FimSe
        Senao
            Escreva("Erro: Potência aparente não pode ser zero.")
        FimSe
    FimAlgoritmo
    """
    try:
        pot_ativa = float(input("Digite a potência ativa (kW): "))
        pot_reativa = float(input("Digite a potência reativa (kvar): "))
        pot_aparente = math.sqrt((pot_ativa ** 2) + (pot_reativa ** 2))
        
        if pot_aparente > 0:
            fp = pot_ativa / pot_aparente
            print(f"Fator de Potência Calculado: {fp:.3f}")
            if fp < 0.92:
                print("Alerta: Fator de potência abaixo de 0.92! Instalar banco de capacitores.")
            else:
                print("Fator de potência adequado.")
        else:
            print("Erro: Potência aparente não pode ser zero.")
    except ValueError:
        print("Erro: Insira valores numéricos válidos.")


def exercicio_2():
    print("\n--- Exercício 2: Cálculo de Queda de Tensão em Condutores ---")
    """
    Enunciado: No dimensionamento de circuitos elétricos prediais e industriais, a queda de tensão máxima 
    permitida por norma não deve ultrapassar 4%. Crie um algoritmo que leia a corrente do circuito (A), 
    o comprimento do cabo (m), a tensão nominal da rede (V) e a seção transversal do condutor (mm²), 
    calculando a queda de tensão e verificando a conformidade regulamentar. Considere a resistividade do cobre = 0.0172.
    
    Pseudocódigo:
    Algoritmo QuedaTensao
    Var
        corrente, comprimento, tensaoNominal, secao, quedaVolt, quedaPercent : Real
        RESISTIVIDADE : Real
    Inicio
        RESISTIVIDADE <- 0.0172
        Escreva("Digite a corrente (A): ")
        Leia(corrente)
        Escreva("Digite o comprimento do circuito (m): ")
        Leia(comprimento)
        Escreva("Digite a tensão nominal da rede (V): ")
        Leia(tensaoNominal)
        Escreva("Digite a seção do condutor (mm2): ")
        Leia(secao)
        quedaVolt <- (2 * RESISTIVIDADE * comprimento * corrente) / secao
        quedaPercent <- (quedaVolt / tensaoNominal) * 100
        Escreva("Queda de tensão: ", quedaVolt, " V (", quedaPercent, "%)")
        Se quedaPercent > 4.0 Entao
            Escreva("Inadequado! Aumente a seção transversal do condutor.")
        Senao
            Escreva("Circuito em conformidade com as normas.")
        FimSe
    FimAlgoritmo
    """
    RESISTIVIDADE_COBRE = 0.0172
    try:
        corrente = float(input("Digite a corrente (A): "))
        comprimento = float(input("Digite o comprimento do circuito (m): "))
        tensao_nominal = float(input("Digite a tensão nominal da rede (V): "))
        secao = float(input("Digite a seção do condutor (mm²): "))
        
        queda_v = (2 * RESISTIVIDADE_COBRE * comprimento * corrente) / secao
        queda_p = (queda_v / tensao_nominal) * 100
        
        print(f"Queda de tensão: {queda_v:.2f} V ({queda_p:.2f}%)")
        if queda_p > 4.0:
            print("Inadequado! Aumente a seção transversal do condutor.")
        else:
            print("Circuito em conformidade com as normas.")
    except ValueError:
        print("Erro: Entrada de dados inválida.")


def exercicio_3():
    print("\n--- Exercício 3: Sistema de Proteção de Sobrecorrente ---")
    """
    Enunciado: Um relé microprocessado monitora em tempo real a corrente nominal que flui para um transformador. 
    Se a corrente medida exceder a corrente nominal estipulada em mais de 10% de forma sustentada por 3 leituras 
    consecutivas, o algoritmo deve simular o desarme automático do disjuntor principal.
    
    Pseudocódigo:
    Algoritmo ProtecaoDisjuntor
    Var
        correnteNominal, correnteMedida : Real
        leiturasAcima, i : Inteiro
    Inicio
        Escreva("Defina a corrente nominal do transformador (A): ")
        Leia(correnteNominal)
        leiturasAcima <- 0
        Para i de 1 Ate 5 Faca
            Escreva("Digite a leitura atual da corrente (A): ")
            Leia(correnteMedida)
            Se correnteMedida > (correnteNominal * 1.10) Entao
                leiturasAcima <- leiturasAcima + 1
            Senao
                leiturasAcima <- 0
            FimSe
            Se leiturasAcima >= 3 Entao
                Escreva("EMERGÊNCIA! SOBRECORRENTE DETECTADA. DISJUNTOR DESARMADO!")
                Interromper
            FimSe
        FimPara
    FimAlgoritmo
    """
    try:
        corrente_nominal = float(input("Defina a corrente nominal do transformador (A): "))
        leituras_acima = 0
        desarmado = False
        
        for i in range(1, 6):
            corrente_medida = float(input(f"Leitura {i} - Digite a corrente atual (A): "))
            if corrente_medida > (corrente_nominal * 1.10):
                leituras_acima += 1
            else:
                leituras_acima = 0
            
            if leituras_acima >= 3:
                print("EMERGÊNCIA! SOBRECORRENTE DETECTADA. DISJUNTOR DESARMADO!")
                desarmado = True
                break
        if not desarmado:
            print("Operação concluída em regime seguro.")
    except ValueError:
        print("Erro: Entrada inválida.")


# ==============================================================================
# ENGENHARIA MECÂNICA
# ==============================================================================

def exercicio_4():
    print("\n--- Exercício 4: Verificação de Segurança Estrutural ---")
    """
    Enunciado: No desenvolvimento mecânico de eixos estruturais, garante-se que a tensão de tração atuante não 
    ultrapasse a tensão de escoamento admissível do material. O programa calcula a tensão mecânica atuante e 
    verifica se o fator de segurança estrutural mínimo é de 2.0.
    
    Pseudocódigo:
    Algoritmo SegurancaMecanica
    Var
        forca, diametro, area, tensao, tensaoEscoamento, FS : Real
    Inicio
        Escreva("Digite a força de tração aplicada (N): ")
        Leia(forca)
        Escreva("Digite o diâmetro do eixo (mm): ")
        Leia(diametro)
        Escreva("Digite a tensão de escoamento do material (MPa): ")
        Leia(tensaoEscoamento)
        area <- (3.14159 * (diametro * diametro)) / 4.0
        tensao <- forca / area
        FS <- tensaoEscoamento / tensao
        Escreva("Tensão atuante: ", tensao, " MPa")
        Se FS >= 2.0 Entao
            Escreva("Estrutura Aprovada.")
        Senao
            Escreva("Estrutura Reprovada!")
        FimSe
    FimAlgoritmo
    """
    try:
        forca = float(input("Digite a força de tração aplicada (N): "))
        diametro = float(input("Digite o diâmetro do eixo (mm): "))
        tensao_escoamento = float(input("Digite a tensão de escoamento do material (MPa): "))
        
        area = (math.pi * (diametro ** 2)) / 4.0
        tensao_atuante = forca / area
        fs = tensao_escoamento / tensao_atuante
        
        print(f"Tensão atuante: {tensao_atuante:.2f} MPa")
        print(f"Fator de Segurança obtido: {fs:.2f}")
        
        if fs >= 2.0:
            print("Estrutura Aprovada.")
        else:
            print("Estrutura Reprovada! Risco de deformação plástica.")
    except ValueError:
        print("Erro: Entrada numérica inválida.")


def exercicio_5():
    print("\n--- Exercício 5: Eficiência Térmica do Ciclo Rankine ---")
    """
    Enunciado: Desenvolva um algoritmo que colete a entalpia do fluido de trabalho nas etapas de uma termelétrica 
    (h1: entrada turbina, h2: saída turbina, h3: entrada bomba, h4: saída bomba) para computar o rendimento térmico.
    """
    try:
        h1 = float(input("Entalpia na entrada da turbina h1 (kJ/kg): "))
        h2 = float(input("Entalpia na saída da turbina h2 (kJ/kg): "))
        h3 = float(input("Entalpia na entrada da bomba h3 (kJ/kg): "))
        h4 = float(input("Entalpia na saída da bomba h4 (kJ/kg): "))
        
        w_turbina = h1 - h2
        w_bomba = h4 - h3
        w_liquido = w_turbina - w_bomba
        q_entrada = h1 - h4
        
        if q_entrada <= 0:
            print("Erro térmico: O calor de entrada deve ser positivo.")
            return
            
        rendimento = (w_liquido / q_entrada) * 100
        print(f"Trabalho líquido útil: {w_liquido:.2f} kJ/kg")
        print(f"Rendimento térmico global: {rendimento:.2f}%")
    except ValueError:
        print("Erro: Valores inválidos.")


def exercicio_6():
    print("\n--- Exercício 6: Dimensionamento de Molas Helicoidais ---")
    """
    Enunciado: O algoritmo determina a constante elástica (k) de uma mola de suspensão automotiva recebendo o 
    diâmetro do fio (d), o diâmetro médio da bobina (D), o número de espiras ativas (N) e o módulo G.
    """
    try:
        g = float(input("Módulo de elasticidade transversal G (N/mm²): "))
        d = float(input("Diâmetro do fio d (mm): "))
        d_medio = float(input("Diâmetro médio da mola D (mm): "))
        n_espiras = float(input("Número de espiras ativas N: "))
        
        if d_medio > 0 and n_espiras > 0:
            k = (g * (d ** 4)) / (8 * (d_medio ** 3) * n_espiras)
            print(f"A constante de rigidez K da mola é de: {k:.2f} N/mm")
        else:
            print("Erro geométrico: Valores inválidos.")
    except ValueError:
        print("Erro: Dados numéricos inválidos.")


def exercicio_7():
    print("\n--- Exercício 7: Monitoramento de Desgaste de Ferramenta CNC ---")
    """
    Enunciado: Coleta o desgaste em mícrons ao final de 5 ciclos consecutivos de produção, extrai a média 
    e acusa parada obrigatória se a média ultrapassar 250 mícrons.
    """
    soma_total = 0.0
    try:
        for i in range(1, 6):
            desgaste = float(input(f"Digite o desgaste medido no ciclo {i} (mícrons): "))
            soma_total += desgaste
            
        media = soma_total / 5
        print(f"\nMédia de desgaste: {media:.1f} mícrons.")
        if media > 250:
            print("Status: ALERTA CRÍTICO! Substituição imediata recomendada.")
        else:
            print("Status: Níveis seguros de tolerância.")
    except ValueError:
        print("Erro: Dados corrompidos.")


# ==============================================================================
# ENGENHARIA DE TELECOMUNICAÇÕES
# ==============================================================================

def exercicio_8():
    print("\n--- Exercício 8: Cálculo de Orçamento de Enlace (Link Budget) ---")
    """
    Enunciado: O algoritmo calcula a potência recebida em dBm com base na potência do transmissor, ganhos, 
    perdas e atenuação no espaço livre (FSPL) por distância e frequência.
    """
    try:
        p_tx = float(input("Potência do Transmissor (dBm): "))
        g_tx = float(input("Ganho da antena Tx (dBi): "))
        g_rx = float(input("Ganho da antena Rx (dBi): "))
        perdas = float(input("Perdas em conectores/cabos (dB): "))
        distancia = float(input("Distância do enlace (km): "))
        frequencia = float(input("Frequência de operação (MHz): "))
        
        fspl = 32.44 + (20 * math.log10(distancia)) + (20 * math.log10(frequencia))
        p_rx = p_tx + g_tx + g_rx - perdas - fspl
        
        print(f"\nPerda de Espaço Livre (FSPL): {fspl:.2f} dB")
        print(f"Potência no Receptor (Prx): {p_rx:.2f} dBm")
    except ValueError:
        print("Erro: Valores inválidos.")


def exercicio_9():
    print("\n--- Exercício 9: Relação Sinal-Ruído (SNR) ---")
    """
    Enunciado: Recebe a potência do sinal e do ruído em mW, converte para dBm e apresenta a relação SNR em dB.
    """
    try:
        pot_sinal_mw = float(input("Digite a potência do sinal em mW: "))
        pot_ruido_mw = float(input("Digite a potência do ruído em mW: "))
        
        if pot_sinal_mw > 0 and pot_ruido_mw > 0:
            sinal_dbm = 10 * math.log10(pot_sinal_mw)
            ruido_dbm = 10 * math.log10(pot_ruido_mw)
            snr_db = sinal_dbm - ruido_dbm
            
            print(f"Potência do Sinal: {sinal_dbm:.2f} dBm")
            print(f"Potência do Ruído: {ruido_dbm:.2f} dBm")
            print(f"Relação Sinal-Ruído (SNR): {snr_db:.2f} dB")
        else:
            print("Erro: As potências devem ser maiores que zero.")
    except ValueError:
        print("Erro de entrada.")


def exercicio_10():
    print("\n--- Exercício 10: Validação de Endereçamento IPv4 ---")
    """
    Enunciado: Pede ao operador para digitar os 4 octetos decimais de um IPv4 e valida a classe (A, B ou C).
    """
    try:
        print("Informe os 4 octetos separadamente:")
        o1 = int(input("1º Octeto: "))
        o2 = int(input("2º Octeto: "))
        o3 = int(input("3º Octeto: "))
        o4 = int(input("4º Octeto: "))
        
        if any(o < 0 or o > 255 for o in [o1, o2, o3, o4]):
            print("Endereço IPv4 inválido fora dos limites [0-255].")
        else:
            if 1 <= o1 <= 126:
                print(f"IP {o1}.{o2}.{o3}.{o4} - Classe A")
            elif 128 <= o1 <= 191:
                print(f"IP {o1}.{o2}.{o3}.{o4} - Classe B")
            elif 192 <= o1 <= 223:
                print(f"IP {o1}.{o2}.{o3}.{o4} - Classe C")
            else:
                print(f"IP {o1}.{o2}.{o3}.{o4} - Endereço Especial/Reservado.")
    except ValueError:
        print("Erro: Devem ser números inteiros.")


def menu():
    print("\n=======================================================")
    print("  MENU DE EXERCÍCIOS DE ALGORITMOS PARA ENGENHARIA")
    print("=======================================================")
    print("1. Elétrica - Análise de Fator de Potência")
    print("2. Elétrica - Cálculo de Queda de Tensão")
    print("3. Elétrica - Proteção de Sobrecorrente (Disjuntor)")
    print("4. Mecânica - Segurança Estrutural e Escoamento")
    print("5. Mecânica - Eficiência de Ciclo Rankine")
    print("6. Mecânica - Dimensionamento de Molas Helicoidais")
    print("7. Mecânica - Monitoramento de Desgaste CNC")
    print("8. Telecom - Orçamento de Enlace (Link Budget)")
    print("9. Telecom - Relação Sinal-Ruído (SNR)")
    print("10. Telecom - Classificação de Endereço IPv4")
    print("0. Sair")
    print("=======================================================")

if __name__ == "__main__":
    while True:
        menu()
        opcao = input("Selecione o exercício que deseja executar (0-10): ")
        if opcao == "1": exercicio_1()
        elif opcao == "2": exercicio_2()
        elif opcao == "3": exercicio_3()
        elif opcao == "4": exercicio_4()
        elif opcao == "5": exercicio_5()
        elif opcao == "6": exercicio_6()
        elif opcao == "7": exercicio_7()
        elif opcao == "8": exercicio_8()
        elif opcao == "9": exercicio_9()
        elif opcao == "10": exercicio_10()
        elif opcao == "0":
            print("Saindo...")
            break
        else:
            print("Opção inválida!")
