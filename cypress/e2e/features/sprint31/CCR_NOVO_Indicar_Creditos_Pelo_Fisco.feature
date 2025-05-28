#language: pt

Funcionalidade: CCR NOVO Indicar Credtios Pelo Fisco

Cenário:  CT01: Indicar depósito bancário pelo Fisco 
    Dado que o usuário esteja na funcionalidade Conta Corrente, Depósito Bancário, Indicação pelo Fisco
    Quando selecionar um ou mais registros de depósito bancário
    E acionar a opção Indicar
    Então o sistema deve registrar a indicação dos depósitos selecionados pelo Fisco exibindo a mensagem de sucesso correspondente

Cenário: CT02: Indicar depósito bancario sem preencher campos obrigatórios
    Dado que o usuário esteja na funcionalidade Conta Corrente, Depósito Bancário, Indicação pelo Fisco CT02
    #Quando tentar indicar sem preencher um ou mais campos obrigatórios
    #Então sistema deve exibir mensagens de validação informando os campos obrigatórios não preenchidos sem realizar a indicação dos depósitos bancários