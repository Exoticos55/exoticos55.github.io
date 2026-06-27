# -*- coding: utf-8 -*-
"""
10 Exercícios de Algoritmos para Engenharia — gerados por Claude (Anthropic)
Distribuídos entre Engenharia Elétrica, Mecânica e de Telecomunicações.
Cada exercício contém: enunciado, pseudocódigo e código Python funcional.
"""

import math

# ==============================================================================
# ENGENHARIA ELÉTRICA
# ==============================================================================

def exercicio_1():
    """
    Enunciado: Numa instalação residencial, cada disjuntor suporta uma corrente
    máxima nominal. Dado o somatório das correntes de todos os equipamentos
    ligados a um circuito e a corrente nominal do disjuntor, o algoritmo deve
    informar se o circuito está dentro da capacidade, em alerta (acima de 80%
    da capacidade) ou em sobrecarga (acima de 100%).

    Pseudocódigo:
    Algoritmo VerificarDisjuntor
    Var
        correnteTotal, correnteNominal, percentual : Real
    Inicio
        Leia(correnteTotal)
        Leia(correnteNominal)
        percentual <- (correnteTotal / correnteNominal) * 100
        Se percentual >= 100 Entao
            Escreva("Sobrecarga: desligue equipamentos.")
        SenaoSe percentual >= 80 Entao
            Escreva("Alerta: próximo do limite.")
        Senao
            Escreva("Circuito dentro da capacidade.")
        FimSe
    FimAlgoritmo
    """
    print("\n--- Exercício 1: Verificação de Capacidade de Disjuntor ---")
    try:
        corrente_total = float(input("Corrente total do circuito (A): "))
        corrente_nominal = float(input("Corrente nominal do disjuntor (A): "))
        percentual = (corrente_total / corrente_nominal) * 100
        print(f"Uso do disjuntor: {percentual:.1f}%")
        if percentual >= 100:
            print("Sobrecarga: desligue equipamentos imediatamente.")
        elif percentual >= 80:
            print("Alerta: o circuito está próximo do limite.")
        else:
            print("Circuito dentro da capacidade segura.")
    except (ValueError, ZeroDivisionError):
        print("Erro: valores inválidos.")


def exercicio_2():
    """
    Enunciado: Em sistemas trifásicos equilibrados, a potência ativa total é
    dada por P = sqrt(3) * V * I * cos(phi). O algoritmo deve calcular a
    potência ativa a partir da tensão de linha, corrente de linha e ângulo
    do fator de potência (em graus).

    Pseudocódigo:
    Algoritmo PotenciaTrifasica
    Var
        tensao, corrente, anguloGraus, anguloRad, potencia : Real
    Inicio
        Leia(tensao)
        Leia(corrente)
        Leia(anguloGraus)
        anguloRad <- anguloGraus * (PI / 180)
        potencia <- RaizQuadrada(3) * tensao * corrente * cos(anguloRad)
        Escreva(potencia)
    FimAlgoritmo
    """
    print("\n--- Exercício 2: Potência Ativa Trifásica ---")
    try:
        tensao = float(input("Tensão de linha (V): "))
        corrente = float(input("Corrente de linha (A): "))
        angulo_graus = float(input("Ângulo do fator de potência (graus): "))
        angulo_rad = math.radians(angulo_graus)
        potencia = math.sqrt(3) * tensao * corrente * math.cos(angulo_rad)
        print(f"Potência ativa: {potencia:.2f} W")
    except ValueError:
        print("Erro: valores inválidos.")


def exercicio_3():
    """
    Enunciado: Um banco de baterias estacionárias é monitorado por leituras
    de tensão a cada hora. Dada uma sequência de leituras, o algoritmo deve
    identificar quantas vezes a tensão caiu abaixo do limite mínimo de
    descarga (10.5 V por elemento de 12V), indicando risco ao banco.

    Pseudocódigo:
    Algoritmo MonitorarBateria
    Var
        leitura, totalLeituras, quedas, i : Inteiro/Real
    Inicio
        Leia(totalLeituras)
        quedas <- 0
        Para i de 1 ate totalLeituras Faca
            Leia(leitura)
            Se leitura < 10.5 Entao
                quedas <- quedas + 1
            FimSe
        FimPara
        Escreva(quedas)
    FimAlgoritmo
    """
    print("\n--- Exercício 3: Monitoramento de Tensão de Bateria ---")
    try:
        total = int(input("Quantidade de leituras: "))
        quedas = 0
        for i in range(total):
            leitura = float(input(f"Leitura {i + 1} (V): "))
            if leitura < 10.5:
                quedas += 1
        print(f"Número de leituras abaixo do limite de descarga: {quedas}")
        if quedas > 0:
            print("Atenção: banco de baterias em risco de dano por descarga profunda.")
    except ValueError:
        print("Erro: entradas inválidas.")


