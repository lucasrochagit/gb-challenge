import { ConfigModule } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { getId } from 'json-generator';
import * as jwt from 'jsonwebtoken';
import { TokenUtil } from '../../../../src/business/util/token.util';

describe('TokenUtil', () => {
  let ownerId: string;

  beforeAll(async () => {
    await Test.createTestingModule({
      imports: [ConfigModule.forRoot()],
    }).compile();
    ownerId = getId('objectId');
  });

  describe('generateAccessToken()', () => {
    describe('when generate the access token', () => {
      it('should return the access token', () => {
        const result = TokenUtil.generateAccessToken(ownerId);
        expect(result).toBeDefined();
      });
    });

    describe('when the ownerId is empty', () => {
      it('should return nothing', () => {
        const result = TokenUtil.generateAccessToken('');
        expect(result).toBeUndefined();
      });
    });

    describe('when the ownerId is null', () => {
      it('should return nothing', () => {
        const result = TokenUtil.generateAccessToken(null);
        expect(result).toBeUndefined();
      });
    });

    describe('when the ownerId is null', () => {
      it('should return nothing', () => {
        const result = TokenUtil.generateAccessToken(undefined);
        expect(result).toBeUndefined();
      });
    });

    describe('when an error occurs', () => {
      it('should return nothing', () => {
        jest.spyOn(jwt, 'sign').mockImplementationOnce(() => {
          throw new Error('Error at generated token');
        });

        const result = TokenUtil.generateAccessToken(ownerId);
        expect(result).toBeUndefined();
      });
    });
  });

  describe('generateRefreshToken()', () => {
    it('should return a random hex string', () => {
      const result = TokenUtil.generateRefreshToken();
      expect(result).toBeDefined();
    });
  });

  describe('getTokenPayloadSub()', () => {
    describe('when get the token payload sub', () => {
      it('should return an object', () => {
        const token = TokenUtil.generateAccessToken(ownerId);
        const result = TokenUtil.getTokenPayloadSub(token);
        expect(result).toEqual(ownerId);
      });
    });

    describe('when get the token does not have sub on payload', () => {
      it('should return nothing', () => {
        const token = jwt.sign({}, 'secret');
        const result = TokenUtil.getTokenPayloadSub(token);
        expect(result).toBeUndefined();
      });
    });

    describe('when an error occurs', () => {
      it('should return nothing', () => {
        const result = TokenUtil.getTokenPayloadSub('invalidToken');
        expect(result).toBeUndefined();
      });
    });
  });

  describe('getTokenPayloadExp()', () => {
    describe('when get the token payload exp', () => {
      it('should return an object', () => {
        const token = TokenUtil.generateAccessToken(ownerId);
        const result = TokenUtil.getTokenPayloadExp(token);
        expect(result).toBeDefined();
      });
    });

    describe('when get the token does not have exp on payload', () => {
      it('should return nothing', () => {
        const token = jwt.sign({}, 'secret');
        const result = TokenUtil.getTokenPayloadExp(token);
        expect(result).toBeUndefined();
      });
    });

    describe('when an error occurs', () => {
      it('should return nothing', () => {
        const result = TokenUtil.getTokenPayloadExp('invalidToken');
        expect(result).toBeUndefined();
      });
    });
  });
});
