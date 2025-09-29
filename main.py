import visualizar, os, questionary
from colorama import init, Back, Fore, Style
from configurar import adicionar_espaco, editar_espaco, remover_espaco, buscar_espaco
from gerenciar import criar_item, remover_item, buscar_item, editar_item

init(autoreset = True)#isso aqui é para inicializar o colorama

estoque = {}

def limpar_tela():
    os.system('cls' if os.name == 'nt' else 'clear')

def gerenciar(estoque):
    limpar_tela()
    while True:
        print("╔══════════════════════════════════════╗")
        print(Style.BRIGHT + "║" + "OPERACOES DE ESTOQUE 🔧".center(37) + "║")
        print("╚══════════════════════════════════════╝\n")
        print("╔══════════════════════════════════════╗")
        print("║" + "1 - Registrar produto ➕".center(37) + "║") #adicionar
        print("║" + "2 - Baixa de produto ❌".center(37) + "║") #remover
        print("║" + "3 - Consulta de item 🔍".center(37) + "║") #buscar
        print("║" + "4 - Atualizar cadastro ✏️".center(39) + "║") #editar
        print("║" + "5 - Voltar 🔙".center(37) + "║") #sair
        print("╚══════════════════════════════════════╝\n")

        resposta = questionary.select('Escolha uma opção:', choices=[
            '1',
            '2',
            '3',
            '4',
            '5'
        ]).ask()
        if resposta == "1":
            criar_item.criar_item(estoque)
        elif resposta == "2": 
            nome_item = str(input("Digite o nome do item abaixo:\n")).lower()
            remover_item.remover_item(estoque, nome_item)
            print("item removido!")
        elif resposta == "3":
            nome_item = str(input("Digite o nome do item abaixo:\n")).lower()
            resultado = ""
            resultado = buscar_item.buscar_item(estoque, nome_item)
            buscar_item.printar_item(resultado)

        elif resposta == "4":
            editar_item.editar_item(estoque)
        elif resposta == "5":
            return
        else:
            print("Valor inválido")
    
def configurar(estoque):
    limpar_tela()
    while True:
        print("╔══════════════════════════════════════╗")
        print(Style.BRIGHT + "║" + "CONFIGURAR ESTOQUE ⚙️".center(38) + "║")
        print("╚══════════════════════════════════════╝\n")
        print("╔══════════════════════════════════════╗")
        print("║" + "1 - Criar local de armazenagem 🏠".center(37) + "║") #adicionar
        print("║" + "2 - Editar local de armazenagem 🛠".center(38) + "║") #editar
        print("║" + "3 - Excluir local de armazenagem ❌".center(37) + "║") #excluir
        print("║" + "4 - Buscar local de armazenagem 🔎".center(37) + "║") #buscar
        print("║" + "5 - Voltar 🔙".center(37) + "║") #sair
        print("╚══════════════════════════════════════╝\n")
        
        resposta = questionary.select('Escolha uma opção:', choices=[
            '1',
            '2',
            '3',
            '4',
            '5',
        ]).ask()
        if resposta == "1":
            adicionar_espaco.criar_espaco(estoque)
        elif resposta == "2": 
            editar_espaco.editar_espaco(estoque)
        elif resposta == "3":
            nome_espaco = input("Digite o nome do espaço: ")
            remover_espaco.remover_espaco(estoque, nome_espaco)

        elif resposta == "4":
            nome_espaco = str(input("Digite o nome do espaco abaixo:\n")).lower()
            resultado = ""
            resultado = buscar_espaco.buscar_espaco(estoque, nome_espaco)
            buscar_espaco.printar_espaco(resultado)
        elif resposta == "5":
            return
        else:
            print("Valor inválido")

def MenuPrincipal():
    while True:
        print("╔══════════════════════════════════════╗")
        print(Style.BRIGHT + "║" + "STOCK CENTER SYSTEM".center(38) + "║")
        print("╚══════════════════════════════════════╝\n")
        print("╔══════════════════════════════════════╗")
        print(Style.BRIGHT + "║" + "MENU PRINCIPAL".center(38) + "║") #o .center centralize a string com base na quantidade de casas colocada como argumento
        print("║" + " ".center(38) + "║")
        print(Style.BRIGHT + "║" + "1 - Operações de estoque 🔧".center(37) + "║")
        print(Style.BRIGHT + "║" + "2 - Estrutura de estoque ⚙️".center(38) + "║")
        print(Style.BRIGHT + "║" + "3 - Inventário Atual 📊".center(37) + "║")
        print(Style.BRIGHT + "║" + "4 - Encerrar sessão 🚪".center(37) + "║")
        print("╚══════════════════════════════════════╝\n")

        resposta = questionary.select('Escolha uma opção:', choices=[
            '1',
            '2',
            '3',
            '4',
        ]).ask()
        if resposta == "1":
            gerenciar(estoque)
        elif resposta == "2": 
            configurar(estoque)
        elif resposta == "3":
            print("╔══════════════════════════════════════╗")
            print(Style.BRIGHT + "║" + "Inventário atual 📊".center(37) + "║") 
            print("╚══════════════════════════════════════╝\n")
            visualizar.visualizar_estoque(estoque)
        elif resposta == "4":
            print(Fore.GREEN + "Sessão encerrada!")
            exit()
        else:
            print(Fore.RED + "Valor inválido❌")
MenuPrincipal()