import { HttpStatus, INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { getId } from 'json-generator';
import { Model } from 'mongoose';
import * as Request from 'supertest';
import {
  Auth,
  AuthDocument,
} from '../../src/infrastructure/schema/auth.schema';
import {
  Dealer,
  DealerDocument,
} from '../../src/infrastructure/schema/dealer.schema';
import { bootstrapTest } from '../app/test.app';
import { DealerMock } from '../mock/dealer.mock';
import {
  validateBadRequestBody,
  validateBadRequestDTOBody,
  validateUnauthorizedBody,
} from '../util/exception.validation.util';
import { cleanCollections, create, deleteMany } from '../util/schema.util';
import { TokenUtil } from '../util/token.util';

describe('AuthController', () => {
  let app: INestApplication;
  let dealerModel: Model<DealerDocument>;
  let authModel: Model<AuthDocument>;
  let request: Request.SuperTest<Request.Test>;
  let dealerInfo: any;
  let savedDealer: any;
  let authInfo: any;

  beforeAll(async () => {
    app = await bootstrapTest();
    dealerModel = app.get(getModelToken(Dealer.name));
    authModel = app.get(getModelToken(Auth.name));
    await app.init();
    request = Request(app.getHttpServer());

    dealerInfo = DealerMock.getInfo();
    savedDealer = await create(dealerModel, {
      ...dealerInfo,
      password: dealerInfo.password_encrypted,
    });
  });

  afterAll(async () => {
    await cleanCollections([dealerModel, authModel]);
    await app.close();
  });

  describe('POST /auth', () => {
    describe('when auth is successful', () => {
      describe('when auth is done with email', () => {
        it('should return the access token and refresh token', async () => {
          const response = await request
            .post('/auth')
            .send({ login: dealerInfo.email, password: dealerInfo.password })
            .expect(HttpStatus.OK);
          validateSuccessBody(response.body);
          authInfo = response.body;
        });
      });

      describe('when auth is done with cpf', () => {
        it('should return the access token and refresh token', async () => {
          const response = await request
            .post('/auth')
            .send({ login: dealerInfo.cpf, password: dealerInfo.password })
            .expect(HttpStatus.OK);
          validateSuccessBody(response.body);
          authInfo = response.body;
        });
      });
    });

    describe('when delaer is already authenticated', () => {
      it('should return the access token and refresh token', async () => {
        const response = await request
          .post('/auth')
          .send({ login: dealerInfo.email, password: dealerInfo.password })
          .expect(HttpStatus.OK);
        validateSuccessBody(response.body);
        authInfo = response.body;
      });
    });

    describe('when authentication fails', () => {
      it('should return error for invalid credentials', async () => {
        const response = await request
          .post('/auth')
          .send({ login: 'another@mail.com', password: dealerInfo.password })
          .expect(HttpStatus.UNAUTHORIZED);

        validateUnauthorizedBody(
          response.body,
          'Invalid credentials. Please try again with valid credentials.',
        );
      });
    });

    describe('when validation error occurs', () => {
      it('should return error for missing fields', async () => {
        const response = await request
          .post('/auth')
          .send({})
          .expect(HttpStatus.BAD_REQUEST);

        validateBadRequestDTOBody(response.body, [
          'login should not be null or undefined',
          'password should not be null or undefined',
        ]);
      });

      it('should return error for invalid login', async () => {
        const response = await request
          .post('/auth')
          .send({ login: 'invalidLogin', password: dealerInfo.password })
          .expect(HttpStatus.BAD_REQUEST);

        validateBadRequestDTOBody(response.body, [
          'login must be a valid CPF or a valid email',
        ]);
      });

      it('should return error for invalid password', async () => {
        const response = await request
          .post('/auth')
          .send({ login: dealerInfo.email, password: '123' })
          .expect(HttpStatus.BAD_REQUEST);

        validateBadRequestDTOBody(response.body, [
          'password must be longer than or equal to 8 characters',
        ]);
      });
    });
  });

  describe('POST /auth/refresh', () => {
    describe('when refresh token is successful', () => {
      it('should return the access token and refresh token', async () => {
        const response = await request
          .post('/auth/refresh')
          .send({
            access_token: authInfo.access_token,
            refresh_token: authInfo.refresh_token,
          })
          .expect(HttpStatus.OK);
        validateSuccessBody(response.body);
        authInfo = response.body;
      });
    });

    describe('when the owner does not exist', () => {
      it('should return an error for invalid access token', async () => {
        const response = await request
          .post('/auth/refresh')
          .send({
            access_token: TokenUtil.generateAccessToken(getId('objectId')),
            refresh_token: TokenUtil.generateRefreshToken(),
          })
          .expect(HttpStatus.BAD_REQUEST);

        validateBadRequestBody(
          response.body,
          'Invalid access token. Please reauthenticate.',
        );
      });
    });

    describe('when the access token does not match with the saved access token', () => {
      it('should return an error for invalid access token', async () => {
        const response = await request
          .post('/auth/refresh')
          .send({
            access_token: TokenUtil.generateAccessToken(
              savedDealer._id.toString(),
            ),
            refresh_token: authInfo.refresh_token,
          })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestBody(
          response.body,
          'Invalid access token. Please reauthenticate.',
        );
      });
    });

    describe('when the refresh token does not match with the saved refresh token', () => {
      it('should return an error for invalid refresh token', async () => {
        const response = await request
          .post('/auth/refresh')
          .send({
            access_token: authInfo.access_token,
            refresh_token: TokenUtil.generateRefreshToken(),
          })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestBody(
          response.body,
          'Invalid refresh token. Please reauthenticate.',
        );
      });
    });

    describe('when the auth data does not exists', () => {
      it('should return an error for invalid access token', async () => {
        await deleteMany(authModel);
        const response = await request
          .post('/auth/refresh')
          .send({
            access_token: authInfo.access_token,
            refresh_token: authInfo.refresh_token,
          })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestBody(
          response.body,
          'Invalid access token. Please reauthenticate.',
        );
      });
    });
  });

  const validateSuccessBody = (body: any) => {
    expect(body).toHaveProperty('access_token');
    expect(body).toHaveProperty('refresh_token');
    expect(body).toHaveProperty('token_type', 'Bearer');
    expect(body).toHaveProperty('expires_in');
  };
});
