import { BadRequestException } from '@nestjs/common';
import { getCpf } from 'json-generator';
import { mock } from 'sinon';
import { CashbackModelMapper } from '../../../../src/business/mapper/cashback.model.mapper';
import { CashbackModel } from '../../../../src/business/model/cashback.model';
import { CashbackService } from '../../../../src/business/service/cashback.service';
import { CashbackMock } from '../../../mock/cashback.mock';

describe('CashbackService', () => {
  let service: CashbackService;
  let repository: any;
  let mapper: CashbackModelMapper;

  let info: any;
  let cashbackResponse: any;
  let cashbackModelResponse: CashbackModel;
  let dealerCpf: string;

  beforeAll(() => {
    repository = mock();
    mapper = new CashbackModelMapper();
    service = new CashbackService(repository, mapper);

    info = CashbackMock.getInfo();
    dealerCpf = getCpf();
    cashbackResponse = CashbackMock.asBodyResponse(info);
    cashbackModelResponse = CashbackMock.asModelResponse(info);
  });

  describe('getCashbackAmount()', () => {
    describe('when get cashback from cpf successfully', () => {
      it('should return the cashback amount', async () => {
        repository.get = jest.fn().mockResolvedValueOnce(cashbackResponse);

        const result = await service.getCashbackAmount(dealerCpf);
        expect(result).toMatchObject(cashbackModelResponse);
      });
    });

    describe('when the external request returns an error', () => {
      it('should return the error', async () => {
        const exception = new BadRequestException(
          'Cpf must contains only numbers',
        );
        repository.get = jest
          .fn()
          .mockRejectedValueOnce(exception.getResponse());

        try {
          await service.getCashbackAmount('123.456.789-00');
        } catch (err) {
          expect(err).toMatchObject(exception.getResponse());
        }
      });
    });
  });
});
