import random
import matplotlib.pyplot as plt
from matplotlib.backends.backend_pdf import PdfPages

def sistema_abastecimento_agua():
    print("--- Problema 02: Análise de Estabilidade e Custo em Sistemas de Abastecimento ---")
    
    # 1. ENTRADAS [cite: 9, 10]
    try:
        n = int(input("Informe o número de bairros (N): "))
        if n <= 0:
            print("O número de bairros deve ser positivo.")
            return
    except ValueError:
        print("Erro: Insira um número inteiro para N.")
        return

    bairros = []
    
    # Coleta de dados para cada bairro [cite: 11, 12, 13, 14, 15]
    for i in range(n):
        print(f"\n>>> Dados do Bairro {i+1}:")
        nome = input("   Nome do bairro: ")
        demanda = float(input(f"   Demanda diária estimada (m³): "))
        capacidade = float(input(f"   Capacidade do reservatório (m³): "))
        vol_inicial = float(input(f"   Volume inicial disponível (m³): "))
        perda_perc = float(input(f"   Percentual de perda na tubulação (0-100): ")) / 100
        custo_m3 = float(input(f"   Custo de bombeamento por m³: "))

        # 2. PROCESSAMENTO 
        vol_perdido = demanda * perda_perc
        vol_entregue = demanda + vol_perdido
        custo_diario = vol_entregue * custo_m3
        autonomia = vol_inicial / demanda if demanda > 0 else 0
        
        # Classificação do índice de risco [cite: 21, 28, 30]
        if autonomia > 3:
            risco = "Baixo"
        elif 1 <= autonomia <= 3:
            risco = "Médio"
        else:
            risco = "Alto"

        # 3. SIMULAÇÃO DE 7 DIAS (Desafio Adicional) [cite: 38, 39, 40]
        historico_vol = [vol_inicial]
        for dia in range(1, 8):
            # Variação aleatória de ±20% [cite: 39]
            variacao = random.uniform(0.8, 1.2)
            demanda_real = demanda * variacao
            
            # Atualização do volume (volume anterior - demanda real) [cite: 40]
            novo_vol = max(0, historico_vol[-1] - demanda_real)
            historico_vol.append(novo_vol)
            
            if novo_vol == 0:
                print(f"   ALERTA: O bairro '{nome}' ficou sem água no Dia {dia}!")

        bairros.append({
            "nome": nome, "demanda": demanda, "entregue": vol_entregue,
            "custo": custo_diario, "autonomia": autonomia, "risco": risco,
            "historico": historico_vol
        })

    # 4. SAÍDAS - TABELA [cite: 33, 34]
    print("\n" + "="*85)
    print(f"{'BAIRRO':<15} | {'RISCO':<10} | {'AUTONOMIA (Dias)':<18} | {'CUSTO DIÁRIO (R$)':<15}")
    print("-" * 85)
    for b in bairros:
        print(f"{b['nome']:<15} | {b['risco']:<10} | {b['autonomia']:<18.2f} | {b['custo']:<15.2f}")
    
    # Identificação automática do bairro mais crítico 
    b_critico = min(bairros, key=lambda x: x['autonomia'])
    print(f"\n>>> IDENTIFICAÇÃO AUTOMÁTICA: O bairro mais crítico é {b_critico['nome']}.")

    # 5. GRÁFICOS 
    nomes = [b['nome'] for b in bairros]
    
    with PdfPages('relatorio_abastecimento.pdf') as pdf:
        
        # Gráfico 1: Barras - Demanda vs Volume Entregue [cite: 35]
        plt.figure(figsize=(10, 5))
        plt.bar(nomes, [b['demanda'] for b in bairros], width=0.4, label='Demanda', align='center')
        plt.bar(nomes, [b['entregue'] for b in bairros], width=0.4, label='Vol. Entregue (c/ perda)', align='edge')
        plt.title("Comparativo: Demanda vs Volume Entregue")
        plt.ylabel("m³")
        plt.legend()
        pdf.savefig(); plt.show()

        # Gráfico 2: Barras - Custo Diário [cite: 36]
        plt.figure(figsize=(10, 5))
        plt.bar(nomes, [b['custo'] for b in bairros], color='skyblue')
        plt.title("Custo Diário de Bombeamento por Bairro")
        plt.ylabel("Custo (R$)")
        pdf.savefig(); plt.show()

        # Gráfico 3: Pizza - Níveis de Risco 
        plt.figure(figsize=(7, 7))
        contagem = {"Baixo": 0, "Médio": 0, "Alto": 0}
        for b in bairros: contagem[b['risco']] += 1
        plt.pie(contagem.values(), labels=contagem.keys(), autopct='%1.1f%%', colors=['green', 'orange', 'red'])
        plt.title("Distribuição dos Níveis de Risco")
        pdf.savefig(); plt.show()

        # Gráfico 4: Linha - Evolução 7 Dias [cite: 41]
        plt.figure(figsize=(10, 6))
        for b in bairros:
            plt.plot(range(8), b['historico'], marker='o', label=b['nome'])
        plt.title("Evolução do Volume nos Reservatórios (7 Dias)")
        plt.xlabel("Dia")
        plt.ylabel("Volume (m³)")
        plt.legend()
        plt.grid(True)
        pdf.savefig(); plt.show()

    print("\nO relatório em PDF 'relatorio_abastecimento.pdf' foi gerado com sucesso.")

# Executar o programa
sistema_abastecimento_agua()
