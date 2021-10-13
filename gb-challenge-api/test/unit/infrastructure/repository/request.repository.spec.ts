import { getId } from 'json-generator';
import { RequestRepository } from '../../../../src/infrastructure/repository/request.repository';
import axios from 'axios';
import {
  BadRequestException,
  HttpStatus,
  UnauthorizedException,
} from '@nestjs/common';

describe('RequestRepository', () => {
  let repository: RequestRepository;
  let url: string;
  let resourceInfo: any;

  beforeAll(() => {
    repository = new RequestRepository();
    url = 'http://localhost:3000/resources';
    resourceInfo = { id: getId('objectId'), name: 'John Doe' };
  });

  describe('get()', () => {
    describe('when make a GET request', () => {
      it('should return the response body', async () => {
        jest
          .spyOn(axios, 'get')
          .mockResolvedValueOnce({ data: resourceInfo, status: HttpStatus.OK });

        const result = await repository.get({ url });
        expect(result).toMatchObject(resourceInfo);
      });
    });

    describe('when response is a JSON string', () => {
      it('should return the response body', async () => {
        jest.spyOn(axios, 'get').mockResolvedValueOnce({
          data: JSON.stringify(resourceInfo),
          status: HttpStatus.OK,
        });

        const result = await repository.get({ url });
        expect(result).toMatchObject(resourceInfo);
      });
    });

    describe('when the request returns an exception', () => {
      it('shoud return the reffer HttpException', async () => {
        const exception = new UnauthorizedException(
          'You cannot do this request',
        );

        jest.spyOn(axios, 'get').mockResolvedValueOnce({
          data: exception.getResponse(),
          status: HttpStatus.UNAUTHORIZED,
        });

        try {
          await repository.get({ url });
        } catch (err) {
          expect(err).toMatchObject(exception);
        }
      });
    });

    describe('when an axios error occurs', () => {
      it('should return the error', async () => {
        const error = { message: 'Error at do this request' };

        jest.spyOn(axios, 'get').mockRejectedValueOnce(error);

        try {
          await repository.get({ url });
        } catch (err) {
          expect(err).toMatchObject(error);
        }
      });
    });
  });
});
