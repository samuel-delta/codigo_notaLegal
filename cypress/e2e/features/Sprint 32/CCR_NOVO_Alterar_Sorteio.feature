#language: pt

Funcionalidade: CCR NOVO - Alterar Sorteio


Cenário: CT01: Alterar sorteio
    Dado que o usuário esteja na funcionalidade "Manter Sorteio" 
    E tenha acessado o sorteio desejado para alteração
    Quando atualizar os campos permitidos com dados válidos
    E acionar o botão "Alterar"
    Então confirma a alteração no modal
    E exibe a mensagem de confirmação “Sorteio alterado com sucesso!”

Cenário: CT02: Alterar sorteio [campos obrigatórios]
    Dado que o usuário esteja na funcionalidade "Manter Sorteio"
    E tenha acessado o sorteio desejado para alteração
    Quando remover ou deixar em branco campos obrigatórios
    E acionar o botão "Alterar"
    Então o sistema exibe mensagens de erro indicando os campos obrigatórios não preenchidos
    