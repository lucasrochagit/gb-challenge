import { HttpStatus, INestApplication } from '@nestjs/common';
import * as Request from 'supertest';
import { bootstrapTest } from '../app/test.app';

describe('AppController', () => {
  let app: INestApplication;
  let request: Request.SuperTest<Request.Test>;

  beforeAll(async () => {
    app = await bootstrapTest();
    await app.init();
    request = Request(app.getHttpServer());
  });

  afterAll(async () => {
    await app.close();
  });

  describe('GET /', () => {
    it('should return hello world', () => {
      return request.get('/').expect(HttpStatus.OK).expect('Hello World!');
    });
  });
});
