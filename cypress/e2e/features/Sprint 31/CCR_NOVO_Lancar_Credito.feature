#language: pt

Funcionalidade: CCR NOVO Lançar Crédito

Cenário: CT01: Realizar lançamento FISCO - Débito - Com valor Acima do Saldo
    Dado que o usuário esteja na funcionalidade Lançamento FISCO -> Conta Corrente -> Manter Lançamento Fisco CT01
    Quando informar os dados obrigatórios para lançamento do tipo Débito e colocar saldo superior ao disponível CT01
    E acionar o botão “Efetuar Lançamento” CT01
    Entao o sistema não realiza o lançamento e informa amensagem: O valor informado para depósito é maior que o saldo disponível. CT01
    
Cenário: CT02: Realizar lançamento FISCO - Crédito - Com valor Acima do Saldo
    Dado que o usuário esteja na funcionalidade Lançamento FISCO -> Conta Corrente -> Manter Lançamento Fisco CT02
    Quando informar os dados obrigatórios para lançamento do tipo Crédito e colocar saldo superior ao disponível CT02
    E acionar o botão “Efetuar Lançamento” CT02
    Entao o sistema não realiza o lançamento e informa amensagem: O valor informado para depósito é maior que o saldo disponível. CT02

Cenário: CT03: Realizar lançamento FISCO - Ambos - Com valor Acima do Saldo
    Dado que o usuário esteja na funcionalidade Lançamento FISCO -> Conta Corrente -> Manter Lançamento Fisco CT03
    Quando informar os dados obrigatórios para lançamento do tipo Ambos e colocar saldo superior ao disponível CT03
    E acionar o botão “Efetuar Lançamento” CT03
    Entao o sistema não realiza o lançamento e informa amensagem: O valor informado para depósito é maior que o saldo disponível. CT03

Cenário: CT04: Realizar lançamento FISCO - Débito
    Dado que o usuário esteja na funcionalidade Lançamento FISCO -> Conta Corrente -> Manter Lançamento Fisco CT04
    Quando informar os dados obrigatórios para lançamento do tipo Débito e colocar saldo a baixo do disponível CT04
    E acionar o botão “Efetuar Lançamento” CT04
    Entao o sistema realiza o lançamento e informa amensagem: Operação realizada com sucesso. CT04

Cenário: CT05: Realizar lançamento FISCO - Crédito
    Dado que o usuário esteja na funcionalidade Lançamento FISCO -> Conta Corrente -> Manter Lançamento Fisco CT05
    Quando informar os dados obrigatórios para lançamento do tipo Crédito e colocar saldo a baixo do disponível CT05
    E acionar o botão “Efetuar Lançamento” CT05
    Entao o sistema realiza o lançamento e informa amensagem: Operação realizada com sucesso. CT05

Cenário: CT06: Realizar lançamento FISCO - Ambos
    Dado que o usuário esteja na funcionalidade Lançamento FISCO -> Conta Corrente -> Manter Lançamento Fisco CT06
    Quando informar os dados obrigatórios para lançamento do tipo Ambos e colocar saldo a baixo do disponível CT06
    E acionar o botão “Efetuar Lançamento” CT06
    Entao o sistema realiza o lançamento e informa amensagem: Operação realizada com sucesso. CT06
                  
Cenário: CT07: Validar campos obrigatórios no Lançamento FISCO 
    Dado que o usuário esteja na funcionalidade Lançamento FISCO -> Conta Corrente -> Manter Lançamento Fisco CT07
    Quando deixar de preencher um ou mais campos obrigatórios CT07
    E acionar o botão “Consultar” CT07
    Entao o sistema informa amensagem: Pelo menos um campo deve ser preenchido. CT07

Cenário: CT08: Selecionar múltiplos registros para Lançamento FISCO
    Dado que o usuário esteja na funcionalidade Lançamento FISCO -> Conta Corrente -> Manter Lançamento Fisco CT08
    Quando informar os dados obrigatórios CT08
    E acionar o botão “Consultar” CT08
    E escolher mais de um registros CT08
    E clicar em Lançar CT08
    Entao o sistema informa amensagem: Para realizar essa ação é necessário selecionar somente um registro na tabela. CT08
