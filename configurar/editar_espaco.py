import questionary
from configurar import buscar_espaco

def editar_espaco(estoque):
    nome_antigo = input("Digite o nome do espaço que deseja editar:\n").strip()
    resultado = buscar_espaco.buscar_espaco(estoque, nome_antigo)

    if not resultado:
        print("Espaço não encontrado!")
        return

    buscar_espaco.printar_espaco(resultado)

    escolha = questionary.select("Qual espaço deseja editar?", choices=[f"Caminho: {espaco[0]}" for espaco in resultado]).ask()
    caminho = escolha[8:]  # remove a palavra "Caminho: " exemplo "caminho:esquina" = esquina 
    caminho = caminho.split("/")

    atual = estoque
    for nome in caminho[1:]:
        for espaco in atual["espacos"]:
            if espaco["nome"] == nome:
                atual = espaco
                break

    novo_nome = input(f"Digite o novo nome para o espaço '{atual['nome']}': ").strip()
    if not novo_nome:
        print("Nome inválido. Edição cancelada.")
        return

    atual["nome"] = novo_nome
    print("Espaço renomeado com sucesso!")
