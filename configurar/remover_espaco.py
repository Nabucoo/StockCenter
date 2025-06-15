import questionary
from configurar import buscar_espaco

def remover_espaco(estoque, nome):
    espacos = buscar_espaco.buscar_espaco(estoque, nome)
    
    if not espacos:
        print("Espaço não encontrado.")
        return

    resposta = questionary.select("Deseja mesmo remover o espaço?", choices=["Sim", "Não"]).ask()
    
    if resposta == "Sim":
        caminho_str = espacos[0][0]
        caminho = caminho_str.split("/")
        if len(caminho) == 1:
            print("Você não pode remover o espaço raiz!")
            return
        else:
            atual = estoque
            for nome_parte in caminho[:-1]:
                for e in atual["espacos"]:
                    if e["nome"] == nome_parte:
                        atual = e
                        break
        
            nome_para_remover = caminho[-1]
            atual["espacos"] = [e for e in atual["espacos"] if e["nome"] != nome_para_remover]

            print("Espaço removido com sucesso!")
