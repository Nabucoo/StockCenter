import questionary

#criar local pra armazenar items 
def criar_local(estoque):
    nome_do_espaco = str(input("Digite o nome do novo espaço abaixo:\n"))
    while not nome_do_espaco.strip():
        nome_do_espaco = str(input("Nome inválido, digite um nome válido(para cancelar digite 'c'):\n"))
        if nome_do_espaco == 'c': 
            print("Operação cancelada!")
            return
    
    estoque.append({"nome": nome_do_espaco, "itens": []})

#criar item
def criar_item(estoque):
    #pergunta caracteristicas do item
    nome_item = str(input("Digite o nome do item abaixo:\n"))
    while not nome_item.strip():
        nome_item = str(input("Nome inválido, digite um nome válido(para cancelar digite 'c'):\n"))
        if nome_item == 'c': 
            print("Operação cancelada!")
            return
    descricao_item = str(input("Digite a descrição, se necessário: "))

    #aonde quer colocar o item
    lugar_do_item = questionary.select("Aonde deseja manejar o novo item?", choices=[espaco["nome"] for espaco in estoque
    ]).ask()
    novo_item = {
        "nome": nome_item,
        "descrição": descricao_item,
    }
    #percorre o estoque e adiciona onde o usuario decidiu
    for espaco in estoque:
        if espaco["nome"] == lugar_do_item:
            espaco["itens"].append(novo_item)
    print("Item manejado com sucesso!")
    return


def adicionar_item(estoque): 
    #nao da pra adicionar item sem espaco
    if estoque == []:
        print("Não há locais disponíveis para armazenar produtos!")
        resposta = questionary.select('Deseja criar um novo espaço de armazenamento?', choices=[
            'sim',
            'não',
        ]).ask()
        if resposta == "sim":
            criar_local(estoque)
        else: 
            return
    else:
        print("|{:^30}|".format("AÇÕES DISPONÍVEIS"))
        print("|{:^30}|".format("1 - Adicionar espaço"))
        print("|{:^30}|".format("2 - Adicionar item"))
        print("|{:^30}|".format("2 - Editar item"))
        resposta = questionary.select('Escolha uma opção:', choices=[
        '1',
        '2',
        '3',
    ]).ask()
        if resposta == "1":
            criar_local(estoque)
        elif resposta == "2":
            criar_item(estoque)

        
