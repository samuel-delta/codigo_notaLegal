#language: pt

Funcionalidade: CCR NOVO - Consultar Bilhete 

Cenário: CT01: Consultar Bilhete
    Dado que o usuário deseja consultar o bilhete no sorteio do programa de concessão de credito estando na pagina Manter Bilhete
    Quando o usuário preencher os parâmetros para consulta
    E clicar no botão Consultar
    Entao o sistema deve apresentar os registros de acordo com os parâmetros informados.

Cenário: CT02: Consultar Bilhete [Campos Obrigatórios]
    Dado que o usuário deseja consultar o bilhete no sorteio do programa de concessão de credito estando na pagina Manter Bilhete CT02
    Quando o usuário não preenche os campos obrigatórios CT02
    E clica no botão Consultar CT02
    Entao o sistema deve apresentar a mensagem MSG2 “Pelo menos um campo deve ser preenchido”.

Cenário: CT03: Exportar Histórico [TXT, EXCEL E PDF]
    Dado  que o usuário deseja exportar os dados da consulta em PDF, EXCEL E TXT estando na pagina Manter Bilhete CT03
    Quando preencher campos obrigatórios CT03
    E aciona o botão Consultar CT03
    E acionar o botão Exportar selecionando as opções “PDF; EXCEL; TXT” CT03
    Entao o sistema apresenta o arquivo com os dados de acordo com os selecionados CT03.1

Cenário: CT04: Extrair dados [Excel e TXT]
    Dado que o usuário deseja extrair os dados da consulta em TXT e EXCEL estando na pagina Manter Bilhete CT04
    Quando o usuário selecionar o botão “Extração de Dados” CT04.1
    E preencher os parâmetros CT04.1
    E selecionar a opção “Exportar” selecionando as opções “EXCEL; TXT” CT04
    Entao o sistema vai apresentar o arquivo com os dados passados no parametro CT04
    