import { NotFoundException } from '@nestjs/common';
import { mock } from 'sinon';
import { SaleModelMapper } from '../../../../src/business/mapper/sale.model.mapper';
import { SaleModel } from '../../../../src/business/model/sale.model';
import { SaleService } from '../../../../src/business/service/sale.service';
import { Sale } from '../../../../src/infrastructure/schema/sale.schema';
import { SaleMock } from '../../../mock/sale.mock';

describe('SaleService', () => {
  let service: SaleService;
  let repository: any;
  let dealerRepository: any;
  let mapper: SaleModelMapper;

  let saleInfo: any;
  let saleResponse: Sale;
  let saleRequestModel: SaleModel;
  let saleResponseModel: SaleModel;
  let databaseError: any;

  beforeAll(() => {
    repository = mock();
    dealerRepository = mock();
    mapper = new SaleModelMapper();
    service = new SaleService(repository, dealerRepository, mapper);

    saleInfo = SaleMock.getInfo(200);
    saleResponse = SaleMock.asDocumentResponse(saleInfo);
    saleRequestModel = SaleMock.asModelRequest(saleInfo);
    saleResponseModel = SaleMock.asModelResponse(saleInfo);
    databaseError = { message: 'Database Error' };
  });

  describe('create()', () => {
    describe('when create is successful', () => {
      it('should return the created sale for value below R$ 1000,00', async () => {
        const info = SaleMock.getInfo(200);
        const request = SaleMock.asModelRequest(info);
        const response = SaleMock.asDocumentResponse(info);
        dealerRepository.checkExists = jest.fn().mockResolvedValueOnce(true);
        repository.checkExists = jest.fn().mockResolvedValueOnce(false);
        repository.create = jest.fn().mockResolvedValueOnce(response);

        const result = await service.create(request);
        expect(result).toMatchObject(response);
      });

      it('should return the created sale for value between R$ 1000,00 and R$ 1500', async () => {
        const info = SaleMock.getInfo(200);
        const request = SaleMock.asModelRequest(info);
        const response = SaleMock.asDocumentResponse(info);
        dealerRepository.checkExists = jest.fn().mockResolvedValueOnce(true);
        repository.checkExists = jest.fn().mockResolvedValueOnce(false);
        repository.create = jest.fn().mockResolvedValueOnce(response);

        const result = await service.create(request);
        expect(result).toMatchObject(response);
      });

      it('should return the created sale for value greather than or equal R$ 1500,00', async () => {
        const info = SaleMock.getInfo(1800);
        const request = SaleMock.asModelRequest(info);
        const response = SaleMock.asDocumentResponse(info);
        dealerRepository.checkExists = jest.fn().mockResolvedValueOnce(true);
        repository.checkExists = jest.fn().mockResolvedValueOnce(false);
        repository.create = jest.fn().mockResolvedValueOnce(response);

        const result = await service.create(request);
        expect(result).toMatchObject(response);
      });
    });

    describe('when dealer does not exists', () => {
      it('should return an error', async () => {
        const exception = new NotFoundException(
          'Dealer not found or already removed.',
        );
        dealerRepository.checkExists = jest
          .fn()
          .mockRejectedValueOnce(exception);

        try {
          await service.create(saleRequestModel);
        } catch (err) {
          expect(err).toMatchObject(exception);
        }
      });
    });

    describe('when a database error occurs', () => {
      it('should return an error for dealerRepsoitory.checkExists', async () => {
        dealerRepository.checkExists = jest
          .fn()
          .mockRejectedValueOnce(databaseError);

        try {
          await service.create(saleRequestModel);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });

      it('should return an error for repository.create', async () => {
        dealerRepository.checkExists = jest.fn().mockResolvedValueOnce(true);
        repository.create = jest.fn().mockRejectedValueOnce(databaseError);

        try {
          await service.create(saleRequestModel);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('find()', () => {
    describe('when find is successful', () => {
      it('should return a list of sales', async () => {
        repository.find = jest.fn().mockResolvedValueOnce([saleResponse]);

        const result = await service.find();
        expect(result).toMatchObject([saleResponseModel]);
      });
    });

    describe('when there is no saved sales', () => {
      it('should return an empty list', async () => {
        repository.find = jest.fn().mockResolvedValueOnce([]);

        const result = await service.find();
        expect(result).toMatchObject([]);
      });
    });

    describe('when a database error occurs', () => {
      it('should return an error for repository.find', async () => {
        repository.find = jest.fn().mockRejectedValueOnce(databaseError);

        try {
          await service.find();
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('findById()', () => {
    describe('when findById is successful', () => {
      it('should return the founded sale', async () => {
        repository.findOne = jest.fn().mockResolvedValueOnce(saleResponse);

        const result = await service.findById(saleResponse.id);
        expect(result).toMatchObject(saleResponseModel);
      });
    });

    describe('when the sale is not founded', () => {
      it('should return an error', async () => {
        repository.findOne = jest.fn().mockResolvedValueOnce(null);

        try {
          await service.findById(saleResponse.id);
        } catch (err) {
          expect(err).toMatchObject(
            new NotFoundException('Sale not found or already removed.'),
          );
        }
      });
    });

    describe('when a database error occurs', () => {
      it('should return an error for repository.find', async () => {
        repository.checkExists = jest.fn().mockResolvedValueOnce(true);
        repository.findOne = jest.fn().mockRejectedValueOnce(databaseError);

        try {
          await service.findById(saleResponse.id);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('updateById()', () => {
    describe('when updateById is successful', () => {
      it('should return the updated sale', async () => {
        dealerRepository.checkExists = jest.fn().mockResolvedValueOnce(true);
        repository.updateOne = jest.fn().mockResolvedValueOnce(saleResponse);

        const result = await service.updateById(
          saleResponse.id,
          saleRequestModel,
        );
        expect(result).toMatchObject(saleResponseModel);
      });
    });

    describe('when update dealer cpf and it does not exists', () => {
      it('should return an error', async () => {
        dealerRepository.checkExists = jest.fn();
        jest.fn().mockResolvedValueOnce(false);

        try {
          await service.updateById(saleResponse.id, saleRequestModel);
        } catch (err) {
          expect(err).toMatchObject(
            new NotFoundException('Dealer not found or already removed.'),
          );
        }
      });
    });

    describe('when the sale is not founded', () => {
      it('should return an error', async () => {
        dealerRepository.checkExists = jest.fn().mockResolvedValueOnce(true);
        repository.updateOne = jest.fn().mockResolvedValueOnce(null);

        try {
          await service.updateById(saleResponse.id, saleRequestModel);
        } catch (err) {
          expect(err).toMatchObject(
            new NotFoundException('Sale not found or already removed.'),
          );
        }
      });
    });

    describe('when a database error occurs', () => {
      it('should return an error for dealerRepository.checkExists', async () => {
        dealerRepository.checkExists = jest
          .fn()
          .mockRejectedValueOnce(databaseError);

        try {
          await service.updateById(saleResponse.id, saleRequestModel);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });

      it('should return an error for repository.updateOne', async () => {
        dealerRepository.checkExists = jest.fn().mockResolvedValueOnce(true);
        repository.updateOne = jest.fn().mockRejectedValueOnce(databaseError);

        try {
          await service.updateById(saleResponse.id, saleRequestModel);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('deleteById()', () => {
    describe('when deleteById is successful', () => {
      it('should return nothing', async () => {
        repository.deleteOne = jest.fn().mockResolvedValueOnce(saleResponse);

        const result = await service.deleteById(saleResponse.id);
        expect(result).toBeUndefined();
      });
    });

    describe('when sale is not founded', () => {
      it('should return an error', async () => {
        repository.deleteOne = jest.fn().mockResolvedValueOnce(null);

        try {
          await service.deleteById(saleResponse.id);
        } catch (err) {
          expect(err).toMatchObject(
            new NotFoundException('Sale not found or already removed.'),
          );
        }
      });
    });

    describe('when a database error occurs', () => {
      it('should return an error for repository.findOne', async () => {
        repository.deleteOne = jest.fn().mockRejectedValueOnce(databaseError);

        try {
          await service.deleteById(saleResponse.id);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });
});
