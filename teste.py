from PyInquirer import prompt

def seletor_interativo():
    perguntas = [
        {
            'type': 'list',
            'name': 'opcao',
            'message': 'Escolha uma opção:',
            'choices': ['Opção 1', 'Opção 2', 'Opção 3']
        }
    ]
    
    resposta = prompt(perguntas)
    print(f"Você escolheu: {resposta['opcao']}")

seletor_interativo()

