import { HttpStatus, INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { getCpf, getId, getStr } from 'json-generator';
import { Model } from 'mongoose';
import * as Request from 'supertest';
import {
  Dealer,
  DealerDocument,
} from '../../src/infrastructure/schema/dealer.schema';
import { DealerDTO } from '../../src/presentation/dto/dealer.dto';
import { bootstrapTest } from '../app/test.app';
import { DealerMock } from '../mock/dealer.mock';
import {
  validateBadRequestDTOBody,
  validateConflictBody,
  validateNotFoundBody,
} from '../util/exception.validation.util';
import { create, deleteMany } from '../util/schema.util';

describe('DealerController', () => {
  let app: INestApplication;
  let request: Request.SuperTest<Request.Test>;
  let model: Model<DealerDocument>;
  let info: any;
  let dealer: DealerDTO;
  let savedDealer: any;

  beforeAll(async () => {
    app = await bootstrapTest();
    model = app.get(getModelToken(Dealer.name));
    await app.init();
    request = Request(app.getHttpServer());

    info = DealerMock.getInfo();
    dealer = DealerMock.asDTORequest(info);
  });

  afterAll(async () => {
    await deleteMany(model);
    await app.close();
  });

  describe('POST /dealers', () => {
    describe('when create a dealer', () => {
      it('should return the created dealer', async () => {
        const response = await request
          .post('/dealers')
          .send(dealer)
          .expect(HttpStatus.CREATED);
        validateSuccessBody(response.body);
        savedDealer = response.body;
      });
    });

    describe('when dealer already exists', () => {
      it('should return an error for existent dealer', async () => {
        const response = await request
          .post('/dealers')
          .send(dealer)
          .expect(HttpStatus.CONFLICT);
        validateConflictBody(
          response.body,
          'A dealer with same cpf or email already exists.',
        );
      });
    });

    describe('when validation error occurs', () => {
      it('should return error for missing fields', async () => {
        const response = await request
          .post('/dealers')
          .send({})
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'full_name should not be null or undefined',
          'cpf should not be null or undefined',
          'email should not be null or undefined',
          'password should not be null or undefined',
        ]);
      });

      it('should return error for invalid full_name', async () => {
        const response = await request
          .post('/dealers')
          .send({ ...dealer, full_name: '1nv4l1d N4m3' })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'full_name must contains letters and a single space between words',
        ]);
      });

      it('should return error for invalid cpf', async () => {
        const response = await request
          .post('/dealers')
          .send({ ...dealer, cpf: '123.456.789-10' })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'cpf must comply with the RFB rules for CPF',
        ]);
      });

      it('should return error for invalid email', async () => {
        const response = await request
          .post('/dealers')
          .send({ ...dealer, email: 'invalidMail@' })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, ['email must be an email']);
      });

      it('should return error for invalid password', async () => {
        const response = await request
          .post('/dealers')
          .send({ ...dealer, password: '123' })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'password must be longer than or equal to 8 characters',
        ]);
      });
    });
  });

  describe('GET /dealers', () => {
    describe('when get a list of dealers', () => {
      it('should return a list of dealers', async () => {
        const response = await request.get('/dealers').expect(HttpStatus.OK);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(1);
        validateSuccessBody(response.body[0]);
      });
    });

    describe('when there is no saved dealers', () => {
      afterEach(async () => {
        await saveDealer();
      });
      it('should return an empty list', async () => {
        await deleteMany(model);
        const response = await request.get('/dealers').expect(HttpStatus.OK);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(0);
      });
    });
  });

  describe('GET /dealers/:dealer_id', () => {
    describe('when get a dealer by id', () => {
      it('should return the founded dealer', async () => {
        const response = await request
          .get(`/dealers/${savedDealer.id}`)
          .expect(HttpStatus.OK);
        validateSuccessBody(response.body);
      });
    });

    describe('when dealer is not founded', () => {
      it('should return an error for not found the dealer', async () => {
        const response = await request
          .get(`/dealers/${getId('objectId')}`)
          .expect(HttpStatus.NOT_FOUND);
        validateNotFoundBody(
          response.body,
          'Dealer not found or already removed.',
        );
      });
    });

    describe('when there are validation errors', () => {
      it('should return an error for invalid id', async () => {
        const response = await request
          .get('/dealers/123')
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'dealer_id must be a mongodb id',
        ]);
      });
    });
  });

  describe('PUT /dealers/:dealer_id', () => {
    describe('when update a dealer by id', () => {
      it('should return the updated dealer', async () => {
        const newName: string = `${info.full_name} New Name`;
        info.full_name = newName;
        const response = await request
          .put(`/dealers/${savedDealer.id}`)
          .send({ full_name: newName })
          .expect(HttpStatus.OK);
        validateSuccessBody(response.body);
      });
    });

    describe('when dealer is not founded', () => {
      it('should return an error for not found the dealer', async () => {
        const response = await request
          .put(`/dealers/${getId('objectId')}`)
          .send({ cpf: getCpf(true) })
          .expect(HttpStatus.NOT_FOUND);
        validateNotFoundBody(
          response.body,
          'Dealer not found or already removed.',
        );
      });
    });

    describe('when update a dealer with unique fields from another dealer', () => {
      let anotherDealer: any;
      beforeAll(async () => {
        anotherDealer = await create(model, DealerMock.getInfo());
      });

      it('should return an error for not being able to use the cpf', async () => {
        const response = await request
          .put(`/dealers/${savedDealer.id}`)
          .send({ cpf: anotherDealer.cpf })
          .expect(HttpStatus.CONFLICT);
        validateConflictBody(
          response.body,
          'A dealer with same cpf or email already exists.',
        );
      });

      it('should return an error for not being able to use the email', async () => {
        const response = await request
          .put(`/dealers/${savedDealer.id}`)
          .send({ email: anotherDealer.email })
          .expect(HttpStatus.CONFLICT);
        validateConflictBody(
          response.body,
          'A dealer with same cpf or email already exists.',
        );
      });
    });

    describe('when there are validation errors', () => {
      it('should return an error for invalid id', async () => {
        const response = await request
          .put('/dealers/123')
          .send({ cpf: getCpf(true) })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'dealer_id must be a mongodb id',
        ]);
      });

      it('should return for invalid full name', async () => {
        const response = await request
          .put(`/dealers/${savedDealer.id}`)
          .send({ full_name: '1nv4l1d N4m3' })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'full_name must contains letters and a single space between words',
        ]);
      });

      it('should return for invalid cpf', async () => {
        const response = await request
          .put(`/dealers/${savedDealer.id}`)
          .send({ cpf: '123.456.789-10' })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'cpf must comply with the RFB rules for CPF',
        ]);
      });

      it('should return for invalid email', async () => {
        const response = await request
          .put(`/dealers/${savedDealer.id}`)
          .send({ email: 'invalidMail@' })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, ['email must be an email']);
      });

      it('should return for try update password', async () => {
        const response = await request
          .put(`/dealers/${savedDealer.id}`)
          .send({ password: getStr(8, 'hex') })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'password cannot be updated from here, please use the appropiate endpoint for this action',
        ]);
      });
    });
  });

  describe('DELETE /dealers/:dealer_id', () => {
    describe('when delete a dealer by id', () => {
      it('should return nothing', async () => {
        const response = await request
          .delete(`/dealers/${savedDealer.id}`)
          .expect(HttpStatus.NO_CONTENT);
        expect(response.body).toMatchObject({});
      });
    });

    describe('when dealer is not founded', () => {
      it('should return an error for not found the dealer', async () => {
        const response = await request
          .delete(`/dealers/${getId('objectId')}`)
          .expect(HttpStatus.NOT_FOUND);
        validateNotFoundBody(
          response.body,
          'Dealer not found or already removed.',
        );
      });
    });

    describe('when there are validation errors', () => {
      it('should return an error for invalid id', async () => {
        const response = await request
          .delete('/dealers/123')
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'dealer_id must be a mongodb id',
        ]);
      });
    });
  });

  const saveDealer = async () => {
    const now = new Date();
    const result = await create(model, {
      ...dealer,
      password: info.password_encrypted,
      created_at: now,
      updated_at: now,
    });
    savedDealer = { ...result, id: result._id.toString() };
    delete savedDealer._id;
  };

  const validateSuccessBody = (body: any) => {
    expect(body).toHaveProperty('id');
    expect(body).toHaveProperty('full_name', info.full_name);
    expect(body).toHaveProperty('email', info.email);
    expect(body).toHaveProperty('cpf', info.cpf);
    expect(body).toHaveProperty('created_at');
    expect(body).toHaveProperty('updated_at');
  };
});
