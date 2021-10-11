import { CashbackModel } from '../../../../src/business/model/cashback.model';
import { CashbackDTO } from '../../../../src/presentation/dto/cashback.dto';
import { CashbackDTOMapper } from '../../../../src/presentation/mapper/cashback.dto.mapper';
import { CashbackMock } from '../../../mock/cashback.mock';

describe('CashbackDTOMapper', () => {
  let mapper: CashbackDTOMapper;
  let info: any;
  let model: CashbackModel;
  let dto: CashbackDTO;

  beforeAll(() => {
    mapper = new CashbackDTOMapper();
    info = CashbackMock.getInfo();
    model = CashbackMock.asModelResponse(info);
    dto = CashbackMock.asDTOResponse(info);
  });

  describe('serialize()', () => {
    describe('when parse a model to a dto', () => {
      it('should return the mapped dto', () => {
        const result = mapper.serialize(model);
        expect(result).toHaveProperty('dealer_cpf', dto.dealer_cpf);
        expect(result).toHaveProperty('cashback_amount', dto.cashback_amount);
      });
    });

    describe('when model is null', () => {
      it('should return a empty dto', () => {
        const result = mapper.serialize(null);
        expect(result).toMatchObject({} as CashbackDTO);
      });
    });

    describe('when model is empty', () => {
      it('should return a empty dto', () => {
        const result = mapper.serialize(new CashbackModel());
        expect(result).toMatchObject({} as CashbackDTO);
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
