import visualizar, adicionar, remover, buscar, os, questionary
estoque = []

while True:
    print("--------------------------------")
    print("|{:^30}|".format("STOCK CENTER"))
    print("--------------------------------")
    print("|{:^30}|".format("AÇÕES DISPONÍVEIS"))

    print("|{:^30}|".format("1 - Visualizar estoque"))
    print("|{:^30}|".format("2 - Adicionar item"))
    print("|{:^30}|".format("3 - Remover item"))
    print("|{:^30}|".format("4 - Buscar item"))
    print("|{:^30}|".format("5 - Adicionar local"))
    print("|{:^30}|".format("6 - Sair"))
    print("--------------------------------")

    resposta = questionary.select('Escolha uma opção:', choices=[
        '1',
        '2',
        '3',
        '4',
        '5',
        '6'
    ]).ask()

    if resposta == "1":
        visualizar.visualizar_estoque(estoque)
    elif resposta == "2": 
        adicionar.adicionar_item(estoque)
    elif resposta == "3":
        pass
    elif resposta == "4":
        pass
    elif resposta == "5":
        pass
    elif resposta == "6":
        print("Sessão encerrada!")
        exit()
    else:
        print("Valor inválido")



