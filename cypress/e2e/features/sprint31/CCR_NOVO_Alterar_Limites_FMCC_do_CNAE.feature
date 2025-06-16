#language: pt

Funcionalidade: CCR NOVO Alterar Limites FMCC do CNAE

Cenário: CT01: Realizar alteração de limites por CNAE 
    Dado que o usuário esteja na funcionalidade manter limites e FMCC do CNAE CT01
    Quando selecionar um CNAE existente CT01
    E acionar o botão “Alterar Limites” CT01
    E alterar os valores de limite permitidos CT01
    E acionar o botão Salvar CT01
    Entao o sistema deve registrar a alteração dos limites para o CNAE selecionado e exibir mensagem de sucesso correspondente CT01

Cenário: CT02: Alterar sem preencher campos obrigatórios
    Dado que o usuário esteja na funcionalidade manter limites e FMCC do CNAE CT02
    Quando selecionar um CNAE existente CT02
    E acionar o botão “Alterar Limites” CT02
    E deixar os campos Limite Diário e ou Limite Mensal vazios CT02
    E acionar o botão Salvar CT02
    Entao o sistema exibe mensagem informando que os campos são obrigatórios e não realiza a alteração CT02

