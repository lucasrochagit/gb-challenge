import { HttpStatus, INestApplication } from '@nestjs/common';
import { bootstrapTest } from '../app/test.app';
import * as Request from 'supertest';
import { getCpf } from 'json-generator';
import { validateBadRequestDTOBody } from '../util/exception.validation.util';

describe('CashbackController', () => {
  let app: INestApplication;
  let request: Request.SuperTest<Request.Test>;
  let cpf: string;

  beforeAll(async () => {
    app = await bootstrapTest();
    await app.init();
    request = Request(app.getHttpServer());
    
    cpf = getCpf(true);
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /cashback', () => {
    describe('when get cashback from dealer by cpf', () => {
      it('should return the cashback', async () => {
        const response = await request
          .get('/cashback')
          .query({ cpf })
          .expect(HttpStatus.OK);
        validateSuccessBody(response.body);
      });
    });

    describe('when there are validation errors', () => {
      it('should return an error for does not inform cpf', async () => {
        const response = await request
          .get('/cashback')
          .query({})
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'cpf should not be null or undefined',
        ]);
      });

      it('should return an error for inform invalid cpf', async () => {
        const response = await request
          .get('/cashback')
          .query({ cpf: '123.456.789.10' })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'cpf must comply with the RFB rules for CPF',
        ]);
      });

      it('should return an error for inform cpf without mask', async () => {
        const response = await request
          .get('/cashback')
          .query({ cpf: getCpf(false) })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'cpf must follow the pattern: XXX.XXX.XX-XX',
        ]);
      });
    });
  });

  const validateSuccessBody = (body: any) => {
    expect(body).toHaveProperty('dealer_cpf', cpf);
    expect(body).toHaveProperty('cashback_amount');
  };
});
