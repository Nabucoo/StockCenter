import questionary
from gerenciar import buscar_item

def editar_item(estoque):
    nome_item = input("Digite o nome do item que deseja editar:\n").lower()
    resultado_busca = buscar_item.buscar_item(estoque, nome_item)

    if not resultado_busca:
        print("Item não encontrado!")
        return
#utilizo a função já criada(buscar) pra acha oq eu quero
    buscar_item.printar_item(resultado_busca)
    print("\nSelecione o item que deseja editar:")
    escolha = questionary.select("Qual deseja editar?", choices=[f"Caminho: {item[0]}" for item in resultado_busca]).ask()
    escolha = escolha[8:]
    caminho = escolha.split("/")

#procuro o nome do item
    atual = estoque
    for nome in caminho[1:]:
        for espaco in atual["espacos"]:
            if espaco["nome"] == nome:
                atual = espaco
                break

#substituição do novo item
    for item in atual["itens"]:
        if item["nome"] == nome_item:
            novo_nome = input(f"Novo nome (atual: {item['nome']}): ") or item["nome"]
            nova_descricao = input(f"Nova descrição (atual: {item['descricao']}): ") or item["descricao"]
            try:
                nova_quantidade = int(input(f"Nova quantidade (atual: {item['quantidade']}): ") or item["quantidade"])
            except ValueError:
                print("Quantidade inválida. Edição cancelada.")
                return
#novos itens
            item["nome"] = novo_nome.lower()
            item["descricao"] = nova_descricao
            item["quantidade"] = nova_quantidade
            print("Item editado com sucesso!")
            return