import math


# ==========================================================
# FUNÇÕES DE VALIDAÇÃO
# ==========================================================

def validar_medicao(valor):
    """
    Verifica se a medição é numérica e está na faixa
    fisicamente possível para a rede elétrica (0 a 500 V).
    """
    return isinstance(valor, (int, float)) and 0 <= valor <= 500


# ==========================================================
# FUNÇÕES DE CLASSIFICAÇÃO
# ==========================================================

def classificar_tensao(tensao, nominal=220):
    """
    Classifica a tensão com base no desvio percentual
    em relação à tensão nominal.
    """
    desvio = abs(tensao - nominal) / nominal

    if desvio > 0.20:
        return "Crítico"
    elif desvio > 0.10:
        return "Alerta"
    else:
        return "Normal"


# ==========================================================
# FUNÇÕES DE ESTATÍSTICA
# ==========================================================

def calcular_media(valores):
    return sum(valores) / len(valores)


def calcular_desvio_padrao(valores):
    media = calcular_media(valores)

    soma_quadrados = 0
    for valor in valores:
        soma_quadrados += (valor - media) ** 2

    variancia = soma_quadrados / len(valores)

    return math.sqrt(variancia)


def calcular_estatisticas(valores):
    """
    Retorna um dicionário contendo as estatísticas
    das medições válidas.
    """
    return {
        "media": calcular_media(valores),
        "minimo": min(valores),
        "maximo": max(valores),
        "desvio_padrao": calcular_desvio_padrao(valores)
    }


# ==========================================================
# DETECÇÃO DE EVENTOS CRÍTICOS
# ==========================================================

def detectar_eventos_criticos(classificacoes):
    """
    Conta:
    - Total de medições críticas.
    - Maior sequência consecutiva de medições críticas.
    """
    total_criticos = 0
    sequencia_atual = 0
    maior_sequencia = 0

    for status in classificacoes:
        if status == "Crítico":
            total_criticos += 1
            sequencia_atual += 1

            if sequencia_atual > maior_sequencia:
                maior_sequencia = sequencia_atual
        else:
            sequencia_atual = 0

    return total_criticos, maior_sequencia


# ==========================================================
# PROCESSAMENTO DAS MEDIÇÕES
# ==========================================================

def processar_medicoes(lista_bruta):
    """
    Valida e classifica as medições.
    """
    medidas_validas = []
    classificacoes = []
    descartadas = 0

    print("\nCLASSIFICAÇÃO DAS MEDIÇÕES")
    print("-" * 40)

    for valor in lista_bruta:

        if validar_medicao(valor):

            medidas_validas.append(valor)

            status = classificar_tensao(valor)
            classificacoes.append(status)

            print(f"{valor} V -> {status}")

        else:
            descartadas += 1
            print(f"{valor} -> DESCARTADO")

    return medidas_validas, classificacoes, descartadas


# ==========================================================
# RELATÓRIO FINAL
# ==========================================================

def gerar_relatorio(validas, descartadas, classificacoes):
    """
    Exibe relatório consolidado.
    """
    estatisticas = calcular_estatisticas(validas)

    total_criticos, maior_sequencia = detectar_eventos_criticos(
        classificacoes
    )

    print("\n" + "=" * 50)
    print("RELATÓRIO FINAL")
    print("=" * 50)

    print(f"Amostras válidas     : {len(validas)}")
    print(f"Amostras descartadas : {descartadas}")

    print("\nESTATÍSTICAS")
    print(f"Média                : {estatisticas['media']:.2f} V")
    print(f"Valor mínimo         : {estatisticas['minimo']:.2f} V")
    print(f"Valor máximo         : {estatisticas['maximo']:.2f} V")
    print(f"Desvio padrão        : {estatisticas['desvio_padrao']:.2f} V")

    print("\nEVENTOS CRÍTICOS")
    print(f"Total de críticos    : {total_criticos}")
    print(f"Maior sequência      : {maior_sequencia}")


# ==========================================================
# FUNÇÃO PRINCIPAL
# ==========================================================

def main(lista_bruta):
    """
    Coordena todo o fluxo do programa.
    """
    validas, classificacoes, descartadas = processar_medicoes(
        lista_bruta
    )

    gerar_relatorio(
        validas,
        descartadas,
        classificacoes
    )


# ==========================================================
# BLOCO DE TESTE
# ==========================================================

if __name__ == "__main__":

    medicoes_brutas = [
        220,
        215,
        250,
        300,
        "erro_sensor",
        180,
        220,
        280,
        290,
        150
    ]

    main(medicoes_brutas)