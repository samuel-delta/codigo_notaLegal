#language: pt

Funcionalidade: CCR NOVO Listar FMCC do CNAE

Cenário: CT01: Validar alteração do nome da funcionalidade para “Manter limites e FMCC do CNAE”
    Dado que o usuário acesse o sistema
    Quando navegar até a funcionalidade correspondente
    Entao o sistema deve exibir o nome “Manter limites e FMCC do CNAE” no título da tela

Cenário: CT02: Exibir Colunas de Limites Diário e Mensal
    Dado que o usuário acesse a funcionalidade: Manter limites e FMCC do CNAE CT02
    Quando visualizar a lista de CNAEs cadastrados CT02
    Entao o sistema exibe as colunas: Limite Diário e Limite Mensal CT02

Cenário: CT03: Visualizar Botão Alterar Limites
    Dado que o usuário acesse a funcionalidade: Manter limites e FMCC do CNAE CT03
    Quando localizar um registro de CNAE CT03
    Entao o sistema exibe o botão: Alterar Limites CT03
