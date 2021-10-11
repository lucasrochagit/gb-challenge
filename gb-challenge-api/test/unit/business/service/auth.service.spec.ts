import { BadRequestException, UnauthorizedException } from '@nestjs/common';
import { getId } from 'json-generator';
import { sign } from 'jsonwebtoken';
import { mock } from 'sinon';
import { AuthModelMapper } from '../../../../src/business/mapper/auth.model.mapper';
import { AuthModel } from '../../../../src/business/model/auth.model';
import { AuthRequestModel } from '../../../../src/business/model/auth.request.model';
import { AuthService } from '../../../../src/business/service/auth.service';
import { PasswordUtil } from '../../../../src/business/util/password.util';
import { TokenUtil } from '../../../util/token.util';
import { Auth } from '../../../../src/infrastructure/schema/auth.schema';
import { Dealer } from '../../../../src/infrastructure/schema/dealer.schema';
import { AuthMock } from '../../../mock/auth.mock';
import { DealerMock } from '../../../mock/dealer.mock';

describe('AuthService', () => {
  let service: AuthService;
  let authRepository: any;
  let dealerRepository: any;
  let mapper: AuthModelMapper;

  let dealerInfo: any;
  let authInfo: any;
  let dealerResponse: Dealer;
  let authResponse: Auth;
  let authRequestModelRequest: AuthRequestModel;
  let authRequestModel: AuthModel;
  let authRequestRefreshTokenModel: AuthModel;
  let authResponseModel: AuthModel;
  let databaseError: any;

  beforeAll(() => {
    authRepository = mock();
    dealerRepository = mock();
    mapper = new AuthModelMapper();
    service = new AuthService(authRepository, dealerRepository, mapper);

    dealerInfo = DealerMock.getInfo();
    authInfo = AuthMock.getInfo();

    dealerResponse = DealerMock.asDocumentResponse(dealerInfo);
    authResponse = AuthMock.asDocumentResponse({
      ...authInfo,
      owner: dealerInfo.id,
    });
    authRequestModelRequest = AuthMock.asAuthModelRequest({
      login: dealerInfo.email,
      password: dealerInfo.password,
    });
    authRequestModel = AuthMock.asModelRequest(authInfo);
    authRequestRefreshTokenModel =
      AuthMock.asModelRefreshTokenRequest(authInfo);
    authResponseModel = AuthMock.asModelResponse(authResponse);
    databaseError = { message: 'Database Error' };
  });

  describe('auth()', () => {
    describe('when first auth is successful', () => {
      it('should return the auth data', async () => {
        dealerRepository.findOne = jest
          .fn()
          .mockResolvedValueOnce(dealerResponse);
        authRepository.checkExists = jest.fn().mockResolvedValueOnce(false);
        authRepository.create = jest.fn().mockResolvedValueOnce(authResponse);

        const result = await service.auth(authRequestModelRequest);
        expect(result).toMatchObject(authResponseModel);
      });
    });

    describe('when dealer is already authenticated', () => {
      it('should return a new auth data', async () => {
        dealerRepository.findOne = jest
          .fn()
          .mockResolvedValueOnce(dealerResponse);
        authRepository.checkExists = jest.fn().mockResolvedValueOnce(true);
        authRepository.updateOne = jest
          .fn()
          .mockResolvedValueOnce(authResponse);

        const result = await service.auth(authRequestModelRequest);
        expect(result).toMatchObject(authResponseModel);
      });
    });

    describe('when dealer is not founded', () => {
      it('should return an error for invalid credentials', async () => {
        dealerRepository.findOne = jest.fn().mockResolvedValueOnce(null);

        try {
          await service.auth(authRequestModelRequest);
        } catch (err) {
          expect(err).toMatchObject(
            new UnauthorizedException(
              'Invalid credentials. Please try again with valid credentials.',
            ),
          );
        }
      });
    });

    describe('when password does not match', () => {
      it('should return an error for invalid credentials', async () => {
        dealerRepository.findOne = jest.fn().mockResolvedValueOnce({
          ...dealerResponse,
          password: PasswordUtil.encryptPassword('randomPwd'),
        });

        try {
          await service.auth(authRequestModelRequest);
        } catch (err) {
          expect(err).toMatchObject(
            new UnauthorizedException(
              'Invalid credentials. Please try again with valid credentials.',
            ),
          );
        }
      });
    });

    describe('when database error occurs', () => {
      it('should return a database error on dealerRepository.findOne', async () => {
        dealerRepository.findOne = jest
          .fn()
          .mockRejectedValueOnce(databaseError);

        try {
          await service.auth(authRequestModelRequest);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });

      it('should return a database error on authRepository.checkExists', async () => {
        dealerRepository.findOne = jest
          .fn()
          .mockResolvedValueOnce(dealerResponse);
        authRepository.checkExists = jest
          .fn()
          .mockRejectedValueOnce(databaseError);

        try {
          await service.auth(authRequestModelRequest);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });

      it('should return a database error on authRepository.create', async () => {
        dealerRepository.findOne = jest
          .fn()
          .mockResolvedValueOnce(dealerResponse);
        authRepository.checkExists = jest.fn().mockResolvedValueOnce(false);
        authRepository.create = jest.fn().mockRejectedValueOnce(databaseError);

        try {
          await service.auth(authRequestModelRequest);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });

      it('should return a database error on authRepository.updateOne', async () => {
        dealerRepository.findOne = jest
          .fn()
          .mockResolvedValueOnce(dealerResponse);
        authRepository.checkExists = jest.fn().mockResolvedValueOnce(true);
        authRepository.updateOne = jest
          .fn()
          .mockRejectedValueOnce(databaseError);

        try {
          await service.auth(authRequestModelRequest);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('refreshToken()', () => {
    describe('when refreshToken is successful', () => {
      it('should return new auth data', async () => {
        dealerRepository.checkExists = jest.fn().mockResolvedValueOnce(true);
        authRepository.findOne = jest.fn().mockResolvedValueOnce(authResponse);
        authRepository.updateOne = jest
          .fn()
          .mockResolvedValueOnce(authResponse);

        const result = await service.refreshToken(authRequestRefreshTokenModel);
        expect(result).toMatchObject(authResponseModel);
      });
    });

    describe('when token does not have a sub', () => {
      it('should return an error for invalid access token', async () => {
        const invalidAuthData = {
          access_token: sign({}, 's3cr3tk3y', { expiresIn: '8h' }),
          refresh_token: TokenUtil.generateRefreshToken(),
        } as AuthModel;

        try {
          await service.refreshToken(invalidAuthData);
        } catch (err) {
          expect(err).toMatchObject(
            new BadRequestException(
              'Invalid access token. Please reauthenticate.',
            ),
          );
        }
      });
    });

    describe('when owner does not exists', () => {
      it('should return an error for invalid access token', async () => {
        dealerRepository.checkExists = jest.fn().mockResolvedValueOnce(false);
        const authDataUnknowOwner = {
          access_token: sign({ sub: getId('objectId') }, 's3cr3tk3y', {
            expiresIn: '8h',
          }),
          refresh_token: TokenUtil.generateRefreshToken(),
        } as AuthModel;

        try {
          await service.refreshToken(authDataUnknowOwner);
        } catch (err) {
          expect(err).toMatchObject(
            new BadRequestException(
              'Invalid access token. Please reauthenticate.',
            ),
          );
        }
      });
    });

    describe('when does not have previous access token', () => {
      it('should return an error for invalid access token', async () => {
        dealerRepository.checkExists = jest.fn().mockResolvedValueOnce(true);
        authRepository.findOne = jest.fn().mockResolvedValueOnce(null);
        const anotherAuthDataSameOwner = {
          access_token: sign({ sub: dealerResponse.id }, 's3cr3tk3y', {
            expiresIn: '8h',
          }),
          refresh_token: TokenUtil.generateRefreshToken(),
        } as AuthModel;

        try {
          await service.refreshToken(anotherAuthDataSameOwner);
        } catch (err) {
          expect(err).toMatchObject(
            new BadRequestException(
              'Invalid access token. Please reauthenticate.',
            ),
          );
        }
      });
    });

    describe('when previous token does not match with current token', () => {
      it('should return an error for invalid access token', async () => {
        dealerRepository.checkExists = jest.fn().mockResolvedValueOnce(true);
        authRepository.findOne = jest.fn().mockResolvedValueOnce(authResponse);
        const anotherAuthDataSameOwner = {
          access_token: sign({ sub: dealerResponse.id }, 's3cr3tk3y', {
            expiresIn: '8h',
          }),
          refresh_token: TokenUtil.generateRefreshToken(),
        } as AuthModel;

        try {
          await service.refreshToken(anotherAuthDataSameOwner);
        } catch (err) {
          expect(err).toMatchObject(
            new BadRequestException(
              'Invalid access token. Please reauthenticate.',
            ),
          );
        }
      });
    });

    describe('when refresh token does not match', () => {
      it('should return an error for invalid refresh token', async () => {
        dealerRepository.checkExists = jest.fn().mockResolvedValueOnce(true);
        authRepository.findOne = jest.fn().mockResolvedValueOnce(authResponse);
        const anotherRefreshTokenAuthData = {
          access_token: authResponse.access_token,
          refresh_token: TokenUtil.generateRefreshToken(),
        } as AuthModel;

        try {
          await service.refreshToken(anotherRefreshTokenAuthData);
        } catch (err) {
          expect(err).toMatchObject(
            new BadRequestException(
              'Invalid refresh token. Please reauthenticate.',
            ),
          );
        }
      });
    });
  });
});
