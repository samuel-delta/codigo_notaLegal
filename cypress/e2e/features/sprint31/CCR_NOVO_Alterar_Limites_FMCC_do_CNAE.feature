#language: pt

Funcionalidade: CCR NOVO Alterar Limites FMCC do CNAE

Cenário: CT01: Realizar alteração de limites por CNAE 
    Dado que o usuário esteja na funcionalidade manter limites e FMCC do CNAE CT01
    Quando selecionar um CNAE existente CT01
    E acionar o botão “Alterar Limites” CT01
    E alterar os valores de limite permitidos CT01
    E acionar o botão Salvar CT01
    Entao o sistema deve registrar a alteração dos limites para o CNAE selecionado CT01
    E exibir mensagem de sucesso correspondente CT01

