import questionary
from gerenciar import buscar_item

def remover_item(estoque, nome):
    copia_estoque = estoque.copy()
    resultado_busca = buscar_item.buscar_item(estoque, nome)
    if resultado_busca:
        print(f"Itens com o nome {resultado_busca[0][1]["nome"]}")
        buscar_item.printar_item(resultado_busca)
        print(f"\nSelecione o caminho do item {resultado_busca[0][1]["nome"]} que deseja remover abaixo:")
        escolha = questionary.select("Qual deseja remover?", choices=[f"Caminho: {item[0]}" for item in resultado_busca]).ask()
        escolha = escolha[8:]
        escolha = escolha.split("/")
        if len(escolha) == 1:
            for item in estoque["itens"]:
                if item["nome"] == nome:
                    while True:
                        quantidade = int(input("Digíte a quantidade que deseja remover: ") or 1)
                        if quantidade > item["quantidade"]:
                            print("Valor inválido")
                        else:
                            item["quantidade"] -= quantidade
                            break
                    if item["quantidade"] <= 0:
                        estoque["itens"].remove(estoque["itens"][estoque["itens"].index(item)])
        else:
            for dir in escolha[1:]:
                for espaco in estoque["espacos"]:
                    if espaco["nome"] == dir:
                        estoque = estoque["espacos"][estoque["espacos"].index(espaco)]
            for item in estoque["itens"]:
                if item["nome"] == nome:
                    while True:
                        quantidade = int(input("Digíte a quantidade que deseja remover: ") or 1)
                        if quantidade > item["quantidade"]:
                            print("Valor inválido")
                        else:
                            item["quantidade"] -= quantidade
                            break
                    if item["quantidade"] <= 0:
                        estoque["itens"].remove(estoque["itens"][estoque["itens"].index(item)])                 
        return
    else: 
        print("Item não encontrado!")