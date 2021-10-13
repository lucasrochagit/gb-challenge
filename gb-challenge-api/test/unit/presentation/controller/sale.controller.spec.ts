import { ConflictException, NotFoundException } from '@nestjs/common';
import { mock } from 'sinon';
import { SaleModel } from '../../../../src/business/model/sale.model';
import { SaleController } from '../../../../src/presentation/controller/sale.controller';
import { SaleDTO } from '../../../../src/presentation/dto/sale.dto';
import { SaleDTOMapper } from '../../../../src/presentation/mapper/sale.dto.mapper';
import { SaleMock } from '../../../mock/sale.mock';

describe('SaleController', () => {
  let controller: SaleController;
  let service: any;
  let mapper: SaleDTOMapper;

  let info: any;
  let saleResponseModel: SaleModel;
  let saleRequestDTO: SaleDTO;
  let saleResponseDTO: SaleDTO;

  beforeAll(() => {
    service = mock();
    mapper = new SaleDTOMapper();
    controller = new SaleController(service, mapper);

    info = SaleMock.getInfo(200);
    saleResponseModel = SaleMock.asModelResponse(info);
    saleRequestDTO = SaleMock.asDTORequest(info);
    saleResponseDTO = SaleMock.asDTOResponse(info);
  });

  describe('create()', () => {
    describe('when create is successful', () => {
      it('should return the created sale', async () => {
        service.create = jest.fn().mockResolvedValueOnce(saleResponseModel);

        const result = await controller.create(saleRequestDTO);
        expect(result).toMatchObject(saleResponseDTO);
      });
    });

    describe('when a sale with same cpf or email already exists', () => {
      it('should return an error', async () => {
        const exception = new ConflictException(
          'A sale with same cpf or email already exists.',
        );
        service.create = jest.fn().mockRejectedValueOnce(exception);

        try {
          await controller.create(saleRequestDTO);
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
          await controller.create(saleRequestDTO);
        } catch (err) {
          expect(err).toMatchObject(exception);
        }
      });
    });
  });

  describe('find()', () => {
    describe('when find is successful', () => {
      it('should return a list of sales', async () => {
        service.find = jest.fn().mockResolvedValueOnce([saleResponseModel]);

        const result = await controller.find();
        expect(result).toMatchObject([saleResponseDTO]);
      });
    });

    describe('when there is no saved sales', () => {
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
      it('should return an founded sale', async () => {
        service.findById = jest.fn().mockResolvedValueOnce(saleResponseModel);

        const result = await controller.findById({
          sale_id: saleResponseDTO.id,
        });
        expect(result).toMatchObject(saleResponseDTO);
      });
    });

    describe('when the sale is not founded', () => {
      it('should return the error', async () => {
        const exception = new NotFoundException(
          'Sale not found or already removed.',
        );
        service.findById = jest.fn().mockRejectedValueOnce(exception);

        try {
          await controller.findById({
            sale_id: saleResponseDTO.id,
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
            sale_id: saleResponseDTO.id,
          });
        } catch (err) {
          expect(err).toMatchObject(exception);
        }
      });
    });
  });

  describe('updateById()', () => {
    describe('when updateById is successful', () => {
      it('should return the updated sale', async () => {
        service.updateById = jest.fn().mockResolvedValueOnce(saleResponseModel);

        const result = await controller.updateById(
          {
            sale_id: saleResponseDTO.id,
          },
          saleRequestDTO,
        );
        expect(result).toMatchObject(saleResponseDTO);
      });
    });

    describe('when the sale is not founded', () => {
      it('should return an error', async () => {
        const exception = new NotFoundException(
          'Sale not found or already removed.',
        );
        service.updateById = jest.fn().mockRejectedValueOnce(exception);

        try {
          await controller.updateById(
            {
              sale_id: saleResponseDTO.id,
            },
            saleRequestDTO,
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
              sale_id: saleResponseDTO.id,
            },
            saleRequestDTO,
          );
        } catch (err) {
          expect(err).toMatchObject(exception);
        }
      });
    });
  });

  describe('deleteById()', () => {
    describe('when deleteById is successful', () => {
      it('should return the deleted sale', async () => {
        service.deleteById = jest.fn().mockResolvedValueOnce(saleResponseModel);

        const result = await controller.deleteById({
          sale_id: saleResponseDTO.id,
        });
        expect(result).toMatchObject(saleResponseDTO);
      });
    });

    describe('when the sale is not founded', () => {
      it('should return an error', async () => {
        const exception = new NotFoundException(
          'Sale not found or already removed.',
        );
        service.deleteById = jest.fn().mockRejectedValueOnce(exception);

        try {
          await controller.deleteById({
            sale_id: saleResponseDTO.id,
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
            sale_id: saleResponseDTO.id,
          });
        } catch (err) {
          expect(err).toMatchObject(exception);
        }
      });
    });
  });
});
