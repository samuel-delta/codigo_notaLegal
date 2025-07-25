# language: pt

Funcionalidade: CCR NOVO- Visualizar Sorteio
  
  Contexto:
    Dado que o usuário esteja logado no ReceitaWeb VISUALIZAR_CT01
    E que o usuário esteja na funcionalidade "Manter Sorteio" VISUALIZAR_CT01


   Cenário: CT01 - Visualizar um sorteio
    Quando informar os parâmetros obrigatórios da consulta VISUALIZAR_CT01
    E acionar o botão Visualizar VISUALIZAR_CT01
    Então o sistema exibe os dados do sorteio selecionado. VISUALIZAR_CT01

  Cenário: CT02 - Visualizar mais de um registro
    Quando informar os parâmetros obrigatórios da consulta VISUALIZAR_CT02
    E selecionar mais de um registro VISUALIZAR_CT02
    E acionar o botão Visualizar VISUALIZAR_CT02
    Então o sistema exibe a mensagem "Para realizar essa ação é necessário selecionar somente um registro na tabela." VISUALIZAR_CT02