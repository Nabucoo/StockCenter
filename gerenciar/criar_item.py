import questionary
from configurar import adicionar_espaco 
#criar item
def criar_item(estoque):
    if estoque == {}:
        print("Não há locais disponíveis para armazenar produtos!")
        resposta = questionary.select('Deseja criar um novo espaço de armazenamento?', choices=[
            'sim',
            'não',
        ]).ask()
        if resposta == "sim":
            adicionar_espaco.criar_espaco(estoque)
        else: 
            return
    #pergunta caracteristicas do item
    nome_item = str(input("Digite o nome do item abaixo:\n")).lower()
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
            "descricao": descricao_item,
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