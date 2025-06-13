#language: pt

Funcionalidade: CCR NOVO Consultar Inicacao Credito Pelo Fisco

Cenário: CT01: Consultar depósito bancário indicado pelo Fisco
    Dado que o usuário esteja na funcionalidade Conta Corrente > Depósito Bancário > Indicação pelo Fisco CT01.1
    Quando informar os parâmetros obrigatórios da consulta CT01.1
    E acionar o botão Consultar CT01.1
    Entao o sistema deve exibir a listagem de depósitos bancários indicados pelo Fisco de acordo com os parâmetros informados CT01.1

Cenário: CT02: Consultar sem preencher campos obrigatórios
    Dado que o usuário esteja na funcionalidade Conta Corrente > Depósito Bancário > Indicação pelo Fisco CT02.1
    Quando não informar os parâmetros obrigatórios da consulta CT02.1
    E acionar o botão Consultar CT02.1
    Entao o sistema exibe a msg2 “Pelo menos um campo deve ser preenchido.” CT02.1

Cenário: CT03: Exportar todos os registros da consulta
    Dado que o usuário esteja na funcionalidade Conta Corrente > Depósito Bancário > Indicação pelo Fisco CT03.1
    E tenha feito uma consulta válida CT03.1
    Quando acionar a opção exportar sem selecionar nenhum registro CT3.1
    Entao o sistema exporta todos os dados recuperados na consulta contendo os formatos TXT, PDF e Excel CT03.1

Cenário: CT04: Exportar registros selecionados
    Dado que o usuário esteja na funcionalidade Conta Corrente > Depósito Bancário > Indicação pelo Fisco CT04.1
    E tenha feito uma consulta válida CT04.1
    Quando selecionado registros da listagem CT04.1
    E selecionar a opção Exportar CT04.1
    Entao o sistema exporta todos os dados recuperados na consulta contendo os formatos TXT, PDF e Excel CT04.1

Cenário: CT05: Realizar extração de dados nos formatos Excel e TXT 
    Dado que o usuário esteja na funcionalidade Conta Corrente > Depósito Bancário > Indicação pelo Fisco CT05.1
    Quando acionar o botão Extração de Dados CT05.1
    E preencher os parâmetros da extração CT05.1
    E selecionar a opção Exportar CT05.1
    Entao o sistema apresenta o arquivo de acordo com a seleção realizada CT05.1