# ==============================================================================
# ENGENHARIA MECÂNICA
# ==============================================================================

def exercicio_4():
    """
    Enunciado: Para selecionar um rolamento adequado, calcula-se a vida útil
    estimada em milhões de rotações usando L10 = (C/P)^p, onde C é a carga
    dinâmica básica, P é a carga equivalente aplicada e p = 3 para rolamentos
    de esferas. O algoritmo deve calcular L10 e informar a vida útil em horas
    dada uma rotação constante em RPM.

    Pseudocódigo:
    Algoritmo VidaUtilRolamento
    Var
        cargaDinamica, cargaEquivalente, rpm, L10, horasVida : Real
    Inicio
        Leia(cargaDinamica)
        Leia(cargaEquivalente)
        Leia(rpm)
        L10 <- (cargaDinamica / cargaEquivalente) ^ 3
        horasVida <- (L10 * 1000000) / (60 * rpm)
        Escreva(horasVida)
    FimAlgoritmo
    """
    print("\n--- Exercício 4: Vida Útil de Rolamento (L10) ---")
    try:
        c = float(input("Carga dinâmica básica C (kN): "))
        p = float(input("Carga equivalente aplicada P (kN): "))
        rpm = float(input("Velocidade de rotação (RPM): "))
        l10 = (c / p) ** 3
        horas_vida = (l10 * 1_000_000) / (60 * rpm)
        print(f"Vida útil L10: {l10:.2f} milhões de rotações")
        print(f"Vida útil estimada: {horas_vida:.0f} horas")
    except (ValueError, ZeroDivisionError):
        print("Erro: valores inválidos.")


def exercicio_5():
    """
    Enunciado: Um sistema de transmissão por engrenagens possui uma engrenagem
    motora e uma movida. Dado o número de dentes de cada uma e a rotação de
    entrada, o algoritmo deve calcular a relação de transmissão e a rotação
    de saída, classificando o sistema como redutor ou multiplicador.

    Pseudocódigo:
    Algoritmo RelacaoEngrenagens
    Var
        dentesMotora, dentesMovida, rpmEntrada, relacao, rpmSaida : Real
    Inicio
        Leia(dentesMotora)
        Leia(dentesMovida)
        Leia(rpmEntrada)
        relacao <- dentesMovida / dentesMotora
        rpmSaida <- rpmEntrada / relacao
        Se relacao > 1 Entao
            Escreva("Sistema redutor")
        Senao
            Escreva("Sistema multiplicador")
        FimSe
        Escreva(rpmSaida)
    FimAlgoritmo
    """
    print("\n--- Exercício 5: Relação de Transmissão por Engrenagens ---")
    try:
        dentes_motora = float(input("Número de dentes da engrenagem motora: "))
        dentes_movida = float(input("Número de dentes da engrenagem movida: "))
        rpm_entrada = float(input("Rotação de entrada (RPM): "))
        relacao = dentes_movida / dentes_motora
        rpm_saida = rpm_entrada / relacao
        tipo = "redutor" if relacao > 1 else "multiplicador"
        print(f"Relação de transmissão: {relacao:.2f} ({tipo})")
        print(f"Rotação de saída: {rpm_saida:.2f} RPM")
    except (ValueError, ZeroDivisionError):
        print("Erro: valores inválidos.")


