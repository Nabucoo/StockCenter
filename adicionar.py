import questionary

#criar local pra armazenar items 
def criar_local(estoque):             
    nome_do_espaco = str(input("Digite o nome do novo espaço abaixo:\n"))
    while not nome_do_espaco.strip():
        nome_do_espaco = str(input("Nome inválido, digite um nome válido(para cancelar digite 'c'):\n"))
        if nome_do_espaco == 'c': 
            print("Operação cancelada!")
            return
        
    while estoque:
        nome_lugar = questionary.select("", choices=["aqui mesmo"] + [espaco["nome"] for espaco in estoque["espacos"]]).ask()
        if nome_lugar == "aqui mesmo":
            estoque["espacos"].append({"nome": nome_do_espaco, "itens": [], "espacos": []})
            return
        else:
            for espaco in estoque["espacos"]:
                if nome_lugar == espaco["nome"]:
                    estoque = espaco
    else:
        estoque["nome"] = nome_do_espaco
        estoque["itens"] = []
        estoque["espacos"] = []

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
    quantidade = int(input("Quantidade: ") or 1)
    while quantidade < 1:
        quantidade = int(input("Quantidade inválida: ") or 1)
    #aonde quer colocar o item
    while estoque:
        lugar_do_item = questionary.select("Aonde deseja manejar o novo item?", choices=["aqui mesmo"] + [espaco["nome"] for espaco in estoque["espacos"]]).ask()
        novo_item = {
            "nome": nome_item,
            "descrição": descricao_item,
            "quantidade": quantidade
        }
        if lugar_do_item == "aqui mesmo":
            for item in estoque["itens"]:
                if novo_item["nome"] == item["nome"]:
                    item["quantidade"] += quantidade
                    print("item manejado com sucesso!")
                    return
            else:
                estoque["itens"].append(novo_item)
                print("Item manejado com sucesso!")
                return
        else:
            #percorre o estoque e adiciona onde o usuario decidiu
            for espaco in estoque["espacos"]:
                if espaco["nome"] == lugar_do_item:
                    estoque = espaco


def adicionar_item(estoque): 
    #nao da pra adicionar item sem espaco
    if estoque == {}:
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
        print("|{:^30}|".format("1 - Adicionar item"))
        print("|{:^30}|".format("2 - Editar item"))
        print("|{:^30}|".format("3 - Voltar"))

        resposta = questionary.select('Escolha uma opção:', choices=[
        '1',
        '2',
        '3',
    ]).ask()
        if resposta == "1":
            criar_item(estoque)
        elif resposta == "2":
            pass
        elif resposta == "3":
            return

        
