import { HttpStatus } from '@nestjs/common';
import { mock } from 'sinon';
import { CashbackModel } from '../../../../src/business/model/cashback.model';
import { CashbackController } from '../../../../src/presentation/controller/cashback.controller';
import { CashbackDTO } from '../../../../src/presentation/dto/cashback.dto';
import { CashbackDTOMapper } from '../../../../src/presentation/mapper/cashback.dto.mapper';
import { CashbackMock } from '../../../mock/cashback.mock';

describe('CashbackController', () => {
  let controller: CashbackController;
  let service: any;
  let mapper: CashbackDTOMapper;

  let info: any;
  let cashbackResponseModel: CashbackModel;
  let cashbackResponseDTO: CashbackDTO;

  beforeAll(() => {
    service = mock();
    mapper = new CashbackDTOMapper();
    controller = new CashbackController(service, mapper);

    info = CashbackMock.getInfo();
    cashbackResponseModel = CashbackMock.asModelResponse(info);
    cashbackResponseDTO = CashbackMock.asDTOResponse(info);
  });

  describe('getCashbackAmount()', () => {
    describe('when getCashbackAmount is successful', () => {
      it('should return the cashback info', async () => {
        service.getCashbackAmount = jest
          .fn()
          .mockResolvedValueOnce(cashbackResponseModel);

        const result = await controller.getCashbackAmount({
          cpf: info.dealer_cpf,
        });
        expect(result).toMatchObject(cashbackResponseDTO);
      });
    });

    describe('when an error occurs', () => {
      it('should return the error', async () => {
        const exception = {
          statusCode: HttpStatus.BAD_REQUEST,
          message: 'Invalid CPF',
        };
        service.getCashbackAmount = jest.fn().mockRejectedValueOnce(exception);

        try {
          await controller.getCashbackAmount({ cpf: info.dealer_cpf });
        } catch (err) {
          expect(err).toMatchObject(exception);
        }
      });
    });
  });
});
