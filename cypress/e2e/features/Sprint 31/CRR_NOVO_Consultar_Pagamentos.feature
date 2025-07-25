#language: pt

Funcionalidade: CRR_NOVO_Consultar_Pagamentos

Cenário: CT01: Consultar Pagamento
    Dado que o usuário esteja na funcionalidade Consultar Pagamento CT01.2
    Quando informar os parâmetros obrigatórios da consulta CT01.2
    E acionar o botão Consultar CT01.2
    Entao o sistema exibe a listagem de registros de acordo com os parâmetros informados CT01.2

Cenário: CT02: Consultar sem preencher campos obrigatórios 
    Dado que o usuário esteja na funcionalidade Consultar Pagamento CT02.2
    Quando não informar os parâmetros obrigatórios da consulta CT02.2
    E acionar o botão Consultar CT02.2
    Entao o sistema exibe a msg2: Pelo menos um campo deve ser preenchido. CT02.2

Cenário: CT03: Exportar todos os registros da consulta
    Dado que o usuário esteja na funcionalidade Consultar Pagamento CT03.1
    E tenha realizado uma consulta válida CT03.1
    Quando acionar a opção exportar sem selecionar nenhum registro CT03.1
    Entao o sistema exporta todos os dados recuperados na consulta e permite a exportação nos formatos TXT, EXCEL e PDF CT03.1

Cenário: CT04: Exportar registros selecionados
    Dado que o usuário esteja na funcionalidade Consultar Pagamento CT4.1
    E tenha realizado uma consulta válida CT4.1
    E tenha selecionado registros da listagem CT4.1
    Quando acionar a opção Exportar CT04.1
    Entao o sistema exporta apenas os registros selecionados na consulta e permite a exportação nos formatos TXT, EXCEL e PDF CT04.1

Cenário: CT05: Realizar extração de dados nos formatos Excel e TXT
    Dado que o usuário esteja na funcionalidade Consultar Pagamento CT5.2
    Quando acionar o botão Extração de Dados CT05.2
    E preencher os parâmetros da extração CT05.2
    E selecionar a opção Exportar CT05.2
    E escolher os formatos de arquivo EXCEL e/ou TXT CT05.2
    Entao o sistema apresenta o arquivo de acordo com a seleção realizada CT05.2
