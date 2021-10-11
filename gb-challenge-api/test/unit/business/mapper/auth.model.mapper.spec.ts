import { AuthModelMapper } from '../../../../src/business/mapper/auth.model.mapper';
import { AuthModel } from '../../../../src/business/model/auth.model';
import { Auth } from '../../../../src/infrastructure/schema/auth.schema';
import { AuthMock } from '../../../mock/auth.mock';

describe('AuthModelMapper', () => {
  let mapper: AuthModelMapper;
  let info: any;
  let schema: Auth;
  let model: AuthModel;

  beforeAll(() => {
    mapper = new AuthModelMapper();
    info = AuthMock.getInfo();
    schema = AuthMock.asDocumentResponse(info);
    model = AuthMock.asModelRequest(info);
  });

  describe('serialize()', () => {
    describe('when parse a schema to a model', () => {
      it('should return the mapped model', () => {
        const result = mapper.serialize(schema);
        expect(result).toHaveProperty('id', schema.id);
        expect(result).toHaveProperty('access_token', schema.access_token);
        expect(result).toHaveProperty('token_type', schema.token_type);
        expect(result).toHaveProperty('refresh_token', schema.refresh_token);
        expect(result).toHaveProperty('expires_in', schema.expires_in);
        expect(result).toHaveProperty('owner', schema.owner);
        expect(result).toHaveProperty('created_at', schema.created_at);
        expect(result).toHaveProperty('updated_at', schema.updated_at);
      });
    });

    describe('when schema is null', () => {
      it('should return a empty model', () => {
        const result = mapper.serialize(null);
        expect(result).toMatchObject(new AuthModel());
      });
    });

    describe('when schema is empty', () => {
      it('should return a empty model', () => {
        const result = mapper.serialize(new Auth());
        expect(result).toMatchObject(new AuthModel());
      });
    });
  });

  describe('deserialize()', () => {
    describe('when parse a model to a schema', () => {
      it('should return the mapped schema', () => {
        const result = mapper.deserialize(model);
        expect(result).toHaveProperty('id', undefined);
        expect(result).toHaveProperty('access_token', schema.access_token);
        expect(result).toHaveProperty('token_type', undefined);
        expect(result).toHaveProperty('refresh_token', schema.refresh_token);
        expect(result).toHaveProperty('expires_in', schema.expires_in);
        expect(result).toHaveProperty('owner', schema.owner);
        expect(result).toHaveProperty('created_at', undefined);
        expect(result).toHaveProperty('updated_at', undefined);
      });
    });

    describe('when the model is null', () => {
      it('should return a empty schema', () => {
        const result = mapper.deserialize(null);
        expect(result).toMatchObject(new Auth());
      });
    });

    describe('when the model is empty', () => {
      it('should return a empty schema', () => {
        const result = mapper.deserialize(new AuthModel());
        expect(result).toMatchObject(new Auth());
      });
    });
  });
});