def exercicio_6():
    """
    Enunciado: Uma viga simplesmente apoiada recebe uma carga distribuída
    uniformemente. O momento fletor máximo no centro do vão é dado por
    M = (w * L^2) / 8, onde w é a carga distribuída (N/m) e L é o vão (m).
    O algoritmo deve calcular esse momento e a tensão de flexão máxima,
    dado o módulo de resistência da seção (W, em m³): sigma = M / W.

    Pseudocódigo:
    Algoritmo MomentoFletorViga
    Var
        cargaDistribuida, vao, moduloResistencia, momento, tensao : Real
    Inicio
        Leia(cargaDistribuida)
        Leia(vao)
        Leia(moduloResistencia)
        momento <- (cargaDistribuida * vao * vao) / 8
        tensao <- momento / moduloResistencia
        Escreva(momento)
        Escreva(tensao)
    FimAlgoritmo
    """
    print("\n--- Exercício 6: Momento Fletor em Viga Apoiada ---")
    try:
        w = float(input("Carga distribuída (N/m): "))
        vao = float(input("Vão da viga (m): "))
        modulo_w = float(input("Módulo de resistência da seção (m³): "))
        momento = (w * vao ** 2) / 8
        tensao = momento / modulo_w
        print(f"Momento fletor máximo: {momento:.2f} N.m")
        print(f"Tensão de flexão máxima: {tensao:.2f} Pa")
    except (ValueError, ZeroDivisionError):
        print("Erro: valores inválidos.")


def exercicio_7():
    """
    Enunciado: Um compressor de ar opera em ciclos. Dado o volume de ar
    comprimido por ciclo (litros) e o tempo de cada ciclo (segundos), o
    algoritmo deve calcular a vazão média em litros por minuto ao longo de
    N ciclos informados pelo usuário, considerando que o tempo de cada
    ciclo pode variar.

    Pseudocódigo:
    Algoritmo VazaoCompressor
    Var
        n, i, volume, tempo, volumeTotal, tempoTotal, vazao : Real/Inteiro
    Inicio
        Leia(n)
        volumeTotal <- 0
        tempoTotal <- 0
        Para i de 1 ate n Faca
            Leia(volume)
            Leia(tempo)
            volumeTotal <- volumeTotal + volume
            tempoTotal <- tempoTotal + tempo
        FimPara
        vazao <- (volumeTotal / tempoTotal) * 60
        Escreva(vazao)
    FimAlgoritmo
    """
    print("\n--- Exercício 7: Vazão Média de Compressor ---")
    try:
        n = int(input("Número de ciclos: "))
        volume_total = 0.0
        tempo_total = 0.0
        for i in range(n):
            volume = float(input(f"Ciclo {i + 1} - volume comprimido (L): "))
            tempo = float(input(f"Ciclo {i + 1} - tempo do ciclo (s): "))
            volume_total += volume
            tempo_total += tempo
        vazao = (volume_total / tempo_total) * 60
        print(f"Vazão média: {vazao:.2f} L/min")
    except (ValueError, ZeroDivisionError):
        print("Erro: valores inválidos.")


# ==============================================================================
# ENGENHARIA DE TELECOMUNICAÇÕES
# ==============================================================================

def exercicio_8():
    """
    Enunciado: Em modulação digital, a taxa de erro de bit (BER) é estimada
    em função da relação sinal-ruído (SNR, em dB). O algoritmo deve
    classificar a qualidade do enlace: SNR >= 20 dB (excelente), entre 10 e
    20 dB (aceitável), abaixo de 10 dB (degradado, possível perda de pacotes).

    Pseudocódigo:
    Algoritmo ClassificarEnlace
    Var
        snr : Real
    Inicio
        Leia(snr)
        Se snr >= 20 Entao
            Escreva("Enlace excelente")
        SenaoSe snr >= 10 Entao
            Escreva("Enlace aceitável")
        Senao
            Escreva("Enlace degradado")
        FimSe
    FimAlgoritmo
    """
    print("\n--- Exercício 8: Classificação de Qualidade de Enlace por SNR ---")
    try:
        snr = float(input("Relação Sinal-Ruído (dB): "))
        if snr >= 20:
            print("Enlace excelente.")
        elif snr >= 10:
            print("Enlace aceitável, monitorar variações.")
        else:
            print("Enlace degradado: possível perda de pacotes.")
    except ValueError:
        print("Erro: valor inválido.")


