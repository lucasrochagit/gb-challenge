
  <h1 align="center">GB Challenge API</h1>

## Description

API of the Technical Challenge required in the selection process of Grupo Boticário.

## Installation
Create a copy from `.env.example` file named `.env` in project root. Fill the file `.env` according your preferred configurations.

Suggestion: 

```
# DATABASE_URL
# description: full url from database
# example: mongodb://<user>:<pwd>@<host>:<port>/database
DATABASE_URL=mongodb://localhost:27017/gb-challenge-api

# TEST_DATABASE_URL
# description: full database url only from tests
# example: mongodb://<user>:<pwd>@<host>:<port>/database
TEST_DATABASE_URL=mongodb://localhost:27017/gb-challenge-api-test

# ENV
# description: application environment, used to determine som
e API behavior in specific environments.
# example: dev, test, prod
ENV=dev

# PORT 
# description: application http port 
# example: 3000
PORT=3000

# JWT_SECRET
# description: secret key used to generate and validate tokens
# example: mYs3cR3tK3y
JWT_SECRET=mYs3cR3tK3y

# JWT_EXPIRATION
# description: jwt token expiration time 
# example: 8h
JWT_EXPIRATION=8h

# CASHBACK_AMOUNT_API_URL
# description: external api url used to query a dealer's accumulated cashback amount
# example: https://host.com/cashback?cpf=12345678900
CASHBACK_AMOUNT_API_URL=https://host.com/cashback?cpf=12345678900

# CASHBACK_AMOUNT_API_TOKEN
# description: token used in the external api request used to query a dealer's accumulated cashback amount
# example: 1a2b3c4d5e6f8g9h
CASHBACK_AMOUNT_API_TOKEN=1a2b3c4d5e6f8g9h
```

Then install dependencies:
```bash
$ npm install
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Test

```bash
# all tests
$ npm run test

# unit test
$ npm run test:unit

# integration tests
$ npm run test:integration

# test coverage
$ npm run test:cov
```

## Stay in touch

- Author - [Lucas Rocha](https://www.linkedin.com/in/lucasrochacc)

## License

API is [MIT licensed](LICENSE).
