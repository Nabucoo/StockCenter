def armazenar_local(caminho_atual, item):
    print(f"\nCaminho: {caminho_atual}")
    print(f"Nome: {item["nome"]}")
    if item["descricao"]:
        print(f"Descrição: {item["descricao"]}")
    print(f"Quantidade: {item["quantidade"]}")
    return [caminho_atual, item]


def buscar_item(estoque, nome, caminho="", resultado=[]):
    caminho_atual = f'{caminho}/{estoque["nome"]}' if caminho else estoque["nome"]
    for item in estoque["itens"]:
        if item["nome"] == nome:
            resultado.append(armazenar_local(caminho_atual, item))
    if estoque["espacos"]:
        for espaco in estoque["espacos"]:
            buscar_item(espaco, nome, caminho_atual, resultado)
    return resultado