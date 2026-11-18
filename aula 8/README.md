# Aula 8 — Formulário de cadastro

Adaptação do exemplo fornecido pelo professor. Foram preservados a organização dos arquivos, o CSS original, as funções `executar`, `chamarApi`, `validarForm`, `limparForm` e `mascararCelular`.

## Alterações
- Inclusão de seis campos: CPF, CEP, cidade, estado, curso e matrícula (10 campos de dados + checkbox de termos).
- Validação dos novos campos, do celular e do e-mail (desafio indicado pelo professor).
- Máscaras para CPF e CEP, além da máscara de celular já existente.
- Inclusão dos novos campos no JSON enviado por POST à API Postman Echo.

## Como testar
Abra `index.html` com Live Server no VS Code. Preencha com **dados fictícios** e clique em Enviar. É necessária conexão com a internet para o POST. A API ecoa os dados enviados e o retorno aparece em `alert`.

Observação: a validação de CPF e CEP verifica formato e quantidade de dígitos, não autenticidade. O exemplo do professor exige idade mínima de 18 anos; essa regra foi mantida.
