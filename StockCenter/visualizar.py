from colorama import init, Style, Fore

init(autoreset = True)

def visualizar_estoque(estoque, caminho=""): 
    if estoque:
       
        caminho_atual = f'{caminho}/{estoque["nome"]}' if caminho else estoque["nome"]
        print( f"Local: {caminho_atual}")
        for item in estoque["itens"]:
            print(f"\tNome: {item["nome"]}")
            if item["descricao"]:
                print(f"\t\tDescrição: {item["descricao"]}")
            print(f"\t\tQuantidade: {item["quantidade"]}")

        if estoque["espacos"]:
            for espaco in estoque["espacos"]:
                visualizar_estoque(espaco, caminho_atual)
    else:
        print(Fore.RED + "╔══════════════════════════════════════╗")
        print(Style.BRIGHT +  Fore.RED + "║" + "Estoque vazio".center(38) + "║") 
        print(Fore.RED + "╚══════════════════════════════════════╝\n")
    print("")
