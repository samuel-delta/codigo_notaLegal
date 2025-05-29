#language: pt

Funcionalidade: CCR NOVO - Consultar Debloqueio do Premio

Cenário: CT01: Consultar Desbloqueio de Prêmio
    Dado que o usuário deseja realizar a consulta de desbloqueio de prêmio do sorteio do programa de concessão de crédito
    E o usuario acessa o sistema CC2
    E o usuario acessa o menu Sorteio, Desbloquear Premio, Consultar
    E o usuario informa os parâmetros para a consulta
    Quando o usuário aciona a opção Consultar
    Entao o sistema deve exibir a listagem de registros conforme os parâmetros informados

Cenário: CT02: Consultar Desbloqueio de Prêmio - Campos Obrigatórios Não Preenchidos
    Dado que o usuário deseja realizar a consulta de desbloqueio de prêmio do sorteio do programa de concessão de crédito CT02
    E o usuario acessa o sistema CC2 CT02
    E o usuario acessa o menu Sorteio, Desbloquear Premio, Consultar CT02
    E o usuario NÃO informa os parâmetros para a consulta CT02
    Quando o usuário aciona a opção Consultar
    Entao o sistema deve apresentar a mensagem MSG2 Pelo menos um campo deve ser preenchido. CT02

Cenário: CT03: Exportar Registros Recuperados na Consulta
    Dado que o usuário realizou uma consulta de desbloqueio de prêmio CT03
    E o sistema exibiu uma listagem de registros CT03
    Quando o usuário aciona a opção Exportar sem selecionar nenhum registro CT03
    Entao o sistema deve exportar todos os registros recuperados na consulta exibindo a mensagem: Será exportado todos os itens da consulta, ao passar o cursor CT03

Cenário: CT04: Exportar Registros Selecionados na Consulta
    Dado que o usuário realizou uma consulta de desbloqueio de prêmio CT04
    E o sistema exibiu uma listagem de registros CT04
    E o usuário selecionou alguns registros específicos CT04
    Quando o usuário aciona a opção Exportar CT04
    Entao o sistema deve exportar apenas os registros selecionados CT04