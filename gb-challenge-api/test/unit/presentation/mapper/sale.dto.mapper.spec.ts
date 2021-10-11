import { SaleModel } from '../../../../src/business/model/sale.model';
import { SaleDTO } from '../../../../src/presentation/dto/sale.dto';
import { SaleDTOMapper } from '../../../../src/presentation/mapper/sale.dto.mapper';
import { SaleMock } from '../../../mock/sale.mock';

describe('SaleDTOMapper', () => {
  let mapper: SaleDTOMapper;
  let info: any;
  let model: SaleModel;
  let dtoRequest: SaleDTO;
  let dtoResponse: SaleDTO;

  beforeAll(() => {
    mapper = new SaleDTOMapper();
    info = SaleMock.getInfo();
    model = SaleMock.asModelResponse(info);
    dtoRequest = SaleMock.asDTORequest(info);
    dtoResponse = SaleMock.asDTOResponse(info);
  });

  describe('serialize()', () => {
    describe('when parse a model to a dto', () => {
      it('should return the mapped dto', () => {
        const result = mapper.serialize(model);
        expect(result).toHaveProperty('id', undefined);
        expect(result).toHaveProperty('code', dtoResponse.code);
        expect(result).toHaveProperty('value', dtoResponse.value);
        expect(result).toHaveProperty('date', dtoResponse.date);
        expect(result).toHaveProperty('status', dtoResponse.status);
        expect(result).toHaveProperty(
          'cashback_percentage',
          dtoResponse.cashback_percentage,
        );
        expect(result).toHaveProperty(
          'cashback_value',
          dtoResponse.cashback_value,
        );
        expect(result).toHaveProperty('dealer_cpf', undefined);
        expect(result).toHaveProperty('created_at', undefined);
        expect(result).toHaveProperty('updated_at', undefined);
      });
    });

    describe('when model is null', () => {
      it('should return a empty dto', () => {
        const result = mapper.serialize(null);
        expect(result).toMatchObject({} as SaleDTO);
      });
    });

    describe('when model is empty', () => {
      it('should return a empty dto', () => {
        const result = mapper.serialize(new SaleModel());
        expect(result).toMatchObject({} as SaleDTO);
      });
    });
  });

  describe('deserialize()', () => {
    describe('when parse a dto to a model', () => {
      it('should return the mapped model', () => {
        const result = mapper.deserialize(dtoRequest);
        expect(result).toHaveProperty('id', undefined);
        expect(result).toHaveProperty('code', model.code);
        expect(result).toHaveProperty('value', model.value);
        expect(result).toHaveProperty('date', model.date);
        expect(result).toHaveProperty('status', undefined);
        expect(result).toHaveProperty('cashback_percentage', undefined);
        expect(result).toHaveProperty('cashback_value', undefined);
        expect(result).toHaveProperty('dealer_cpf', model.dealer_cpf);
        expect(result).toHaveProperty('created_at', undefined);
        expect(result).toHaveProperty('updated_at', undefined);
      });
    });

    describe('when the dto is null', () => {
      it('should return a empty model', () => {
        const result = mapper.deserialize(null);
        expect(result).toMatchObject(new SaleModel());
      });
    });

    describe('when the dto is empty', () => {
      it('should return a empty model', () => {
        const result = mapper.deserialize({} as SaleDTO);
        expect(result).toMatchObject(new SaleModel());
      });
    });
  });
});
