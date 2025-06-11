'''import questionary
from configurar import buscar_espaco

def editar_espaço(estoque):
    nome_espaco = input("Digite o nome do espaço que deseja editar:\n").lower()
    resultado_busca = buscar_espaco.buscar_espaco(estoque, nome_espaco)

    if not resultado_busca:
        print("Espaço não encontrado!")
        return'''
