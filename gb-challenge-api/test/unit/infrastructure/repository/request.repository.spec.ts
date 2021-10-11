import { RequestRepository } from '../../../../src/infrastructure/repository/request.repository';
import { bootstrapTest } from '../../../app/test.app';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { HttpStatus, UnauthorizedException } from '@nestjs/common';
import { DealerMock } from '../../../mock/dealer.mock';
import { getId, getStr } from 'json-generator';
import { HttpMethod } from '../../../../src/common/enum/http.enum';

describe('RequestRepository', () => {
  let repository: RequestRepository;
  let axiosMockAdapter: MockAdapter;
  let url: string;
  let resourceInfo: any;

  beforeAll(async () => {
    const app = await bootstrapTest();
    repository = app.get<RequestRepository>(RequestRepository);
    axiosMockAdapter = new MockAdapter(axios);
    url = 'http://localhost:3000/resources';
    resourceInfo = { id: getId('objectId'), name: 'John Doe' };
  });

  afterEach(() => {
    axiosMockAdapter.reset();
  });

  describe('get()', () => {
    describe('when GET request is successful', () => {
      it('should return the response body', async () => {
        axiosMockAdapter.onGet(url).replyOnce(HttpStatus.OK, resourceInfo);

        const result = await repository.get({ url });
        expect(result).toMatchObject(resourceInfo);
      });
    });
  });

  describe('post()', () => {
    describe('when POST request is successful', () => {
      it('should return the response body', async () => {
        axiosMockAdapter
          .onPost(url)
          .replyOnce(HttpStatus.CREATED, resourceInfo);

        const result = await repository.post({ url, data: resourceInfo });
        expect(result).toMatchObject(resourceInfo);
      });
    });
  });

  describe('put()', () => {
    describe('when PUT request is successful', () => {
      it('should return the response body', async () => {
        axiosMockAdapter
          .onPut(`${url}/${resourceInfo.id}`)
          .replyOnce(HttpStatus.OK, resourceInfo);

        const result = await repository.put({
          url: `${url}/${resourceInfo.id}`,
          data: resourceInfo,
        });
        expect(result).toMatchObject(resourceInfo);
      });
    });
  });

  describe('patch()', () => {
    describe('when PATCH request is successful', () => {
      it('should return the response body', async () => {
        axiosMockAdapter
          .onPatch(`${url}/${resourceInfo.id}`)
          .replyOnce(HttpStatus.OK, resourceInfo);

        const result = await repository.patch({
          url: `${url}/${resourceInfo.id}`,
          data: {
            name: 'John Doe',
          },
        });
        expect(result).toMatchObject(resourceInfo);
      });
    });
  });

  describe('delete()', () => {
    describe('when DELETE request is successful', () => {
      it('should return the response body', async () => {
        axiosMockAdapter
          .onDelete(`${url}/${resourceInfo.id}`)
          .replyOnce(HttpStatus.NO_CONTENT);

        const result = await repository.delete({
          url: `${url}/${resourceInfo.id}`,
        });
        expect(result).toBeUndefined();
      });
    });
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
  });
});
