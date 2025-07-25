#language: pt

Funcionalidade: CCR NOVO Indicar Credtios Pelo Fisco

Cenário:  CT01: Indicar depósito bancário pelo Fisco 
    Dado que o usuário esteja na funcionalidade Conta Corrente, Depósito Bancário, Indicação pelo Fisco
    Quando selecionar um registro de depósito bancário e acionar Indicar
    Então o sistema deve registrar a indicação dos depósitos selecionados pelo Fisco exibindo a mensagem de sucesso correspondente

Cenário: CT02: Indicar depósito bancario sem preencher campos obrigatórios
    Dado que o usuário esteja na funcionalidade Conta Corrente, Depósito Bancário, Indicação pelo Fisco CT02
    Quando tentar indicar sem preencher um ou mais campos obrigatórios CT02
    Então o sistema deve exibir mensagens de validação informando os campos obrigatórios não preenchidos sem realizar a indicação dos depósitos bancários CT02

Cenário:  CT03: Indicar selecionando múltiplos registros
    Dado que o usuário esteja na funcionalidade Conta Corrente, Depósito Bancário, Indicação pelo Fisco CT03.1
    Quando selecionar múltiplos registros de depósito bancário CT03.1
    E acionar a opção Indicar CT03.1
    Entao o sistema deve negar a indicação de depósito bancário e exibir a mensagem MSG1: Para realizar essa ação é necessário selecionar somente um registro na tabela. CT03.1

Cenário: CT04: Validar indicação pelo FISCO com valor acima do saldo disponível
    Dado que o usuário esteja na funcionalidade Conta Corrente, Depósito Bancário, Indicação pelo Fisco CT04
    Quando informar um valor superior ao saldo disponível CT04
    E acionar o botão “Efetuar Indicação” CT04
    Entao o sistema deve impedir o lançamento e exibir mensagem de erro “O valor informado para depósito é maior que o saldo disponível.” CT04