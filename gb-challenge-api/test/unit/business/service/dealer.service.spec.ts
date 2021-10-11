import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { mock } from 'sinon';
import { DealerModelMapper } from '../../../../src/business/mapper/dealer.model.mapper';
import { DealerModel } from '../../../../src/business/model/dealer.model';
import { DealerPasswordModel } from '../../../../src/business/model/dealer.password.model';
import { DealerService } from '../../../../src/business/service/dealer.service';
import { PasswordUtil } from '../../../../src/business/util/password.util';
import { Dealer } from '../../../../src/infrastructure/schema/dealer.schema';
import { DealerMock } from '../../../mock/dealer.mock';

describe('DealerService', () => {
  let service: DealerService;
  let repository: any;
  let mapper: DealerModelMapper;

  let dealerInfo: any;
  let dealerResponse: Dealer;
  let dealerRequestModel: DealerModel;
  let dealerResponseModel: DealerModel;
  let dealerPasswordRequestModel: DealerPasswordModel;
  let databaseError: any;

  beforeAll(() => {
    repository = mock();
    mapper = new DealerModelMapper();
    service = new DealerService(repository, mapper);

    dealerInfo = DealerMock.getInfo();
    dealerResponse = DealerMock.asDocumentResponse(dealerInfo);
    dealerRequestModel = DealerMock.asModelRequest(dealerInfo);
    dealerResponseModel = DealerMock.asModelResponse(dealerInfo);
    dealerPasswordRequestModel = DealerMock.asModelPasswordRequest({
      old_password: dealerInfo.password,
      new_password: 'myn3wp4ssw0rd',
    });
    databaseError = { message: 'Database Error' };
  });

  describe('create()', () => {
    describe('when create is successful', () => {
      it('should return the created dealer', async () => {
        repository.checkExists = jest.fn().mockResolvedValueOnce(false);
        repository.create = jest.fn().mockResolvedValueOnce(dealerResponse);

        const result = await service.create(dealerRequestModel);
        expect(result).toMatchObject(dealerResponseModel);
      });
    });

    describe('when dealer already exists', () => {
      it('should return an error for existent dealer', async () => {
        repository.checkExists = jest.fn().mockResolvedValueOnce(true);

        try {
          await service.create(dealerRequestModel);
        } catch (err) {
          expect(err).toMatchObject(
            new ConflictException(
              'A dealer with same cpf or email already exists.',
            ),
          );
        }
      });
    });

    describe('when a database error occurs', () => {
      it('should return an error for repository.checkExists', async () => {
        repository.checkExists = jest.fn().mockRejectedValueOnce(databaseError);

        try {
          await service.create(dealerRequestModel);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });

      it('should return an error for repository.create', async () => {
        repository.checkExists = jest.fn().mockResolvedValueOnce(false);
        repository.create = jest.fn().mockRejectedValueOnce(databaseError);

        try {
          await service.create(dealerRequestModel);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('find()', () => {
    describe('when find is successful', () => {
      it('should return a list of dealers', async () => {
        repository.find = jest.fn().mockResolvedValueOnce([dealerResponse]);

        const result = await service.find();
        expect(result).toMatchObject([dealerResponseModel]);
      });
    });

    describe('when there is no saved dealers', () => {
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
      it('should return the founded dealer', async () => {
        repository.findOne = jest.fn().mockResolvedValueOnce(dealerResponse);

        const result = await service.findById(dealerResponse.id);
        expect(result).toMatchObject(dealerResponseModel);
      });
    });

    describe('when the dealer is not founded', () => {
      it('should return an error', async () => {
        repository.findOne = jest.fn().mockResolvedValueOnce(null);

        try {
          await service.findById(dealerResponse.id);
        } catch (err) {
          expect(err).toMatchObject(
            new NotFoundException('Dealer not found or already removed.'),
          );
        }
      });
    });

    describe('when a database error occurs', () => {
      it('should return an error for repository.find', async () => {
        repository.findOne = jest.fn().mockRejectedValueOnce(databaseError);

        try {
          await service.findById(dealerResponse.id);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('updateById()', () => {
    describe('when updateById with single param is successful', () => {
      it('should return the updated dealer', async () => {
        repository.checkExists = jest.fn().mockResolvedValueOnce(false);
        repository.updateOne = jest.fn().mockResolvedValueOnce(dealerResponse);

        const singleParamModel = {
          full_name: dealerRequestModel.full_name,
        } as DealerModel;

        const result = await service.updateById(
          dealerResponse.id,
          singleParamModel,
        );
        expect(result).toMatchObject(dealerResponseModel);
      });
    });

    describe('when updateById with unique key fields is successful', () => {
      it('should return the updated dealer', async () => {
        repository.checkExists = jest.fn().mockResolvedValueOnce(false);
        repository.updateOne = jest.fn().mockResolvedValueOnce(dealerResponse);

        const result = await service.updateById(
          dealerResponse.id,
          dealerRequestModel,
        );
        expect(result).toMatchObject(dealerResponseModel);
      });
    });

    describe('when already exists a dealer with unique key fields', () => {
      it('should return an error for existent dealer', async () => {
        repository.checkExists = jest.fn().mockResolvedValueOnce(true);

        try {
          await service.updateById(dealerResponse.id, dealerRequestModel);
        } catch (err) {
          expect(err).toMatchObject(
            new ConflictException(
              'A dealer with same cpf or email already exists.',
            ),
          );
        }
      });
    });

    describe('when the dealer is not founded', () => {
      it('should return an error', async () => {
        repository.checkExists = jest.fn().mockResolvedValueOnce(false);
        repository.updateOne = jest.fn().mockResolvedValueOnce(null);

        try {
          await service.updateById(dealerResponse.id, dealerRequestModel);
        } catch (err) {
          expect(err).toMatchObject(
            new NotFoundException('Dealer not found or already removed.'),
          );
        }
      });
    });

    describe('when a database error occurs', () => {
      it('should return an error for repository.checkExists', async () => {
        repository.checkExists = jest.fn().mockRejectedValueOnce(databaseError);

        try {
          await service.updateById(dealerResponse.id, dealerRequestModel);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });

      it('should return an error for repository.updateOne', async () => {
        repository.checkExists = jest.fn().mockResolvedValueOnce(false);
        repository.updateOne = jest.fn().mockRejectedValueOnce(databaseError);

        try {
          await service.updateById(dealerResponse.id, dealerRequestModel);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('updatePassword()', () => {
    describe('when updatePassword is successful', () => {
      it('should return nothing', async () => {
        repository.findOne = jest.fn().mockResolvedValueOnce(dealerResponse);
        repository.updateOne = jest.fn().mockResolvedValueOnce(dealerResponse);

        const result = await service.updatePassword(
          dealerResponse.id,
          dealerPasswordRequestModel,
        );
        expect(result).toBeUndefined();
      });
    });

    describe('when dealer is not founded', () => {
      it('should return an error', async () => {
        repository.findOne = jest.fn().mockResolvedValueOnce(null);

        try {
          await service.updatePassword(
            dealerResponse.id,
            dealerPasswordRequestModel,
          );
        } catch (err) {
          expect(err).toMatchObject(
            new NotFoundException('Dealer not found or already removed.'),
          );
        }
      });
    });

    describe('when old password does not match with current password', () => {
      it('should return an error', async () => {
        repository.findOne = jest.fn().mockResolvedValueOnce(dealerResponse);

        const invalidOldPassword = {
          old_password: 'randomPassword',
          new_password: dealerPasswordRequestModel.new_password,
        } as DealerPasswordModel;

        try {
          await service.updatePassword(dealerResponse.id, invalidOldPassword);
        } catch (err) {
          expect(err).toMatchObject(
            new BadRequestException(
              'Old password does not match with current password.',
            ),
          );
        }
      });
    });

    describe('when a database error occurs', () => {
      it('should return an error for repository.findOne', async () => {
        repository.findOne = jest.fn().mockRejectedValueOnce(databaseError);

        try {
          await service.updatePassword(
            dealerResponse.id,
            dealerPasswordRequestModel,
          );
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('deleteById()', () => {
    describe('when deleteById is successful', () => {
      it('should return nothing', async () => {
        repository.deleteOne = jest.fn().mockResolvedValueOnce(dealerResponse);

        const result = await service.deleteById(dealerResponse.id);
        expect(result).toBeUndefined();
      });
    });

    describe('when dealer is not founded', () => {
      it('should return an error', async () => {
        repository.deleteOne = jest.fn().mockResolvedValueOnce(null);

        try {
          await service.deleteById(dealerResponse.id);
        } catch (err) {
          expect(err).toMatchObject(
            new NotFoundException('Dealer not found or already removed.'),
          );
        }
      });
    });

    describe('when a database error occurs', () => {
      it('should return an error for repository.findOne', async () => {
        repository.deleteOne = jest.fn().mockRejectedValueOnce(databaseError);

        try {
          await service.deleteById(dealerResponse.id);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });
});
