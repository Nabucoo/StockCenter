def visualizar_estoque(estoque): 
    if not estoque:
        print("estoque vazio!")
    else:
        print(estoque["nome"])
        if not estoque["itens"]:
            print("\tVazio!")
        else:
            for item in estoque["itens"]:
                print("\t" + item["nome"])
        
        if not estoque["espacos"]:
            print("\tVazio!")
        else:
            for espaco in estoque['espacos']:
                print(espaco["nome"])
                if espaco["itens"]:
                    for item in espaco["itens"]:
                        print("\t" + item["nome"])
                else:
                    print("\tVazio!")
