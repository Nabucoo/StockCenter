def remover_item(estoque):
    nome_item = str(input("Digite o nome do item abaixo:\n"))
    while not nome_item.strip():
        nome_item = str(input("Nome inválido, digite um nome válido(para cancelar digite 'c'):\n"))
        if nome_item == 'c': 
            print("Operação cancelada!")
            return
    return