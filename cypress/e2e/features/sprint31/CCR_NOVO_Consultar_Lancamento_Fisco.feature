#language: pt

Funcionalidade: CCR NOVO Consultar Lançamento Fisco

Cenário: CT01: Consultar lançamento Fisco
    Dado que o usuário esteja na funcionalidade Consultar Lançamento Fisco CT01
    Quando informar os parâmetros obrigatórios da consulta CT01
    E acionar o botão Consultar CT01
    Entao o sistema exibe a listagem de registros de acordo com os parâmetros informados CT01

Cenário: CT02: Consultar sem preencher campos obrigatórios
    Dado que o usuário esteja na funcionalidade Consultar Lançamento Fisco CT02
    Quando não informar os parâmetros obrigatórios da consulta CT02
    E acionar o botão Consultar CT02
    Entao o sistema exibe a mensagem: Pelo menos um campo deve ser preenchido. CT02

Cenário: CT03: Exportar todos os registros da consulta
    Dado que o usuário esteja na funcionalidade Consultar Lançamento Fisco CT03
    E tenha realizado uma consulta válida CT03
    Quando acionar a opção exportar sem selecionar nenhum registro CT03
    Entao o sistema exporta todos os dados recuperados na consulta nos formatos PDF, TXT e Excel CT03

Cenário: CT04: Exportar registros selecionados 
    Dado que o usuário esteja na funcionalidade Consultar Lançamento Fisco CT04
    E tenha realizado uma consulta válida CT04
    E tenha selecionado registros da listagem CT04
    Quando acionar a opção Exportar CT04
    Entao sistema exporta apenas os registros selecionados no formatos PDF, TXT e Excel CT04
    
Cenário: CT05: Realizar extração de dados nos formatos Excel e TXT
    Dado que o usuário esteja na funcionalidade Consultar Lançamento Fisco CT05
    Quando acionar o botão Extração de Dados CT05
    E preencher os parâmetros da extração CT05
    E selecionar a opção Exportar escolhendo os formatos TXT e Excel CT05
    Entao o sistema apresenta o arquivo de acordo com a seleção realizada CT05