import { AuthModel } from '../../../../src/business/model/auth.model';
import { AuthDTO } from '../../../../src/presentation/dto/auth.dto';
import { AuthDTOMapper } from '../../../../src/presentation/mapper/auth.dto.mapper';
import { AuthMock } from '../../../mock/auth.mock';

describe('AuthDTOMapper', () => {
  let mapper: AuthDTOMapper;
  let info: any;
  let model: AuthModel;
  let dtoRequest: AuthDTO;
  let dtoResponse: AuthDTO;

  beforeAll(() => {
    mapper = new AuthDTOMapper();
    info = AuthMock.getInfo();
    model = AuthMock.asModelResponse(info);
    dtoRequest = AuthMock.asDTORequest(info);
    dtoResponse = AuthMock.asDTOResponse(info);
  });

  describe('serialize()', () => {
    describe('when parse a model to a dto', () => {
      it('should return the mapped dto', () => {
        const result = mapper.serialize(model);
        expect(result).toHaveProperty('access_token', dtoResponse.access_token);
        expect(result).toHaveProperty('token_type', dtoResponse.token_type);
        expect(result).toHaveProperty(
          'refresh_token',
          dtoResponse.refresh_token,
        );
        expect(result).toHaveProperty('expires_in', dtoResponse.expires_in);
      });
    });

    describe('when model is null', () => {
      it('should return a empty dto', () => {
        const result = mapper.serialize(null);
        expect(result).toMatchObject({} as AuthDTO);
      });
    });

    describe('when model is empty', () => {
      it('should return a empty dto', () => {
        const result = mapper.serialize(new AuthModel());
        expect(result).toMatchObject({} as AuthDTO);
      });
    });
  });

  describe('deserialize()', () => {
    describe('when parse a dto to a model', () => {
      it('should return the mapped model', () => {
        const result = mapper.deserialize(dtoRequest);
        expect(result).toHaveProperty('id', undefined);
        expect(result).toHaveProperty('access_token', dtoRequest.access_token);
        expect(result).toHaveProperty(
          'refresh_token',
          dtoRequest.refresh_token,
        );
        expect(result).toHaveProperty('token_type', undefined);
        expect(result).toHaveProperty('expires_in', undefined);
        expect(result).toHaveProperty('owner', undefined);
        expect(result).toHaveProperty('created_at', undefined);
        expect(result).toHaveProperty('updated_at', undefined);
      });
    });

    describe('when the dto is null', () => {
      it('should return a empty model', () => {
        const result = mapper.deserialize(null);
        expect(result).toMatchObject(new AuthModel());
      });
    });

    describe('when the dto is empty', () => {
      it('should return a empty model', () => {
        const result = mapper.deserialize({} as AuthDTO);
        expect(result).toMatchObject(new AuthModel());
      });
    });
  });
});
