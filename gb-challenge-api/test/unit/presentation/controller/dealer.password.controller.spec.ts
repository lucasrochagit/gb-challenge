import { BadRequestException } from '@nestjs/common';
import { getId } from 'json-generator';
import { mock } from 'sinon';
import { DealerPasswordController } from '../../../../src/presentation/controller/dealer.password.controller';
import { UpdateDealerPasswordDTO } from '../../../../src/presentation/dto/dealer.password.dto';
import { DealerPasswordDTOMapper } from '../../../../src/presentation/mapper/dealer.password.dto.mapper';
import { DealerMock } from '../../../mock/dealer.mock';

describe('DealerPasswordController', () => {
  let controller: DealerPasswordController;
  let service: any;
  let mapper: DealerPasswordDTOMapper;

  let info: any;
  let dealerRequestDTO: UpdateDealerPasswordDTO;
  let dealerId: string;

  beforeAll(() => {
    service = mock();
    mapper = new DealerPasswordDTOMapper();
    controller = new DealerPasswordController(service, mapper);

    info = DealerMock.getInfo();
    dealerRequestDTO = DealerMock.asDTOPasswordRequest({
      old_password: 'my0ldp4ssw0rd',
      new_password: 'myn3wp4ssw0rd',
    });
    dealerId = getId('objectId');
  });

  describe('updatePassword()', () => {
    describe('when updatePassword is successful', () => {
      it('should return nothing', async () => {
        service.updatePassword = jest
          .fn()
          .mockImplementationOnce(() => Promise.resolve());
        const result = await controller.updatePasssword(
          {
            dealer_id: dealerId,
          },
          dealerRequestDTO,
        );
        expect(result).toBeUndefined();
      });
    });

    describe('when an error occurs', () => {
      it('should return the error', async () => {
        const exception = new BadRequestException(
          'Old password does not match with current password.',
        );
        service.getCashbackAmount = jest.fn().mockRejectedValueOnce(exception);

        try {
          await controller.updatePasssword(
            {
              dealer_id: dealerId,
            },
            dealerRequestDTO,
          );
        } catch (err) {
          expect(err).toMatchObject(exception);
        }
      });
    });
  });
});
