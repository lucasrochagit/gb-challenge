import { DealerModelMapper } from '../../../../src/business/mapper/dealer.model.mapper';
import { DealerModel } from '../../../../src/business/model/dealer.model';
import { Dealer } from '../../../../src/infrastructure/schema/dealer.schema';
import { DealerMock } from '../../../mock/dealer.mock';

describe('DealerModelMapper', () => {
  let mapper: DealerModelMapper;
  let info: any;
  let schema: Dealer;
  let model: DealerModel;

  beforeAll( () => {
    mapper = new DealerModelMapper();
    info = DealerMock.getInfo();
    schema = DealerMock.asDocumentResponse(info);
    model = DealerMock.asModelRequest(info);
  });

  describe('serialize()', () => {
    describe('when parse a schema to a model', () => {
      it('should return the mapped model', () => {
        const result = mapper.serialize(schema);
        expect(result).toHaveProperty('id', schema.id);
        expect(result).toHaveProperty('full_name', schema.full_name);
        expect(result).toHaveProperty('cpf', schema.cpf);
        expect(result).toHaveProperty('email', schema.email);
        expect(result).toHaveProperty('password', undefined);
        expect(result).toHaveProperty('created_at', schema.created_at);
        expect(result).toHaveProperty('updated_at', schema.updated_at);
      });
    });

    describe('when schema is null', () => {
      it('should return a empty model', () => {
        const result = mapper.serialize(null);
        expect(result).toMatchObject(new DealerModel());
      });
    });

    describe('when schema is empty', () => {
      it('should return a empty model', () => {
        const result = mapper.serialize(new Dealer());
        expect(result).toMatchObject(new DealerModel());
      });
    });
  });

  describe('deserialize()', () => {
    describe('when parse a model to a schema', () => {
      it('should return the mapped schema', () => {
        const result = mapper.deserialize(model);
        expect(result).toHaveProperty('id', undefined);
        expect(result).toHaveProperty('full_name', schema.full_name);
        expect(result).toHaveProperty('cpf', schema.cpf);
        expect(result).toHaveProperty('email', schema.email);
        expect(result).toHaveProperty('password', info.password);
        expect(result).toHaveProperty('created_at', undefined);
        expect(result).toHaveProperty('updated_at', undefined);
      });
    });

    describe('when the model is null', () => {
      it('should return a empty schema', () => {
        const result = mapper.deserialize(null);
        expect(result).toMatchObject(new Dealer());
      });
    });

    describe('when the model is empty', () => {
      it('should return a empty schema', () => {
        const result = mapper.deserialize(new DealerModel());
        expect(result).toMatchObject(new Dealer());
      });
    });
  });
});
