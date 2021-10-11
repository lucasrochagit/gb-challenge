import { HttpStatus, UnauthorizedException } from '@nestjs/common';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { getId } from 'json-generator';
import { HttpMethod } from '../../../../src/common/enum/http.enum';
import { RequestRepository } from '../../../../src/infrastructure/repository/request.repository';

describe('RequestRepository', () => {
  let repository: RequestRepository;
  let axiosMockAdapter: MockAdapter;
  
  let url: string;
  let resourceInfo: any;

  beforeAll(() => {
    repository = new RequestRepository();
    axiosMockAdapter = new MockAdapter(axios);
    url = 'http://localhost:3000/resources';
    resourceInfo = { id: getId('objectId'), name: 'John Doe' };
  });

  afterEach(() => {
    axiosMockAdapter.reset();
  });

  describe('request()', () => {
    describe('when request is successful', () => {
      it('should return the response body as json', async () => {
        axiosMockAdapter.onGet(url).replyOnce(HttpStatus.OK, resourceInfo);

        const result = await repository.request(HttpMethod.GET, { url });
        expect(result).toMatchObject(resourceInfo);
      });

      it('should return the response body as json string', async () => {
        axiosMockAdapter
          .onGet(url)
          .replyOnce(HttpStatus.OK, JSON.stringify(resourceInfo));

        const result = await repository.request(HttpMethod.GET, { url });
        expect(result).toMatchObject(resourceInfo);
      });
    });

    describe('when the response is a string but not a JSON string', () => {
      it('should return the response', async () => {
        axiosMockAdapter.onGet(url).replyOnce(HttpStatus.OK, 'Hello World');

        const result = await repository.request(HttpMethod.GET, { url });
        expect(result).toEqual('Hello World');
      });
    });

    describe('when request returns a http exception', () => {
      it('should throw the exception', async () => {
        const exception = new UnauthorizedException('Unauthorized');
        axiosMockAdapter
          .onGet(url)
          .replyOnce(HttpStatus.UNAUTHORIZED, exception.getResponse());

        try {
          await repository.request(HttpMethod.GET, { url });
        } catch (err) {
          expect(err).toHaveProperty('status', exception.getStatus());
          expect(err.response).toHaveProperty('message', 'Unauthorized');
        }
      });
    });

    describe('when request returns a generic exception', () => {
      it('should throw the exception', async () => {
        const exception = { message: 'Generic Exception' };
        axiosMockAdapter
          .onGet(url)
          .replyOnce(HttpStatus.INTERNAL_SERVER_ERROR, exception);

        try {
          await repository.request(HttpMethod.GET, { url });
        } catch (err) {
          expect(err).toHaveProperty(
            'status',
            HttpStatus.INTERNAL_SERVER_ERROR,
          );
          expect(err.response).toHaveProperty('message', 'Generic Exception');
        }
      });
    });
  });
});
