def buscar_espaco(estoque, nome, caminho="", resultado=None):   
    if resultado is None:
        resultado = []
        
    caminho_atual = f'{caminho}/{estoque["nome"]}' if caminho else estoque["nome"]
    
    if estoque["nome"] == nome:
        resultado.append([caminho_atual, estoque])
            
    for espaco in estoque["espacos"]:
        buscar_espaco(espaco, nome, caminho_atual, resultado)
        
    return resultado

def printar_espaco(resultado):
    if resultado:
        for espaco in resultado:
            print(f"\nCaminho: {espaco[0]}")
        return
    print("Espaço não encontrado.")
