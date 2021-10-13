import { HttpStatus, INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { getCpf, getId } from 'json-generator';
import { Model } from 'mongoose';
import * as Request from 'supertest';
import { SaleEnum, SaleStatusEnum } from '../../src/business/enum/sale.enum';
import {
  Dealer,
  DealerDocument,
} from '../../src/infrastructure/schema/dealer.schema';
import {
  Sale,
  SaleDocument,
} from '../../src/infrastructure/schema/sale.schema';
import { DealerDTO } from '../../src/presentation/dto/dealer.dto';
import { SaleDTO } from '../../src/presentation/dto/sale.dto';
import { bootstrapTest } from '../app/test.app';
import { DealerMock } from '../mock/dealer.mock';
import { SaleMock } from '../mock/sale.mock';
import {
  validateBadRequestDTOBody,
  validateNotFoundBody,
} from '../util/exception.validation.util';
import { cleanCollections, create, deleteMany } from '../util/schema.util';

describe('SaleController', () => {
  let app: INestApplication;
  let request: Request.SuperTest<Request.Test>;
  let saleModel: Model<SaleDocument>;
  let dealerModel: Model<DealerDocument>;
  let saleInfo: any;
  let saleApprovedInfo: any;
  let saleDTO: SaleDTO;
  let saleApprovedDTO: SaleDTO;
  let savedSale: any;
  let dealerInfo: any;
  let dealerDTO: DealerDTO;
  let savedDealer: any;

  beforeAll(async () => {
    app = await bootstrapTest();
    saleModel = app.get(getModelToken(Sale.name));
    dealerModel = app.get(getModelToken(Dealer.name));
    await app.init();
    request = Request(app.getHttpServer());

    dealerInfo = DealerMock.getInfo();
    dealerDTO = DealerMock.asDTORequest(dealerInfo);
    saleInfo = SaleMock.getInfo(200);
    saleDTO = SaleMock.asDTORequest({
      ...saleInfo,
      dealer_cpf: dealerInfo.cpf,
    });
    saleApprovedInfo = {
      ...saleInfo,
      dealer_cpf: SaleEnum.DEALER_CPF_ALWAYS_APPROVE_SALE,
      status: SaleStatusEnum.APPROVED,
    };
    saleApprovedDTO = SaleMock.asDTORequest(saleApprovedInfo);
    await saveDealer(dealerInfo.cpf);
    await saveDealer(SaleEnum.DEALER_CPF_ALWAYS_APPROVE_SALE);
  });

  afterAll(async () => {
    await cleanCollections([saleModel, dealerModel]);
    await app.close();
  });

  describe('POST /sales', () => {
    describe('when create a sale', () => {
      it('should return the created sale', async () => {
        const response = await request
          .post('/sales')
          .send(saleDTO)
          .expect(HttpStatus.CREATED);
        validateSuccessBody(response.body, saleInfo);
        savedSale = response.body;
      });
    });

    describe(`when cpf from sale dealer is ${SaleEnum.DEALER_CPF_ALWAYS_APPROVE_SALE}`, () => {
      it('should return the created sale with status equals to "Aprovado"', async () => {
        const response = await request
          .post('/sales')
          .send(saleApprovedDTO)
          .expect(HttpStatus.CREATED);
        validateSuccessBody(response.body, saleApprovedInfo);
      });
    });

    describe('when the dealer is not founded by cpf', () => {
      it('should return an error for not found the dealer', async () => {
        const response = await request
          .post('/sales')
          .send({ ...saleDTO, dealer_cpf: getCpf(true) })
          .expect(HttpStatus.NOT_FOUND);
        validateNotFoundBody(
          response.body,
          'Dealer not found or already removed.',
        );
      });
    });

    describe('when validation error occurs', () => {
      it('should return error for missing fields', async () => {
        const response = await request
          .post('/sales')
          .send({})
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'code should not be null or undefined',
          'value should not be null or undefined',
          'date should not be null or undefined',
          'dealer_cpf should not be null or undefined',
        ]);
      });

      it('should return error for invalid code', async () => {
        const response = await request
          .post('/sales')
          .send({ ...saleDTO, code: 123 })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'code must be a number string',
        ]);
      });

      it('should return error for invalid value', async () => {
        const response = await request
          .post('/sales')
          .send({ ...saleDTO, value: -1 })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'value must not be less than 0',
        ]);
      });

      it('should return error for invalid date', async () => {
        const response = await request
          .post('/sales')
          .send({ ...saleDTO, date: new Date().toISOString() })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'date must be a valid locale date',
        ]);
      });

      it('should return error for invalid dealer cpf', async () => {
        const response = await request
          .post('/sales')
          .send({ ...saleDTO, dealer_cpf: '123.456.789-10' })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'dealer_cpf must comply with the RFB rules for CPF',
        ]);
      });

      it('should return error for try set autogenerated parameters', async () => {
        const response = await request
          .post('/sales')
          .send(saleInfo)
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'status is an automatically generated parameter and cannot be set',
          'cashback_percentage is an automatically generated parameter and cannot be set',
          'cashback_value is an automatically generated parameter and cannot be set',
        ]);
      });
    });
  });

  describe('GET /sales', () => {
    describe('when get a list of sales', () => {
      it('should return a list of sales', async () => {
        const response = await request.get('/sales').expect(HttpStatus.OK);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(2);

        const saleResult = response.body.find(
          (sale: any) => sale.status === SaleStatusEnum.IN_VALIDATION,
        );
        const saleApprovedResult = response.body.find(
          (sale: any) => sale.status === SaleStatusEnum.APPROVED,
        );
        validateSuccessBody(saleResult, saleInfo);
        validateSuccessBody(saleApprovedResult, saleApprovedInfo);
      });
    });

    describe('when there is no saved sales', () => {
      afterEach(async () => {
        await saveSale();
      });

      it('should return an empty list', async () => {
        await deleteMany(saleModel);
        const response = await request.get('/sales').expect(HttpStatus.OK);
        expect(response.body).toBeInstanceOf(Array);
        expect(response.body).toHaveLength(0);
      });
    });
  });

  describe('GET /sales/:sale_id', () => {
    describe('when get a sale by id', () => {
      it('should return the founded sale', async () => {
        const response = await request
          .get(`/sales/${savedSale.id}`)
          .expect(HttpStatus.OK);
        validateSuccessBody(response.body, saleInfo);
      });
    });

    describe('when sale is not founded', () => {
      it('should return an error for not found the sale', async () => {
        const response = await request
          .get(`/sales/${getId('objectId')}`)
          .expect(HttpStatus.NOT_FOUND);
        validateNotFoundBody(
          response.body,
          'Sale not found or already removed.',
        );
      });
    });

    describe('when there are validation errors', () => {
      it('should return an error for invalid id', async () => {
        const response = await request
          .get('/sales/123')
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'sale_id must be a mongodb id',
        ]);
      });
    });
  });

  describe('PUT /sales/:sale_id', () => {
    describe('when update a sale by id', () => {
      it('should return the updated sale', async () => {
        const newDate: Date = new Date();
        newDate.setDate(25);
        saleInfo.date = newDate.toLocaleDateString();
        const response = await request
          .put(`/sales/${savedSale.id}`)
          .send({ date: saleInfo.date })
          .expect(HttpStatus.OK);
        validateSuccessBody(response.body, saleInfo);
      });
    });

    describe('when sale is not founded', () => {
      it('should return an error for not found the sale', async () => {
        const response = await request
          .put(`/sales/${getId('objectId')}`)
          .send({ cpf: getCpf(true) })
          .expect(HttpStatus.NOT_FOUND);
        validateNotFoundBody(
          response.body,
          'Sale not found or already removed.',
        );
      });
    });

    describe('when there are validation errors', () => {
      it('should return error for invalid code', async () => {
        const response = await request
          .put(`/sales/${savedSale.id}`)
          .send({ code: 123 })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'code must be a number string',
        ]);
      });

      it('should return error for invalid value', async () => {
        const response = await request
          .put(`/sales/${savedSale.id}`)
          .send({ value: -1 })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'value must not be less than 0',
        ]);
      });

      it('should return error for invalid date', async () => {
        const response = await request
          .put(`/sales/${savedSale.id}`)
          .send({ date: new Date().toISOString() })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'date must be a valid locale date',
        ]);
      });

      it('should return error for invalid dealer cpf', async () => {
        const response = await request
          .put(`/sales/${savedSale.id}`)
          .send({ dealer_cpf: '123.456.789-10' })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'dealer_cpf must comply with the RFB rules for CPF',
        ]);
      });

      it('should return error for try update autogenerated parameters', async () => {
        const response = await request
          .put(`/sales/${savedSale.id}`)
          .send({
            status: saleInfo.status,
            cashback_percentage: saleInfo.cashback_percentage,
            cashback_value: saleInfo.cashback_value,
          })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'status is an automatically generated parameter and cannot be set',
          'cashback_percentage is an automatically generated parameter and cannot be set',
          'cashback_value is an automatically generated parameter and cannot be set',
        ]);
      });
    });
  });

  describe('DELETE /sales/:sale_id', () => {
    describe('when delete a sale by id', () => {
      it('should return nothing', async () => {
        const response = await request
          .delete(`/sales/${savedSale.id}`)
          .expect(HttpStatus.NO_CONTENT);
        expect(response.body).toMatchObject({});
      });
    });

    describe('when sale is not founded', () => {
      it('should return an error for not found the sale', async () => {
        const response = await request
          .delete(`/sales/${getId('objectId')}`)
          .expect(HttpStatus.NOT_FOUND);
        validateNotFoundBody(
          response.body,
          'Sale not found or already removed.',
        );
      });
    });

    describe('when there are validation errors', () => {
      it('should return an error for invalid id', async () => {
        const response = await request
          .delete('/sales/123')
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'sale_id must be a mongodb id',
        ]);
      });
    });
  });

  const saveSale = async () => {
    const now = new Date();
    const result = await create(saleModel, {
      ...saleInfo,
      dealer_cpf: dealerInfo.cpf,
      created_at: now,
      updated_at: now,
    });
    savedSale = { ...result, id: result._id.toString() };
    delete savedSale._id;
  };

  const saveDealer = async (cpf: string) => {
    const now = new Date();
    const result = await create(dealerModel, {
      ...dealerDTO,
      cpf,
      password: dealerInfo.password_encrypted,
      created_at: now,
      updated_at: now,
    });
    savedDealer = { ...result, id: result._id.toString() };
    delete savedDealer._id;
  };

  const validateSuccessBody = (body: any, info: any) => {
    expect(body).toHaveProperty('code', info.code);
    expect(body).toHaveProperty('value', info.value);
    expect(body).toHaveProperty('date', info.date);
    expect(body).toHaveProperty('status', info.status);
    expect(body).toHaveProperty('cashback_value');
    expect(body).toHaveProperty('cashback_percentage');
  };
});
