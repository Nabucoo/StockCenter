import visualizar, os, questionary
from configurar import adicionar_espaco, editar_espaco, remover_espaco
from gerenciar import criar_item, remover_item, buscar_item, editar_item
estoque = {}

def gerenciar(estoque):
    while True:
        print("--------------------------------")
        print("|{:^30}|".format("AÇÕES DISPONÍVEIS"))
        print("--------------------------------")
        print("|{:^30}|".format("1 - Adicionar item"))
        print("|{:^30}|".format("2 - Remover item"))
        print("|{:^30}|".format("3 - Buscar item"))
        print("|{:^30}|".format("4 - Editar item"))
        print("|{:^30}|".format("5 - Voltar"))
        print("--------------------------------")

        resposta = questionary.select('Escolha uma opção:', choices=[
            '1',
            '2',
            '3',
            '4',
            '5'
        ]).ask()
        if resposta == "1":
            criar_item.criar_item(estoque)
        elif resposta == "2": 
            remover_item.remover_item(estoque)
        elif resposta == "3":
            buscar_item.buscar_item(estoque)
        elif resposta == "4":
            editar_item.editar_item(estoque)
        elif resposta == "5":
            return
        else:
            print("Valor inválido")
    
def configurar(estoque):
    while True:
        print("--------------------------------")
        print("|{:^30}|".format("AÇÕES DISPONÍVEIS"))
        print("--------------------------------")
        print("|{:^30}|".format("1 - Adicionar espaço"))
        print("|{:^30}|".format("2 - Editar espaço"))
        print("|{:^30}|".format("3 - Remover espaço"))
        print("|{:^30}|".format("4 - Sair"))
        print("--------------------------------")
        
        resposta = questionary.select('Escolha uma opção:', choices=[
            '1',
            '2',
            '3',
            '4',
        ]).ask()
        if resposta == "1":
            adicionar_espaco.criar_espaco(estoque)
        elif resposta == "2": 
            remover_espaco.remover_espaco(estoque)
        elif resposta == "3":
            editar_espaco.editar_espaco(estoque)
        elif resposta == "4":
            return
        else:
            print("Valor inválido")

while True:

    print("--------------------------------")
    print("|{:^30}|".format("STOCK CENTER"))
    print("--------------------------------")
    print("|{:^30}|".format("AÇÕES DISPONÍVEIS"))
    print("|{:^30}|".format("1 - Gerenciar estoque"))
    print("|{:^30}|".format("2 - Configurar estoque"))
    print("|{:^30}|".format("3 - Visualizar estoque"))
    print("|{:^30}|".format("4 - Sair"))
    print("--------------------------------")

    resposta = questionary.select('Escolha uma opção:', choices=[
        '1',
        '2',
        '3',
        '4',
    ]).ask()
    if resposta == "1":
        gerenciar(estoque)
    elif resposta == "2": 
        configurar(estoque)
    elif resposta == "3":
        visualizar.visualizar_estoque(estoque)
    elif resposta == "4":
        print("Sessão encerrada!")
        exit()
    else:
        print("Valor inválido")


