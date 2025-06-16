def buscar_item(estoque, nome, caminho="", resultado=None):
    if resultado is None:
        resultado = []
    caminho_atual = f'{caminho}/{estoque["nome"]}' if caminho else estoque["nome"]
    for item in estoque["itens"]:
        if item["nome"] == nome:
            resultado.append([caminho_atual, item])
    if estoque["espacos"]:
        for espaco in estoque["espacos"]:
            buscar_item(espaco, nome, caminho_atual, resultado)
    return resultado

def printar_item(resultado):
    if resultado:
        for item in resultado:
            print(f"\nCaminho: {item[0]}")
            print(f"Nome: {item[1]["nome"]}")
            if item[1]["descricao"]:
                print(f"Descrição: {item[1]["descricao"]}")
            print(f"Quantidade: {item[1]["quantidade"]}")
    else:
        print("O item não foi encontrado!")
    return
