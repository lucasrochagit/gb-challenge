import { ConflictException, NotFoundException } from '@nestjs/common';
import { mock } from 'sinon';
import { DealerModel } from '../../../../src/business/model/dealer.model';
import { DealerController } from '../../../../src/presentation/controller/dealer.controller';
import { DealerDTO } from '../../../../src/presentation/dto/dealer.dto';
import { DealerDTOMapper } from '../../../../src/presentation/mapper/dealer.dto.mapper';
import { DealerMock } from '../../../mock/dealer.mock';

describe('DealerController', () => {
  let controller: DealerController;
  let service: any;
  let mapper: DealerDTOMapper;

  let info: any;
  let dealerResponseModel: DealerModel;
  let dealerRequestDTO: DealerDTO;
  let dealerResponseDTO: DealerDTO;

  beforeAll(() => {
    service = mock();
    mapper = new DealerDTOMapper();
    controller = new DealerController(service, mapper);

    info = DealerMock.getInfo();
    dealerResponseModel = DealerMock.asModelResponse(info);
    dealerRequestDTO = DealerMock.asDTORequest(info);
    dealerResponseDTO = DealerMock.asDTOResponse(info);
  });

  describe('create()', () => {
    describe('when create is successful', () => {
      it('should return the created dealer', async () => {
        service.create = jest.fn().mockResolvedValueOnce(dealerResponseModel);

        const result = await controller.create(dealerRequestDTO);
        expect(result).toMatchObject(dealerResponseDTO);
      });
    });

    describe('when a dealer with same cpf or email already exists', () => {
      it('should return an error', async () => {
        const exception = new ConflictException(
          'A dealer with same cpf or email already exists.',
        );
        service.create = jest.fn().mockRejectedValueOnce(exception);

        try {
          await controller.create(dealerRequestDTO);
        } catch (err) {
          expect(err).toMatchObject(exception);
        }
      });
    });

    describe('when an error occurs', () => {
      it('should return the error', async () => {
        const exception = { message: 'Database Error' };
        service.create = jest.fn().mockRejectedValueOnce(exception);

        try {
          await controller.create(dealerRequestDTO);
        } catch (err) {
          expect(err).toMatchObject(exception);
        }
      });
    });
  });

  describe('find()', () => {
    describe('when find is successful', () => {
      it('should return a list of dealers', async () => {
        service.find = jest.fn().mockResolvedValueOnce([dealerResponseModel]);

        const result = await controller.find();
        expect(result).toMatchObject([dealerResponseDTO]);
      });
    });

    describe('when there is no saved dealers', () => {
      it('should return an empty list', async () => {
        service.find = jest.fn().mockResolvedValueOnce([]);

        const result = await controller.find();
        expect(result).toMatchObject([]);
      });
    });

    describe('when an error occurs', () => {
      it('should return the error', async () => {
        const exception = { message: 'Database Error' };
        service.find = jest.fn().mockRejectedValueOnce(exception);

        try {
          await controller.find();
        } catch (err) {
          expect(err).toMatchObject(exception);
        }
      });
    });
  });

  describe('findById()', () => {
    describe('when findById is successful', () => {
      it('should return an founded dealer', async () => {
        service.findById = jest.fn().mockResolvedValueOnce(dealerResponseModel);

        const result = await controller.findById({
          dealer_id: dealerResponseDTO.id,
        });
        expect(result).toMatchObject(dealerResponseDTO);
      });
    });

    describe('when the dealer is not founded', () => {
      it('should return the error', async () => {
        const exception = new NotFoundException(
          'Dealer not found or already removed.',
        );
        service.findById = jest.fn().mockRejectedValueOnce(exception);

        try {
          await controller.findById({
            dealer_id: dealerResponseDTO.id,
          });
        } catch (err) {
          expect(err).toMatchObject(exception);
        }
      });
    });

    describe('when an error occurs', () => {
      it('should return the error', async () => {
        const exception = { message: 'Database Error' };
        service.findById = jest.fn().mockRejectedValueOnce(exception);

        try {
          await controller.findById({
            dealer_id: dealerResponseDTO.id,
          });
        } catch (err) {
          expect(err).toMatchObject(exception);
        }
      });
    });
  });

  describe('updateById()', () => {
    describe('when updateById is successful', () => {
      it('should return the updated dealer', async () => {
        service.updateById = jest
          .fn()
          .mockResolvedValueOnce(dealerResponseModel);

        const result = await controller.updateById(
          {
            dealer_id: dealerResponseDTO.id,
          },
          dealerRequestDTO,
        );
        expect(result).toMatchObject(dealerResponseDTO);
      });
    });

    describe('when the dealer is not founded', () => {
      it('should return an error', async () => {
        const exception = new NotFoundException(
          'Dealer not found or already removed.',
        );
        service.updateById = jest.fn().mockRejectedValueOnce(exception);

        try {
          await controller.updateById(
            {
              dealer_id: dealerResponseDTO.id,
            },
            dealerRequestDTO,
          );
        } catch (err) {
          expect(err).toMatchObject(exception);
        }
      });
    });

    describe('when an error occurs', () => {
      it('should return the error', async () => {
        const exception = { message: 'Database Error' };
        service.updateById = jest.fn().mockRejectedValueOnce(exception);

        try {
          await controller.updateById(
            {
              dealer_id: dealerResponseDTO.id,
            },
            dealerRequestDTO,
          );
        } catch (err) {
          expect(err).toMatchObject(exception);
        }
      });
    });
  });

  describe('deleteById()', () => {
    describe('when deleteById is successful', () => {
      it('should return the deleted dealer', async () => {
        service.deleteById = jest
          .fn()
          .mockResolvedValueOnce(dealerResponseModel);

        const result = await controller.deleteById({
          dealer_id: dealerResponseDTO.id,
        });
        expect(result).toMatchObject(dealerResponseDTO);
      });
    });

    describe('when the dealer is not founded', () => {
      it('should return an error', async () => {
        const exception = new NotFoundException(
          'Dealer not found or already removed.',
        );
        service.deleteById = jest.fn().mockRejectedValueOnce(exception);

        try {
          await controller.deleteById({
            dealer_id: dealerResponseDTO.id,
          });
        } catch (err) {
          expect(err).toMatchObject(exception);
        }
      });
    });

    describe('when an error occurs', () => {
      it('should return the error', async () => {
        const exception = { message: 'Database Error' };
        service.deleteById = jest.fn().mockRejectedValueOnce(exception);

        try {
          await controller.deleteById({
            dealer_id: dealerResponseDTO.id,
          });
        } catch (err) {
          expect(err).toMatchObject(exception);
        }
      });
    });
  });
});
