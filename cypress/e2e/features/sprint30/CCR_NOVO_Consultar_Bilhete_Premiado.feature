#language: pt

Funcionalidade: CCR NOVO - Consultar Bilhete Premiado

Cenário: CT01: Consultar bilhete premiado
    Dado que o usuário deseja consultar um bilhete premiado estando na tela Consultar Bilhetes Premiado
    Quando o usuário preenche os parâmetros para consulta
    E clicar no botão Consulta
    Entao o sistema deve apresentar os registros de acordo com os parâmetros informados

Cenário: CT02: Consultar Bilhete Premiado [Campos Obrigatórios]
    Dado que o usuário deseja consultar um bilhete premiado estando na tela Consultar Bilhetes Premiado CT02
    Quando o usuário NÃO preencher os campos obrigatórios e clicar no botão Consultar CT02
    Entao o sistema deve apresentar a mensagem MSG2 “Pelo menos um campo deve ser preenchido" CT02

Cenário: CT03: Exportar relatório de bilhetes premiados [TXT, EXCEL E PDF] 
    Dado que o usuário deseja exportar os dados de um bilhete premiado em PDF, EXCEL e TXT, esteja na pagina certa e preencha os campos CT03
    Quando selecionar um ou mais registros CT03
    E acionar o botão Exportar selecionando as opções PDF, TXT e EXCEL CT03
    Entao o sistema apresenta o arquivo de acordo com os selecionados CT03

Cenário: CT04: Extrair dados [Excel, TXT e PDF]
    Dado que o usuário deseja extrair os dados da consulta TXT, Excel e PDF, esteja na pagina certa e preencha os campos CT04
    Quando selecionar um ou mais registros CT04
    E acionar o botão Exportar selecionando as opções PDF, TXT e EXCEL CT04
    Entao o sistema apresenta o arquivo com os dados de acordo com os selecionados CT04

Cenário: CT05: Consultar bilhete premiado [Dados invalidos]
    Dado que o usuario deseja consultar um bilhete premiado, estando na tela Cosultar Bilhete Premiado CT05
    Quando o usuario preencher os parâmetros para consulta com dados invalidos CT05
    E clicar no botão Consultar CT05
    Entao o sistema deve apresentar o resultado sem registro CT05
