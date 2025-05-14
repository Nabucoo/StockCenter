import questionary

def remover_item(estoque):
    nome_item = str(input("Digite o nome do item que deseja remover: "))
    

            
        

def remover_espaco():
    pass

def remover(estoque):
    if not estoque:
        print("Não há itens para remover!")
        return
    else:
        print("|{:^30}|".format("AÇÕES DISPONÍVEIS"))
        print("|{:^30}|".format("1 - Remover item"))
        print("|{:^30}|".format("2 - Remover espaco"))
        print("|{:^30}|".format("3 - Voltar"))

        resposta = questionary.select('Escolha uma opção:', choices=[
        '1',
        '2',
        '3',
        ]).ask()
        if resposta == "1":
            remover_item(estoque)
        elif resposta == "2":
            remover_espaco(estoque)
        elif resposta == "3":
            return
