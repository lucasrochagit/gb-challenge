import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { DealerRepository } from '../../../../src/infrastructure/repository/dealer.repository';
import {
  Dealer,
  DealerDocument,
} from '../../../../src/infrastructure/schema/dealer.schema';
import { bootstrapTest } from '../../../app/test.app';
import { DealerMock } from '../../../mock/dealer.mock';

describe('DealerRepository', () => {
  let model: Model<DealerDocument>;
  let repository: DealerRepository;
  let dealerRequest: Dealer;
  let dealerResponse: Dealer;
  let databaseError: any;

  beforeAll(async () => {
    const app = await bootstrapTest();
    model = app.get<Model<DealerDocument>>(getModelToken(Dealer.name));
    repository = app.get<DealerRepository>(DealerRepository);
    dealerRequest = DealerMock.asDocumentRequest();
    dealerResponse = DealerMock.asDocumentResponse();
    databaseError = { message: 'Database Error' };
  });

  describe('create()', () => {
    describe('when create is successful', () => {
      it('should return the created dealer', async () => {
        model.create = jest.fn().mockResolvedValueOnce(dealerResponse);
        const result = await repository.create(dealerRequest);
        expect(result).toMatchObject(dealerResponse);
      });
    });

    describe('when an error occurs on database', () => {
      it('should return the database error', async () => {
        model.create = jest.fn().mockRejectedValueOnce(databaseError);
        try {
          await repository.create(dealerRequest);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('find()', () => {
    describe('when find is successful', () => {
      it('should return a list of dealers', async () => {
        model.find = jest.fn().mockResolvedValueOnce([dealerResponse]);
        const result = await repository.find();
        expect(result).toMatchObject([dealerResponse]);
      });
    });

    describe('when there is no dealer', () => {
      it('should return an empty list', async () => {
        model.find = jest.fn().mockResolvedValueOnce([]);
        const result = await repository.find();
        expect(result).toMatchObject([]);
      });
    });

    describe('when an error occurs on database', () => {
      it('should return the database error', async () => {
        model.find = jest.fn().mockRejectedValueOnce(databaseError);
        try {
          await repository.find();
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('findOne()', () => {
    describe('when findOne is successful', () => {
      it('should return the founded dealer', async () => {
        model.findOne = jest.fn().mockResolvedValueOnce(dealerResponse);
        const result = await repository.findOne({ _id: dealerResponse.id });
        expect(result).toMatchObject(dealerResponse);
      });
    });

    describe('when the dealer is not founded', () => {
      it('should return null', async () => {
        model.findOne = jest.fn().mockResolvedValueOnce(null);
        const result = await repository.findOne({ _id: dealerResponse.id });
        expect(result).toBeNull();
      });
    });

    describe('when an error occurs on database', () => {
      it('should return the database error', async () => {
        model.findOne = jest.fn().mockRejectedValueOnce(databaseError);
        try {
          await repository.findOne({ _id: dealerResponse.id });
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('updateOne()', () => {
    describe('when updateOne is successful', () => {
      it('should return the updated dealer', async () => {
        model.findOneAndUpdate = jest
          .fn()
          .mockResolvedValueOnce(dealerResponse);
        const result = await repository.updateOne(
          { _id: dealerResponse.id },
          dealerRequest,
        );
        expect(result).toMatchObject(dealerResponse);
      });
    });

    describe('when the dealer is not founded', () => {
      it('should return null', async () => {
        model.findOneAndUpdate = jest.fn().mockResolvedValueOnce(null);
        const result = await repository.updateOne(
          { _id: dealerResponse.id },
          dealerRequest,
        );
        expect(result).toBeNull();
      });
    });

    describe('when an error occurs on database', () => {
      it('should return the database error', async () => {
        model.findOneAndUpdate = jest.fn().mockRejectedValueOnce(databaseError);
        try {
          await repository.updateOne({ _id: dealerResponse.id }, dealerRequest);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('deleteOne()', () => {
    describe('when deleteOne is successful', () => {
      it('should return the deleted dealer', async () => {
        model.findOneAndDelete = jest
          .fn()
          .mockResolvedValueOnce(dealerResponse);
        const result = await repository.deleteOne({ _id: dealerResponse.id });
        expect(result).toMatchObject(dealerResponse);
      });
    });

    describe('when dealer is not founded', () => {
      it('should return null', async () => {
        model.findOneAndDelete = jest.fn().mockResolvedValueOnce(null);
        const result = await repository.deleteOne({ _id: dealerResponse.id });
        expect(result).toBeNull();
      });
    });

    describe('when an error occurs on database', () => {
      it('should return the database error', async () => {
        model.findOneAndDelete = jest.fn().mockRejectedValueOnce(databaseError);
        try {
          await repository.deleteOne({ _id: dealerResponse.id });
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('checkExists()', () => {
    describe('when checkExists is successful', () => {
      it('should return true', async () => {
        model.findOne = jest.fn().mockResolvedValueOnce(dealerResponse);
        const result = await repository.checkExists({
          cpf: dealerRequest.cpf,
        });
        expect(result).toEqual(true);
      });
    });

    describe('when the dealer is not founded', () => {
      it('should return false', async () => {
        model.findOne = jest.fn().mockResolvedValueOnce(null);
        const result = await repository.checkExists({
          cpf: dealerRequest.cpf,
        });
        expect(result).toEqual(false);
      });
    });

    describe('when an error occurs on database', () => {
      it('should return the database error', async () => {
        model.findOne = jest.fn().mockRejectedValueOnce(databaseError);
        try {
          await repository.checkExists({ cpf: dealerRequest.cpf });
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });
});
