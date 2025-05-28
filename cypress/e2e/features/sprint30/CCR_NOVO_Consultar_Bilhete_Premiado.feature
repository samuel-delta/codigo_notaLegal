#language: pt

Funcionalidade: CCR NOVO - Consultar Bilhete Premiado

Cenário: CT01: Consultar bilhete premiado
    Dado que o usuário deseja consultar um bilhete premiado estando na tela Consultar Bilhetes Premiado
    Quando o usuário preenche os parâmetros para consulta
    E clicar no botão Consulta
    Entao o sistema deve apresentar os registros de acordo com os parâmetros informados

Cenário: CT02: Consultar Bilhete Premiado [Campos Obrigatórios]
    Dado que o usuário deseja consultar um bilhete premiado estando na tela Consultar Bilhetes Premiado CT02
    Quando o usuário NÃO preencher os campos obrigatórios CT02
    E clicar no botão Consultar CT02
    Entao o sistema deve apresentar a mensagem MSG2 “Pelo menos um campo deve ser preenchido" CT02

    