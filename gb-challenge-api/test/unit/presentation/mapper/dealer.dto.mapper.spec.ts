import { DealerModel } from '../../../../src/business/model/dealer.model';
import { DealerDTO } from '../../../../src/presentation/dto/dealer.dto';
import { DealerDTOMapper } from '../../../../src/presentation/mapper/dealer.dto.mapper';
import { DealerMock } from '../../../mock/dealer.mock';

describe('DealerDTOMapper', () => {
  let mapper: DealerDTOMapper;
  let info: any;
  let model: DealerModel;
  let dtoRequest: DealerDTO;
  let dtoResponse: DealerDTO;

  beforeAll(() => {
    mapper = new DealerDTOMapper();
    info = DealerMock.getInfo();
    model = DealerMock.asModelResponse(info);
    dtoRequest = DealerMock.asDTORequest(info);
    dtoResponse = DealerMock.asDTOResponse(info);
  });

  describe('serialize()', () => {
    describe('when parse a model to a dto', () => {
      it('should return the mapped dto', () => {
        const result = mapper.serialize(model);
        expect(result).toHaveProperty('id', model.id);
        expect(result).toHaveProperty('full_name', model.full_name);
        expect(result).toHaveProperty('cpf', model.cpf);
        expect(result).toHaveProperty('email', model.email);
        expect(result).toHaveProperty('password', undefined);
        expect(result).toHaveProperty('created_at', model.created_at);
        expect(result).toHaveProperty('updated_at', model.updated_at);
      });
    });

    describe('when model is null', () => {
      it('should return a empty dto', () => {
        const result = mapper.serialize(null);
        expect(result).toMatchObject({} as DealerDTO);
      });
    });

    describe('when model is empty', () => {
      it('should return a empty dto', () => {
        const result = mapper.serialize(new DealerModel());
        expect(result).toMatchObject({} as DealerDTO);
      });
    });
  });

  describe('deserialize()', () => {
    describe('when parse a dto to a model', () => {
      it('should return the mapped model', () => {
        const result = mapper.deserialize(dtoRequest);
        expect(result).toHaveProperty('id', undefined);
        expect(result).toHaveProperty('full_name', model.full_name);
        expect(result).toHaveProperty('cpf', model.cpf);
        expect(result).toHaveProperty('email', model.email);
        expect(result).toHaveProperty('password', info.password);
        expect(result).toHaveProperty('created_at', undefined);
        expect(result).toHaveProperty('updated_at', undefined);
      });
    });

    describe('when the dto is null', () => {
      it('should return a empty model', () => {
        const result = mapper.deserialize(null);
        expect(result).toMatchObject(new DealerModel());
      });
    });

    describe('when the dto is empty', () => {
      it('should return a empty model', () => {
        const result = mapper.deserialize({} as DealerDTO);
        expect(result).toMatchObject(new DealerModel());
      });
    });
  });
});
