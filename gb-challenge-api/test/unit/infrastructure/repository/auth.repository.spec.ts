import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AuthRepository } from '../../../../src/infrastructure/repository/auth.repository';
import {
  Auth,
  AuthDocument,
} from '../../../../src/infrastructure/schema/auth.schema';
import { bootstrapTest } from '../../../app/test.app';
import { AuthMock } from '../../../mock/auth.mock';

describe('AuthRepository', () => {
  let model: Model<AuthDocument>;
  let repository: AuthRepository;
  let authRequest: Auth;
  let authResponse: Auth;
  let databaseError: any;

  beforeAll(async () => {
    const app = await bootstrapTest();
    model = app.get<Model<AuthDocument>>(getModelToken(Auth.name));
    repository = app.get<AuthRepository>(AuthRepository);
    authRequest = AuthMock.asDocumentRequest();
    authResponse = AuthMock.asDocumentResponse();
    databaseError = { message: 'Database Error' };
  });

  describe('create()', () => {
    describe('when create is successful', () => {
      it('should return the created auth data', async () => {
        model.create = jest.fn().mockResolvedValueOnce(authResponse);
        const result = await repository.create(authRequest);
        expect(result).toMatchObject(authResponse);
      });
    });

    describe('when an error occurs on database', () => {
      it('should return the database error', async () => {
        model.create = jest.fn().mockRejectedValueOnce(databaseError);
        try {
          await repository.create(authRequest);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('find()', () => {
    describe('when find is successful', () => {
      it('should return a list of auth data', async () => {
        model.find = jest.fn().mockResolvedValueOnce([authResponse]);
        const result = await repository.find();
        expect(result).toMatchObject([authResponse]);
      });
    });

    describe('when there is no auth data', () => {
      it('should return an empty list', async () => {
        model.find = jest.fn().mockResolvedValueOnce([]);
        const result = await repository.find();
        expect(result).toMatchObject([]);
      });
    });

    describe('when an error occurs on database', () => {
      it('should return the database error', async () => {
        model.find = jest.fn().mockRejectedValueOnce(databaseError);
        try {
          await repository.find();
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('findOne()', () => {
    describe('when findOne is successful', () => {
      it('should return the founded auth data', async () => {
        model.findOne = jest.fn().mockResolvedValueOnce(authResponse);
        const result = await repository.findOne({ _id: authResponse.id });
        expect(result).toMatchObject(authResponse);
      });
    });

    describe('when the auth data is not founded', () => {
      it('should return null', async () => {
        model.findOne = jest.fn().mockResolvedValueOnce(null);
        const result = await repository.findOne({ _id: authResponse.id });
        expect(result).toBeNull();
      });
    });

    describe('when an error occurs on database', () => {
      it('should return the database error', async () => {
        model.findOne = jest.fn().mockRejectedValueOnce(databaseError);
        try {
          await repository.findOne({ _id: authResponse.id });
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('updateOne()', () => {
    describe('when updateOne is successful', () => {
      it('should return the updated auth data', async () => {
        model.findOneAndUpdate = jest.fn().mockResolvedValueOnce(authResponse);
        const result = await repository.updateOne(
          { _id: authResponse.id },
          authRequest,
        );
        expect(result).toMatchObject(authResponse);
      });
    });

    describe('when the auth data is not founded', () => {
      it('should return null', async () => {
        model.findOneAndUpdate = jest.fn().mockResolvedValueOnce(null);
        const result = await repository.updateOne(
          { _id: authResponse.id },
          authRequest,
        );
        expect(result).toBeNull();
      });
    });

    describe('when an error occurs on database', () => {
      it('should return the database error', async () => {
        model.findOneAndUpdate = jest.fn().mockRejectedValueOnce(databaseError);
        try {
          await repository.updateOne({ _id: authResponse.id }, authRequest);
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('deleteOne()', () => {
    describe('when deleteOne is successful', () => {
      it('should return the deleted auth data', async () => {
        model.findOneAndDelete = jest.fn().mockResolvedValueOnce(authResponse);
        const result = await repository.deleteOne({ _id: authResponse.id });
        expect(result).toMatchObject(authResponse);
      });
    });

    describe('when the auth data is not founded', () => {
      it('should return null', async () => {
        model.findOneAndDelete = jest.fn().mockResolvedValueOnce(null);
        const result = await repository.deleteOne({ _id: authResponse.id });
        expect(result).toBeNull();
      });
    });

    describe('when an error occurs on database', () => {
      it('should return the database error', async () => {
        model.findOneAndDelete = jest.fn().mockRejectedValueOnce(databaseError);
        try {
          await repository.deleteOne({ _id: authResponse.id });
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });

  describe('checkExists()', () => {
    describe('when checkExists is successful', () => {
      it('should return true', async () => {
        model.findOne = jest.fn().mockResolvedValueOnce(authResponse);
        const result = await repository.checkExists({
          owner: authRequest.owner,
        });
        expect(result).toEqual(true);
      });
    });

    describe('when the auth data is not founded', () => {
      it('should return false', async () => {
        model.findOne = jest.fn().mockResolvedValueOnce(null);
        const result = await repository.checkExists({
          owner: authRequest.owner,
        });
        expect(result).toEqual(false);
      });
    });

    describe('when an error occurs on database', () => {
      it('should return the database error', async () => {
        model.findOne = jest.fn().mockRejectedValueOnce(databaseError);
        try {
          await repository.checkExists({ owner: authRequest.owner });
        } catch (err) {
          expect(err).toMatchObject(databaseError);
        }
      });
    });
  });
});