def exercicio_9():
    """
    Enunciado: Um link de fibra óptica sofre atenuação ao longo da distância.
    Dada a potência de transmissão (dBm), a atenuação por quilômetro (dB/km)
    e a distância do enlace (km), o algoritmo deve calcular a potência
    recebida e informar se está acima do limiar de sensibilidade do receptor.

    Pseudocódigo:
    Algoritmo AtenuacaoFibra
    Var
        potenciaTx, atenuacaoKm, distancia, sensibilidade, potenciaRx : Real
    Inicio
        Leia(potenciaTx)
        Leia(atenuacaoKm)
        Leia(distancia)
        Leia(sensibilidade)
        potenciaRx <- potenciaTx - (atenuacaoKm * distancia)
        Se potenciaRx >= sensibilidade Entao
            Escreva("Enlace operacional")
        Senao
            Escreva("Sinal abaixo da sensibilidade do receptor")
        FimSe
        Escreva(potenciaRx)
    FimAlgoritmo
    """
    print("\n--- Exercício 9: Atenuação em Enlace de Fibra Óptica ---")
    try:
        potencia_tx = float(input("Potência de transmissão (dBm): "))
        atenuacao_km = float(input("Atenuação da fibra (dB/km): "))
        distancia = float(input("Distância do enlace (km): "))
        sensibilidade = float(input("Sensibilidade do receptor (dBm): "))
        potencia_rx = potencia_tx - (atenuacao_km * distancia)
        print(f"Potência recebida: {potencia_rx:.2f} dBm")
        if potencia_rx >= sensibilidade:
            print("Enlace operacional.")
        else:
            print("Sinal abaixo da sensibilidade do receptor: enlace inviável.")
    except ValueError:
        print("Erro: valores inválidos.")


def exercicio_10():
    """
    Enunciado: Uma rede de sensores transmite pacotes periodicamente. Dada
    uma lista com o número de pacotes enviados e recebidos com sucesso em
    cada hora de operação, o algoritmo deve calcular a taxa de perda de
    pacotes (%) por hora e indicar em quais horas a perda excedeu 5%.

    Pseudocódigo:
    Algoritmo TaxaPerdaPacotes
    Var
        horas, i, enviados, recebidos, perda : Inteiro/Real
    Inicio
        Leia(horas)
        Para i de 1 ate horas Faca
            Leia(enviados)
            Leia(recebidos)
            perda <- ((enviados - recebidos) / enviados) * 100
            Escreva(perda)
            Se perda > 5 Entao
                Escreva("Hora ", i, ": perda crítica")
            FimSe
        FimPara
    FimAlgoritmo
    """
    print("\n--- Exercício 10: Taxa de Perda de Pacotes por Hora ---")
    try:
        horas = int(input("Número de horas registradas: "))
        for i in range(horas):
            enviados = int(input(f"Hora {i + 1} - pacotes enviados: "))
            recebidos = int(input(f"Hora {i + 1} - pacotes recebidos: "))
            perda = ((enviados - recebidos) / enviados) * 100
            status = " -> perda crítica!" if perda > 5 else ""
            print(f"Hora {i + 1}: perda de {perda:.2f}%{status}")
    except (ValueError, ZeroDivisionError):
        print("Erro: valores inválidos.")


def menu():
    print("\n=======================================================")
    print("  EXERCÍCIOS DE ALGORITMOS PARA ENGENHARIA — Claude")
    print("=======================================================")
    print("1. Elétrica - Verificação de Capacidade de Disjuntor")
    print("2. Elétrica - Potência Ativa Trifásica")
    print("3. Elétrica - Monitoramento de Tensão de Bateria")
    print("4. Mecânica - Vida Útil de Rolamento (L10)")
    print("5. Mecânica - Relação de Transmissão por Engrenagens")
    print("6. Mecânica - Momento Fletor em Viga Apoiada")
    print("7. Mecânica - Vazão Média de Compressor")
    print("8. Telecom - Classificação de Enlace por SNR")
    print("9. Telecom - Atenuação em Fibra Óptica")
    print("10. Telecom - Taxa de Perda de Pacotes por Hora")
    print("0. Sair")
    print("=======================================================")


if __name__ == "__main__":
    while True:
        menu()
        opcao = input("Selecione o exercício (0-10): ")
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
