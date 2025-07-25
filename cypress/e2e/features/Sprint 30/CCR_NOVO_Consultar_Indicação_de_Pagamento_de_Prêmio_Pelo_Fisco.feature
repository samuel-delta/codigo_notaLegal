#language: pt

Funcionalidade: CCR NOVO - Consultar Indicação de Pagamento de Prêmio pelo Fisco

Cenário: CT01: Consultar Indicação de Pagamento de Prêmio pelo Fisco
    Dado que o usuário tenha acessado o sistema CCR
    E que o usuário tenha acessado a funcionalidade Sorteio → Indicar Pagamento de Prêmio pelo Fisco
    E que o usuário informe os parâmetros necessários para consulta
    Quando o usuário acionar a opção “Consultar”
    Entao o sistema deverá exibir a listagem de registros de acordo com os parâmetros informados

Cenário: CT02: Consultar sem preencher campos obrigatórios
    Dado que o usuário tenha acessado o sistema CCR CT02.1
    E que o usuário tenha acessado a funcionalidade Sorteio → Indicar Pagamento de Prêmio pelo Fisco CT02.1
    E que o usuário não informe nenhum parâmetro obrigatório CT02.1
    Quando o usuário acionar a opção “Consultar” CT02.1
    Entao o sistema deverá exibir a mensagem MSG2: Pelo menos um campo deve ser preenchido CT02.1
    
Cenário: CT03: Exportar todos os registros da consulta
    Dado que o usuário tenha realizado uma consulta válida e obtido resultados CT03
    Quando o usuário acionar a opção Exportar sem selecionar nenhum registro CT03
    Entao o sistema deverá exportar todos os dados recuperados na consulta CT03

Cenário: CT04: Exportar registros selecionados
    Dado que o usuário tenha realizado uma consulta válida e obtido resultados CT04
    E que o usuário tenha selecionado alguns registros da listagem CT04
    Quando o usuário acionar a opção Exportar CT04
    Entao o sistema deverá exportar apenas os registros selecionados nos formatos TXT, PDF e Excel CT04

Cenário: CT05: Extração de dados [Excel e TXT] 
    Dado que o usuário deseja extrair os dados da consulta em TXT e EXCEL CT05
    Quando o usuário selecionar o botão Extração de Dados CT05
    E preencher os parâmetros CT05
    E clicar no botao exportar escolhendo a opção de arquivo TXT e Excel CT05
    Entao o sistema apresenta o arquivo de acordo com o selecionado CT05

