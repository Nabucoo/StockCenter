import questionary

#criar local pra armazenar items 
def criar_espaco(estoque):             
    nome_do_espaco = str(input("Digite o nome do novo espaço abaixo:\n"))
    while not nome_do_espaco.strip():
        nome_do_espaco = str(input("Nome inválido, digite um nome válido(para cancelar digite 'c'):\n"))
        if nome_do_espaco == 'c': 
            print("Operação cancelada!")
            return
        
    while estoque:
        if not estoque["espacos"]:
            estoque["espacos"].append({"nome": nome_do_espaco, "itens": [], "espacos": []})
            print("Espaço criado com sucesso!")
            return
        else:
            nome_lugar = questionary.select("", choices=["Local Atual"] + [espaco["nome"] for espaco in estoque["espacos"]]).ask()
            if nome_lugar == "Local Atual":
                estoque["espacos"].append({"nome": nome_do_espaco, "itens": [], "espacos": []})
                print("Espaço criado com sucesso!")
                return
            else:
                for espaco in estoque["espacos"]:
                    if nome_lugar == espaco["nome"]:
                        estoque = espaco
    else:
        estoque["nome"] = nome_do_espaco
        estoque["itens"] = []
        estoque["espacos"] = []
        return