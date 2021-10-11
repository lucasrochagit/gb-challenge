import { DealerPasswordModel } from '../../../../src/business/model/dealer.password.model';
import { DealerPasswordDTO } from '../../../../src/presentation/dto/dealer.password.dto';
import { DealerPasswordDTOMapper } from '../../../../src/presentation/mapper/dealer.password.dto.mapper';
import { DealerMock } from '../../../mock/dealer.mock';

describe('DealerPasswordDTOMapper', () => {
  let mapper: DealerPasswordDTOMapper;
  let info: any;
  let model: DealerPasswordModel;
  let dto: DealerPasswordDTO;

  beforeAll(() => {
    mapper = new DealerPasswordDTOMapper();
    info = DealerMock.getInfo();
    model = DealerMock.asModelPasswordRequest(info);
    dto = DealerMock.asDTOPasswordRequest(info);
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
        expect(result).toHaveProperty('old_password', dto.old_password);
        expect(result).toHaveProperty('new_password', dto.new_password);
      });
    });

    describe('when the dto is null', () => {
      it('should return a empty model', () => {
        const result = mapper.deserialize(null);
        expect(result).toMatchObject(new DealerPasswordModel());
      });
    });

    describe('when the dto is empty', () => {
      it('should return a empty model', () => {
        const result = mapper.deserialize({} as DealerPasswordDTO);
        expect(result).toMatchObject(new DealerPasswordModel());
      });
    });
  });
});
