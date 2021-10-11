import { SaleModelMapper } from '../../../../src/business/mapper/sale.model.mapper';
import { SaleModel } from '../../../../src/business/model/sale.model';
import { Sale } from '../../../../src/infrastructure/schema/sale.schema';
import { SaleMock } from '../../../mock/sale.mock';

describe('SaleModelMapper', () => {
  let mapper: SaleModelMapper;
  let info: any;
  let schema: Sale;
  let model: SaleModel;

  beforeAll( () => {
    mapper = new SaleModelMapper();
    info = SaleMock.getInfo();
    schema = SaleMock.asDocumentResponse(info);
    model = SaleMock.asModelResponse(info);
  });

  describe('serialize()', () => {
    describe('when parse a schema to a model', () => {
      it('should return the mapped model', () => {
        const result = mapper.serialize(schema);
        expect(result).toHaveProperty('id', schema.id);
        expect(result).toHaveProperty('code', schema.code);
        expect(result).toHaveProperty('value', schema.value);
        expect(result).toHaveProperty('date', schema.date);
        expect(result).toHaveProperty('status', schema.status);
        expect(result).toHaveProperty(
          'cashback_percentage',
          schema.cashback_percentage,
        );
        expect(result).toHaveProperty('cashback_value', schema.cashback_value);
        expect(result).toHaveProperty('dealer_cpf', schema.dealer_cpf);
        expect(result).toHaveProperty('created_at', schema.created_at);
        expect(result).toHaveProperty('updated_at', schema.updated_at);
      });
    });

    describe('when schema is null', () => {
      it('should return a empty model', () => {
        const result = mapper.serialize(null);
        expect(result).toMatchObject(new SaleModel());
      });
    });

    describe('when schema is empty', () => {
      it('should return a empty model', () => {
        const result = mapper.serialize(new Sale());
        expect(result).toMatchObject(new SaleModel());
      });
    });
  });

  describe('deserialize()', () => {
    describe('when parse a model to a schema', () => {
      it('should return the mapped schema', () => {
        const result = mapper.deserialize(model);
        expect(result).toHaveProperty('id', undefined);
        expect(result).toHaveProperty('code', schema.code);
        expect(result).toHaveProperty('value', schema.value);
        expect(result).toHaveProperty('date', schema.date);
        expect(result).toHaveProperty('status', schema.status);
        expect(result).toHaveProperty(
          'cashback_percentage',
          schema.cashback_percentage,
        );
        expect(result).toHaveProperty('cashback_value', schema.cashback_value);
        expect(result).toHaveProperty('dealer_cpf', schema.dealer_cpf);
        expect(result).toHaveProperty('created_at', undefined);
        expect(result).toHaveProperty('updated_at', undefined);
      });
    });

    describe('when the model is null', () => {
      it('should return a empty schema', () => {
        const result = mapper.deserialize(null);
        expect(result).toMatchObject(new Sale());
      });
    });

    describe('when the model is empty', () => {
      it('should return a empty schema', () => {
        const result = mapper.deserialize(new SaleModel());
        expect(result).toMatchObject(new Sale());
      });
    });
  });
});
