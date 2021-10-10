import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import * as Request from 'native-request';
import { HttpMethod } from '../../common/enum/http.enum';
import { JsonUtil } from '../../common/util/json.util';

type Options = {
  url: string;
  headers?: { [key: string]: string };
  params?: { [key: string]: string };
  body?: { [key: string]: any };
};

@Injectable()
export class RequestRepository {
  async get(options: Options): Promise<any> {
    return this.request(HttpMethod.GET, options);
  }

  async post(options: Options): Promise<any> {
    return this.request(HttpMethod.POST, options);
  }

  async put(options: Options): Promise<any> {
    return this.request(HttpMethod.PUT, options);
  }

  async patch(options: Options): Promise<any> {
    return this.request(HttpMethod.PATCH, options);
  }

  async delete(options: Options): Promise<any> {
    return this.request(HttpMethod.DELETE, options);
  }

  async request(method: HttpMethod, options: Options): Promise<any> {
    const data = { method, ...options };

    return new Promise<any>((resolve, reject) => {
      Request.request(data, (err: any, data: any, status: number, _: any) => {
        if (err) {
          const error_body = {
            message:
              'An error occurred while making an external request. Please try again later.',
            request: {
              method: method,
              url: options.url,
              params: options.params,
              body: options.body,
            },
            details: err,
          };
          return reject(new InternalServerErrorException(error_body));
        }

        const body =
          typeof data === 'string' && JsonUtil.isJSONString(data)
            ? JSON.parse(data)
            : data;

        const statusCode =
          typeof body === 'object' && (body.status || body.statusCode)
            ? body.status || body.statusCode
            : status;

        if (!this.isSuccessStatusCode(statusCode)) {
          return reject(new HttpException(body, statusCode));
        }

        return resolve(body);
      });
    });
  }

  private isSuccessStatusCode(status: number): boolean {
    return status >= 200 && status < 300;
  }
}
