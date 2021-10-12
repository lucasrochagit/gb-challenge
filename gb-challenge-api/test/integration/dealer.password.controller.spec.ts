import { HttpStatus, INestApplication } from '@nestjs/common';
import { getModelToken } from '@nestjs/mongoose';
import { getId } from 'json-generator';
import { Model } from 'mongoose';
import * as Request from 'supertest';
import {
  Dealer,
  DealerDocument,
} from '../../src/infrastructure/schema/dealer.schema';
import { DealerDTO } from '../../src/presentation/dto/dealer.dto';
import { UpdateDealerPasswordDTO } from '../../src/presentation/dto/dealer.password.dto';
import { bootstrapTest } from '../app/test.app';
import { DealerMock } from '../mock/dealer.mock';
import {
  validateBadRequestBody,
  validateBadRequestDTOBody,
  validateNotFoundBody,
} from '../util/exception.validation.util';
import { create, deleteMany } from '../util/schema.util';

describe('DealerPasswordController', () => {
  let app: INestApplication;
  let request: Request.SuperTest<Request.Test>;
  let model: Model<DealerDocument>;
  let passwordInfo: any;
  let updatePasswordDTO: UpdateDealerPasswordDTO;
  let dealerInfo: any;
  let dealerDTO: DealerDTO;
  let savedDealer: any;

  beforeAll(async () => {
    app = await bootstrapTest();
    model = app.get(getModelToken(Dealer.name));
    await app.init();
    request = Request(app.getHttpServer());

    dealerInfo = DealerMock.getInfo();
    dealerDTO = DealerMock.asDTORequest(dealerInfo);
    passwordInfo = {
      old_password: dealerInfo.password,
      new_password: 'n3wP4ssw0rd',
    };
    updatePasswordDTO = DealerMock.asDTOPasswordRequest(passwordInfo);
    await saveDealer();
  });

  afterAll(async () => {
    await deleteMany(model);
    await app.close();
  });

  describe('PATCH /dealers/:dealer_id/password', () => {
    describe('when update a dealer password', () => {
      it('should return nothing', async () => {
        const response = await request
          .patch(`/dealers/${savedDealer.id}/password`)
          .send(updatePasswordDTO)
          .expect(HttpStatus.NO_CONTENT);
        expect(response.body).toMatchObject({});
      });
    });

    describe('when the dealer is not founded', () => {
      it('should return an error for not found the dealer', async () => {
        const response = await request
          .patch(`/dealers/${getId('objectId')}/password`)
          .send(updatePasswordDTO)
          .expect(HttpStatus.NOT_FOUND);
        validateNotFoundBody(
          response.body,
          'Dealer not found or already removed.',
        );
      });
    });

    describe('when the old password does not match with current password', () => {
      it('should return an error for mismatched passwords', async () => {
        const response = await request
          .patch(`/dealers/${savedDealer.id}/password`)
          .send(updatePasswordDTO)
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestBody(
          response.body,
          'Old password does not match with current password.',
        );
      });
    });

    describe('when there area validation errors', () => {
      it('should return an error for missing parameters', async () => {
        const response = await request
          .patch(`/dealers/${savedDealer.id}/password`)
          .send({})
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'old_password should not be null or undefined',
          'new_password should not be null or undefined',
        ]);
      });

      it('should return an error for invalid id', async () => {
        const response = await request
          .patch('/dealers/123/password')
          .send(updatePasswordDTO)
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'dealer_id must be a mongodb id',
        ]);
      });

      it('should return an error for invalid old password', async () => {
        const response = await request
          .patch(`/dealers/${savedDealer.id}/password`)
          .send({
            old_password: '123',
            new_password: updatePasswordDTO.new_password,
          })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'old_password must be longer than or equal to 8 characters',
        ]);
      });

      it('should return an error for invalid new password', async () => {
        const response = await request
          .patch(`/dealers/${savedDealer.id}/password`)
          .send({
            old_password: updatePasswordDTO.old_password,
            new_password: '123',
          })
          .expect(HttpStatus.BAD_REQUEST);
        validateBadRequestDTOBody(response.body, [
          'new_password must be longer than or equal to 8 characters',
        ]);
      });
    });
  });

  const saveDealer = async () => {
    const now = new Date();
    const result = await create(model, {
      ...dealerDTO,
      password: dealerInfo.password_encrypted,
      created_at: now,
      updated_at: now,
    });
    savedDealer = { ...result, id: result._id.toString() };
    delete savedDealer._id;
  };
});
