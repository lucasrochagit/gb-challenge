import { mock } from 'sinon';
import { SaleRepository } from '../../../../src/infrastructure/repository/sale.repository';
import { Sale } from '../../../../src/infrastructure/schema/sale.schema';
import { SaleMock } from '../../../mock/sale.mock';

describe('SaleRepository', () => {
  let model: any;
  let repository: SaleRepository;

  let info: any;
  let saleRequest: Sale;
  let saleResponse: Sale;
  let databaseError: any;

  beforeAll(() => {
    model = mock();
    repository = new SaleRepository(model);
    info = SaleMock.getInfo();
    saleRequest = SaleMock.asDocumentRequest(info);
    saleResponse = SaleMock.asDocumentResponse(info);
    databaseError = { message: 'Database Error' };
  });

  describe('create()', () => {
    describe('when create is successful', () => {
      it('should return the created sale', async () => {
        model.create = jest.fn().mockResolvedValueOnce(saleResponse);
        const result = await repository.create(saleRequest);
        expect(result).toMatchObject(saleResponse);
      });
    });

    describe('when an error occurs on database', () => {
      it('should return the database error', async () => {
        model.create = jest.fn().mockRejectedValueOnce(databaseError);
        try {
          await repository.create(saleRequest);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('find()', () => {
    describe('when find is successful', () => {
      it('should return a list of sales', async () => {
        model.find = jest.fn().mockResolvedValueOnce([saleResponse]);
        const result = await repository.find();
        expect(result).toMatchObject([saleResponse]);
      });
    });

    describe('when there is no sale', () => {
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
      it('should return the founded sale', async () => {
        model.findOne = jest.fn().mockResolvedValueOnce(saleResponse);
        const result = await repository.findOne({ _id: saleResponse.id });
        expect(result).toMatchObject(saleResponse);
      });
    });

    describe('when the sale is not founded', () => {
      it('should return null', async () => {
        model.findOne = jest.fn().mockResolvedValueOnce(null);
        const result = await repository.findOne({ _id: saleResponse.id });
        expect(result).toBeNull();
      });
    });

    describe('when an error occurs on database', () => {
      it('should return the database error', async () => {
        model.findOne = jest.fn().mockRejectedValueOnce(databaseError);
        try {
          await repository.findOne({ _id: saleResponse.id });
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('updateOne()', () => {
    describe('when updateOne is successful', () => {
      it('should return the updated sale', async () => {
        model.findOneAndUpdate = jest.fn().mockResolvedValueOnce(saleResponse);
        const result = await repository.updateOne(
          { _id: saleResponse.id },
          saleRequest,
        );
        expect(result).toMatchObject(saleResponse);
      });
    });

    describe('when the sale is not founded', () => {
      it('should return null', async () => {
        model.findOneAndUpdate = jest.fn().mockResolvedValueOnce(null);
        const result = await repository.updateOne(
          { _id: saleResponse.id },
          saleRequest,
        );
        expect(result).toBeNull();
      });
    });

    describe('when an error occurs on database', () => {
      it('should return the database error', async () => {
        model.findOneAndUpdate = jest.fn().mockRejectedValueOnce(databaseError);
        try {
          await repository.updateOne({ _id: saleResponse.id }, saleRequest);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('deleteOne()', () => {
    describe('when deleteOne is successful', () => {
      it('should return the deleted sale', async () => {
        model.findOneAndDelete = jest.fn().mockResolvedValueOnce(saleResponse);
        const result = await repository.deleteOne({ _id: saleResponse.id });
        expect(result).toMatchObject(saleResponse);
      });
    });

    describe('when sale is not founded', () => {
      it('should return null', async () => {
        model.findOneAndDelete = jest.fn().mockResolvedValueOnce(null);
        const result = await repository.deleteOne({ _id: saleResponse.id });
        expect(result).toBeNull();
      });
    });

    describe('when an error occurs on database', () => {
      it('should return the database error', async () => {
        model.findOneAndDelete = jest.fn().mockRejectedValueOnce(databaseError);
        try {
          await repository.deleteOne({ _id: saleResponse.id });
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('checkExists()', () => {
    describe('when checkExists is successful', () => {
      it('should return true', async () => {
        model.findOne = jest.fn().mockResolvedValueOnce(saleResponse);
        const result = await repository.checkExists({
          dealer_cpf: saleRequest.dealer_cpf,
        });
        expect(result).toEqual(true);
      });
    });

    describe('when the sale is not founded', () => {
      it('should return false', async () => {
        model.findOne = jest.fn().mockResolvedValueOnce(null);
        const result = await repository.checkExists({
          dealer_cpf: saleRequest.dealer_cpf,
        });
        expect(result).toEqual(false);
      });
    });

    describe('when an error occurs on database', () => {
      it('should return the database error', async () => {
        model.findOne = jest.fn().mockRejectedValueOnce(databaseError);
        try {
          await repository.checkExists({ dealer_cpf: saleRequest.dealer_cpf });
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });
});
