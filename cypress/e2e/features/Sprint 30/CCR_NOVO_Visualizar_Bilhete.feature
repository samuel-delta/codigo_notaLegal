#language: pt

Funcionalidade: CCR NOVO Visualizar Histórico Bilhete

Cenário: CT01: Visualizar Histórico Bilhete 
    Dado que o usuário precise visualizar o histórico do bilhete
    E esteja na tela “Manter Bilhete”
    E forneça os parâmetros necessários para a consulta
    Quando o usuário selecionar um registro
    E acionar o botão “Histórico”
    Entao o sistema apresenta a tela “Histórico” com os dados do registro selecionado.

Cenário: CT02: Visualizar Histórico Bilhete [Registro duplicado]
    Dado que o usuário precise visualizar o histórico do bilhete CT02
    E esteja na tela “Manter Bilhete” CT02
    E forneça os parâmetros necessários para a consulta CT02
    Quando o usuário selecionar mais de um registro CT02
    E acionar o botão “Histórico” CT02
    Entao o sistema apresenta a mensagem MSG1: Para realizar essa ação é necessário selecionador somente um registro na tabela. CT02