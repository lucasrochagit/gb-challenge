import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { mock } from 'sinon';
import { AuthModel } from '../../../../src/business/model/auth.model';
import { AuthController } from '../../../../src/presentation/controller/auth.controller';
import {
  AuthDTO,
  AuthRequestDTO,
  RefreshTokenDTO
} from '../../../../src/presentation/dto/auth.dto';
import { AuthDTOMapper } from '../../../../src/presentation/mapper/auth.dto.mapper';
import { AuthRequestDTOMapper } from '../../../../src/presentation/mapper/auth.request.dto.mapper';
import { AuthMock } from '../../../mock/auth.mock';
import { DealerMock } from '../../../mock/dealer.mock';

describe('AuthController', () => {
  let controller: AuthController;
  let service: any;
  let authDTOMapper: AuthDTOMapper;
  let authRequestDTOMapper: AuthRequestDTOMapper;

  let authInfo: any;
  let dealerInfo: any;
  let authRequestDTO: AuthRequestDTO;
  let authResponseDTO: AuthDTO;
  let authResponseModel: AuthModel;
  let authRequestRefreshTokenDTO: RefreshTokenDTO;

  beforeAll(() => {
    service = mock();
    authDTOMapper = new AuthDTOMapper();
    authRequestDTOMapper = new AuthRequestDTOMapper();
    controller = new AuthController(
      service,
      authDTOMapper,
      authRequestDTOMapper,
    );

    dealerInfo = DealerMock.getInfo();
    authInfo = AuthMock.getInfo();
    authRequestDTO = AuthMock.asDTOAuthRequest({
      login: dealerInfo.email,
      password: dealerInfo.password,
    });
    authResponseDTO = AuthMock.asDTOResponse(authInfo);
    authResponseModel = AuthMock.asModelResponse(authInfo);
    authRequestRefreshTokenDTO = AuthMock.asModelRefreshTokenRequest(authInfo);
  });

  describe('auth()', () => {
    describe('when auth is successful', () => {
      it('should return the auth data', async () => {
        service.auth = jest.fn().mockResolvedValueOnce(authResponseModel);

        const result = await controller.auth(authRequestDTO);
        expect(result).toMatchObject(authResponseDTO);
      });
    });

    describe('when an error occurs', () => {
      it('should return an error', async () => {
        const exception = new UnauthorizedException(
          'Invalid credentials. Please try again with valid credentials.',
        );
        service.auth = jest.fn().mockRejectedValueOnce(exception);

        try {
          await controller.auth(authRequestDTO);
        } catch (err) {
          expect(err).toMatchObject(exception);
        }
      });
    });
  });

  describe('refreshToken()', () => {
    describe('when refreshToken is successful', () => {
      it('should return the auth data', async () => {
        service.refreshToken = jest
          .fn()
          .mockResolvedValueOnce(authResponseModel);

        const result = await controller.refreshToken(
          authRequestRefreshTokenDTO,
        );
        expect(result).toMatchObject(authResponseDTO);
      });
    });

    describe('when an error occurs', () => {
      it('should return an error', async () => {
        const exception = new BadRequestException(
          'Invalid access token. Please reauthenticate.',
        );
        service.refreshToken = jest.fn().mockRejectedValueOnce(exception);

        try {
          await controller.refreshToken(authRequestRefreshTokenDTO);
        } catch (err) {
          expect(err).toMatchObject(exception);
        }
      });
    });
  });
});
