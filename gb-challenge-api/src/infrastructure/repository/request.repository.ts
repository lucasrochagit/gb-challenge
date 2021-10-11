import {
  HttpException,
  HttpStatus,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import axios from 'axios';
import { Promise } from 'mongoose';
import { HttpMethod } from '../../common/enum/http.enum';
import { JsonUtil } from '../../common/util/json.util';

type Options = {
  url: string;
  headers?: { [key: string]: string };
  params?: { [key: string]: any };
  data?: any;
};

@Injectable()
export class RequestRepository {
  async request(method: HttpMethod, options: Options): Promise<any> {
    try {
      return this.handleResponse(await axios({ method, ...options }));
    } catch (err) {
      throw this.handleError(method, options, err);
    }
  }

  private handleResponse(response: any): any | HttpException {
    const { body, statusCode } = this.handleBody(response);
    if (!this.isSuccessStatusCode(statusCode)) {
      throw new HttpException(body, statusCode);
    }
    return body;
  }

  private handleError(
    method: string,
    options: Options,
    err: any,
  ): HttpException {
    if (err.isAxiosError && err.response.status && err.response.data) {
      const { body, statusCode } = this.handleBody(err.response);
      return new HttpException(body, statusCode);
    }

    const errorBody = {
      message:
        'An error occurred while making an external request. Please try again later.',
      request: {
        method: method,
        url: options.url,
        params: options.params,
        body: options.data,
      },
      details: err,
    };
    return new InternalServerErrorException(errorBody);
  }

  private handleBody(_body: any): any {
    const { data, status } = _body;
    const body =
      typeof data === 'string' && JsonUtil.isJSONString(data)
        ? JSON.parse(data)
        : data;

    const statusCode =
      typeof body === 'object' && (body.status || body.statusCode)
        ? body.status || body.statusCode
        : status;

    return { body, statusCode };
  }

  private isSuccessStatusCode(status: number): boolean {
    return status >= 200 && status < 300;
  }
}
