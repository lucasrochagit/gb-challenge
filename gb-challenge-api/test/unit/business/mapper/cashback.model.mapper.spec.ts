import { CashbackModelMapper } from '../../../../src/business/mapper/cashback.model.mapper';
import { CashbackModel } from '../../../../src/business/model/cashback.model';
import { CashbackMock } from '../../../mock/cashback.mock';

describe('CashbackModelMapper', () => {
  let mapper: CashbackModelMapper;

  let info: any;
  let response: any;
  let model: CashbackModel;

  beforeAll(() => {
    mapper = new CashbackModelMapper();

    info = CashbackMock.getInfo();
    response = CashbackMock.asBodyResponse(info);
    model = CashbackMock.asModelResponse(info);
  });

  describe('serialize()', () => {
    describe('when serialize a response to model', () => {
      it('should return the mapped model', () => {
        const result = mapper.serialize(response);
        expect(result).toHaveProperty('dealer_cpf', info.dealer_cpf);
        expect(result).toHaveProperty('cashback_amount', info.cashback_amount);
      });
    });

    describe('when response does not have the expected params', () => {
      it('should return the mapped model', () => {
        const result = mapper.serialize({ body: { value: 10 } });
        expect(result).toMatchObject(new CashbackModel());
      });
    });

    describe('when response is null', () => {
      it('should return an empty model', () => {
        const result = mapper.serialize(null);
        expect(result).toMatchObject(new CashbackModel());
      });
    });

    describe('when response is empty', () => {
      it('should return an empty model', () => {
        const result = mapper.serialize({});
        expect(result).toMatchObject(new CashbackModel());
      });
    });
  });

  describe('deserialize()', () => {
    it('should throw error for method not implemented', () => {
      try {
        mapper.deserialize(model);
      } catch (err) {
        expect(err).toMatchObject(new Error('Method not implemented.'));
      }
    });
  });
});
