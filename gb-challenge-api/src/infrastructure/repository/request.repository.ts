import { HttpException, Injectable } from '@nestjs/common';
import axios from 'axios';
import { JsonUtil } from '../../common/util/json.util';

type Options = {
  url: string;
  headers?: { [key: string]: string };
  params?: { [key: string]: any };
  data?: any;
};

@Injectable()
export class RequestRepository {
  async get(options: Options): Promise<any> {
    return this.handleResponse(await axios.get(options.url, options));
  }

  private handleResponse(response: any): any | HttpException {
    const { body, statusCode } = this.handleBody(response);
    if (!this.isSuccessStatusCode(statusCode)) {
      throw new HttpException(body, statusCode);
    }
    return body;
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
    return status >= 200 && status <= 299;
  }
}
