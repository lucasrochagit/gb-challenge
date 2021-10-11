import { AuthRequestModel } from '../../../../src/business/model/auth.request.model';
import { AuthRequestDTO } from '../../../../src/presentation/dto/auth.dto';
import { AuthRequestDTOMapper } from '../../../../src/presentation/mapper/auth.request.dto.mapper';
import { AuthMock } from '../../../mock/auth.mock';

describe('AuthRequestDTOMapper', () => {
  let mapper: AuthRequestDTOMapper;
  let info: any;
  let model: AuthRequestModel;
  let dto: AuthRequestDTO;

  beforeAll(() => {
    mapper = new AuthRequestDTOMapper();
    info = AuthMock.getInfo();
    model = AuthMock.asAuthModelRequest(info);
    dto = AuthMock.asDTOAuthRequest(info);
  });

  describe('serialize()', () => {
    it('should throw error for method not implemented', () => {
      try {
        mapper.serialize(model);
      } catch (err) {
        expect(err).toMatchObject(new Error('Method not implemented.'));
      }
    });
  });

  describe('deserialize()', () => {
    describe('when parse a dto to a model', () => {
      it('should return the mapped model', () => {
        const result = mapper.deserialize(dto);
        expect(result).toHaveProperty('login', dto.login);
        expect(result).toHaveProperty('password', dto.password);
      });
    });

    describe('when the dto is null', () => {
      it('should return a empty model', () => {
        const result = mapper.deserialize(null);
        expect(result).toMatchObject(new AuthRequestModel());
      });
    });

    describe('when the dto is empty', () => {
      it('should return a empty model', () => {
        const result = mapper.deserialize({} as AuthRequestDTO);
        expect(result).toMatchObject(new AuthRequestModel());
      });
    });
  });
});
