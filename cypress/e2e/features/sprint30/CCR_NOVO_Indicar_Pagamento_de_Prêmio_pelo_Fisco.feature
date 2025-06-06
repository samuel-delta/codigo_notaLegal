#language: pt

Funcionalidade: CCR_NOVO_Indicar_Pagamento_de_Prêmio_pelo_Fisco

Cenário:  CT01: Indicar Pagamento de Prêmio pelo Fisco 
    Dado que o usuário está logado no sistema CCR CT01
    E acessa a funcionalidade de indicação de pagamento de prêmio pelo fisco CT01
    E realiza a consulta fornecendo os dados necessários CT01
    E visualiza a listagem de registros disponíveis CT01
    Quando o usuário selecionar um único registro na listagem CT01  
    E clicar no botão Indicar CT01
    Entao o sistema deve concluir a indicação de pagamento do registro e exibir a mensagem Operação Realizada com sucesso! CT01

Cenário: CT02: Seleção de múltiplos registros na indicação de pagamento
    Dado que o usuário está logado no sistema CCR CT02
    E acessa a funcionalidade de indicação de pagamento de prêmio pelo fisco CT02
    E realiza a consulta fornecendo os dados necessários CT02
    E visualiza a listagem de registros disponíveis CT02
    Quando o usuário selecionar mais de um único registro na listagem CT02  
    E clicar no botão Indicar CT02
    Entao o sistema não permitirá a indicação de pagamento e exibirá o alerta: Para realizar essa ação é necessário selecionar somente um registro na tabela CT02

Cenário: CT03: Indicação de pagamento sem informação bancária
    Dado que o usuário está logado no sistema CRR CT03
    E acessa a funcionalidade de indicação de pagamento de prêmio pelo fisco CT03
    E realiza a consulta fornecendo os dados necessários CT03
    E visualiza a listagem de registros disponíveis CT03
    E seleciona um único registro para indicação CT03
    Quando o usuário clica no botão Indicar e o sistema identifica que o contribuinte não possui indicação bancária cadastrada CT03
    Entao  o sistema não permitirá a indicação de pagamento e exibirá o alerta: Indicação bancária não realizada. CT03