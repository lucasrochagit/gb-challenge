  <h1 align="center">GB Challenge API</h1>

## Descrição

API do Desafio Técnico requerido no processo seletivo do Grupo Boticário.

## Recursos Implementados

- ( ✓ ) CRUD de Revendedor (Criar, Listar, Buscar Por ID, Atualizar e Deletar Por ID)
- ( ✓ ) Endpoint para autenticação (JWT)
- ( ✓ ) Endpoint para atualização do token
- ( ✓ ) CRUD de compras (Criar, LIstar, Buscar por ID, Atualizar e Deletar Por ID)
- ( ✓ ) Endpoint para buscar o cashback acumulado de um revendedor
- ( ✓ ) Testes Unitários
- ( ✓ ) Testes de Integração

## Recursos Extras

- ( ✓ ) Coleção do Postman contendo todas as requisições suportadas pela API

## Recursos Futuros

- ( ✓ ) Suporte à paginação para requisições do tipo GET que retornam uma lista de dados;

## Validações Implementadas

`POST /dealers`

Validações:

- request body
  - full_name: string, é permitido apenas letras e um único espaço entre as palavras
  - cpf: string, formato XXX.XXX.XXX-XX, precisa ser válido de acordo com a regra da Receita Federal para CPFs
  - email: string, precisa ter um formado de email
  - password: string, precisa ter no mínimo 8 caracteres e no máximmo 20 caracteres

`GET /dealers/:dealer_id`

Validações:

- path params
  - dealer_id: precisa ter um formato de objectId

`PUT /dealers/:dealer_id`

Validações:

- path params
  - dealer_id: precisa ter um formato de objectId
- request body
  - full_name(opcional): string, é permitido apenas letras e um único espaço entre as palavras
  - cpf(opcional): string, formato XXX.XXX.XXX-XX, precisa ser válido de acordo com a regra da Receita Federal para CPFs
  - email(opcional): string, precisa ter um formado de email
  - password(opcional): string, precisa ter no mínimo 8 caracteres e no máximmo 20 caracteres

`DELETE /dealers/:dealer_id`

Validações:

- path params
  - dealer_id: precisa ter um formato de objectId

`PATCH /dealers/:dealer_id/password`

Validações:

- path params
  - dealer_id: precisa ter um formato de objectId
- request body
  - current_password(opcional): string, precisa ter no mínimo 8 caracteres e no máximmo 20 caracteres
  - new_password(opcional): string, precisa ter no mínimo 8 caracteres e no máximmo 20 caracteres

`POST /auth`

Validações:

- request body
  - login: string, pode ser o email ou o cpf, mesmas validações para cpf ou email de `POST /dealers`
  - password: string, precisa ter no mínimo 8 caracteres e no máximmo 20 caracteres

`POST /auth/refresh`

Validações:

- request body
  - access_token: string, precisa ser um token jwt válido
  - refresh_token: string, precisa ser um hexadecimal válido com tamanho 64

`POST /sales`

Validações:

- request body
  - code: string, é permitido apenas números
  - value: número, precisa ser maior que zero
  - date: string, formato dd/MM/yyyy
  - cpf: string, formato XXX.XXX.XXX-XX, precisa ser válido de acordo com a regra da Receita Federal para CPFs

`GET /sales/:sales_id`

Validações:

- path params
  - sales_id: precisa ter um formato de objectId

`PUT /sales/:sales_id`

Validações:

- path params
  - sales_id: precisa ter um formato de objectId
- request body
  - code(opcional): string, é permitido apenas números
  - value(opcional): número, precisa ser maior que zero
  - date(opcional): string, formato dd/MM/yyyy
  - cpf(opcional): string, formato XXX.XXX.XXX-XX, precisa ser válido de acordo com a regra da Receita Federal para CPFs

`DELETE /sales/:sales_id`

Validações:

- path params
  - dealer_id: precisa ter um formato de objectId

`GET /cashback`

Validações:

- query params
  - cpf: string, formato XXX.XXX.XXX-XX, precisa ser válido de acordo com a regra da Receita Federal para CPFs

## Instruções de Execução

Para baixar o projeto:

`git clone https://github.com/lucasrochagit/gb-challenge.git`

Para executar o projeto, abra a pasta `gb-challenge-api` com a sua IDE favorita e siga o passo-a-passo ilustrado no
[README](https://github.com/lucasrochagit/gb-challenge/blob/main/gb-challenge-api/README.md) da API.
