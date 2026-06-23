import numpy as np
import matplotlib.pyplot as plt
import streamlit as st

# Configuração da página Web universal do aplicativo
st.set_page_config(page_title="Portal de Telemetria", layout="wide")

st.title("🌐 Portal do Cliente: Acesso Protegido & Telemetria Elétrica")
st.write("Conexão estabelecida com o servidor de proteção local.")

# ==========================================
# 1. INTERFACE DE ACESSO (FORMULÁRIO STREAMLIT)
# ==========================================
st.sidebar.header("🔐 Autenticação no Barramento Digital")
Nome_do_Cliente = st.sidebar.text_input("Nome do Cliente", value="Matheus Leal Peres")
Chave_da_Subestacao = st.sidebar.text_input("Chave da Subestação", value="SUB-60HZ-2026")

st.sidebar.header("📊 Parâmetros de Telemetria Operacional")
Frequencia_Ajustada_Hz = st.sidebar.slider("Frequência Ajustada (Hz)", min_value=10, max_value=120, value=120)
Limite_Disparo_Amperes = st.sidebar.number_input("Limite de Disparo (Amperes)", min_value=1.0, value=15.0)

st.sidebar.header("🚨 Injeção de Distúrbio na Rede (Simulação)")
Simular_Sobrecarga_Ativa = st.sidebar.checkbox("Simular Sobrecarga Ativa", value=True)
Magnitude_Surto_A = st.sidebar.slider("Magnitude do Surto (A)", min_value=0.0, max_value=40.0, value=13.5)

# ==========================================
# 2. PROCESSAMENTO DOS DADOS DE TELEMETRIA
# ==========================================
TAXA_AMOSTRAGEM = 10000
DURACAO = 0.1
tempo = np.linspace(0, DURACAO, int(TAXA_AMOSTRAGEM * DURACAO))

# Construção da onda senoidal pura
corrente_nominal = 11.0 * np.sin(2 * np.pi * Frequencia_Ajustada_Hz * tempo)
sinal_telemetria = corrente_nominal.copy()

# Simulação da anomalia de carga injetada pelo cliente
if Simular_Sobrecarga_Ativa:
    ponto_inicio = int(len(tempo) * 0.4)
    ponto_fim = int(len(tempo) * 0.55)
    sinal_telemetria[ponto_inicio:ponto_fim] += Magnitude_Surto_A

sinal_absoluto = np.abs(sinal_telemetria)
pico_maximo_registrado = np.max(sinal_absoluto)
indices_falha = np.where(sinal_absoluto > Limite_Disparo_Amperes)[0]
sistema_critico = len(indices_falha) > 0

# ==========================================
# 3. RENDERIZAÇÃO DA PÁGINA (OUTPUT WEB NO MONITOR)
# ==========================================
col1, col2 = st.columns(2)
with col1:
    st.info(f"👤 **Usuário Ativo:** {Nome_do_Cliente.upper()}  \n🔑 **ID Dispositivo:** {Chave_da_Subestacao}")
with col2:
    if sistema_critico:
        st.error(f"❌ **STATUS: FALHA CRÍTICA** \n Pico de {pico_maximo_registrado:.2f}A ultrapassou o limite de {Limite_Disparo_Amperes}A!")
    else:
        st.success(f"✔️ **STATUS: OPERAÇÃO ESTÁVEL** \n Sistema operando dentro das conformidades técnicas.")

# ==========================================
# 4. DASHBOARD DE VISUALIZAÇÃO GRÁFICA
# ==========================================
fig, ax = plt.subplots(figsize=(14, 5))

# Plot da linha de corrente em tempo real
ax.plot(tempo * 1000, sinal_telemetria, color='#00f2ff', label='Telemetria de Corrente (A)', linewidth=2.5)

# Linhas de threshold de proteção
ax.axhline(y=Limite_Disparo_Amperes, color='#ff0055', linestyle='--', label=f'Threshold Crítico (+{Limite_Disparo_Amperes}A)', linewidth=1.5)
ax.axhline(y=-Limite_Disparo_Amperes, color='#ff0055', linestyle='--', label=f'Threshold Crítico (-{Limite_Disparo_Amperes}A)', linewidth=1.5)

# Plotagem dos pontos de falha
if sistema_critico:
    ax.scatter(tempo[indices_falha] * 1000, sinal_telemetria[indices_falha], 
               color='#ffd700', s=30, zorder=5, label='Pontos Isolados por IA')

# Estilização Cyberpunk/Dark
ax.set_facecolor('#050b14')
fig.patch.set_facecolor('#010410')
ax.tick_params(colors='#ffffff', labelsize=11)
ax.set_xlabel('Tempo de Amostragem (ms)', color='#94a3b8', fontsize=12)
ax.set_ylabel('Intensidade do Sinal (A)', color='#94a3b8', fontsize=12)
ax.grid(True, linestyle=':', alpha=0.3, color='#94a3b8')
ax.legend(facecolor='#050b14', edgecolor='#00f2ff', labelcolor='#ffffff', fontsize=11)
plt.title(f"Live Telemetry Feed - Subestação {Chave_da_Subestacao}", color='#ffffff', fontsize=14, fontweight='bold', pad=15)

plt.tight_layout()
st.pyplot(fig)