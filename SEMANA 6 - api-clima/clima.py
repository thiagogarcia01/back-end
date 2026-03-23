import requests

def buscar_clima(cidade):
    """
    Consome a API pública wttr.in para obter dados meteorológicos reais.
    
    Argumentos:
        cidade (str): O nome da cidade para a consulta.
        
    Retorna:
        None: Exibe as informações formatadas diretamente no terminal.
    """
    
    # Configuração da URL: format=j1 solicita o retorno em JSON estruturado
    # O JSON é o padrão ouro para APIs, facilitando a extração de dados específicos.
    url = f"https://wttr.in/{cidade}?format=j1"
    
    try:
        # Realiza a requisição GET para o servidor
        resposta = requests.get(url, timeout=10)
        
        # Verifica se o servidor retornou sucesso (Código HTTP 200)
        if resposta.status_code == 200:
            # Converte o corpo da resposta de texto bruto para um dicionário Python
            dados = resposta.json()
            
            # Navegação no JSON: 'current_condition' é uma lista com os dados atuais
            clima_atual = dados['current_condition'][0]
            
            # Extração de variáveis específicas
            temp = clima_atual['temp_C']
            umidade = clima_atual['humidity']
            vento = clima_atual['windspeedKmph']
            
            # Tenta buscar a descrição em português, caso contrário usa o inglês
            # A API wttr.in preenche 'lang_pt' baseada na localização do IP ou parâmetros
            descricao = clima_atual.get('lang_pt', [{}])[0].get('value', clima_atual['weatherDesc'][0]['value'])

            # --- BLOCO DE INTERFACE (SAÍDA) ---
            print("\n" + "═" * 35)
            print(f" 📍  RELATÓRIO METEOROLÓGICO: {cidade.upper()}")
            print("─" * 35)
            print(f" 🌡️   Temperatura:  {temp}°C")
            print(f" ☁️   Condição:     {descricao}")
            print(f" 💧  Umidade:       {umidade}%")
            print(f" 🌬️   Vento:         {vento} km/h")
            print("═" * 35 + "\n")
            
        else:
            print(f"\n[!] Erro {resposta.status_code}: Não foi possível localizar '{cidade}'.")
            
    except requests.exceptions.ConnectionError:
        print("\n[!] Erro de Conexão: Verifique se você está online.")
    except Exception as e:
        print(f"\n[!] Ocorreu um erro inesperado: {e}")

# --- PONTO DE ENTRADA DO SCRIPT ---
if __name__ == "__main__":
    # .strip() remove espaços em branco acidentais no início ou fim da digitação
    entrada_usuario = input("Digite o nome da cidade para consulta: ").strip()
    
    if entrada_usuario:
        buscar_clima(entrada_usuario)
    else:
        print("Entrada inválida. Por favor, informe o nome de uma cidade.")