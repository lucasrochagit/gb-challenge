import { Injectable } from '@nestjs/common';

type SerializeOptions = {
  ignoreFromSource?: string[];
} & MapOptions;

type DeserializeOptions = {
  ignoreFromTarget?: string[];
} & MapOptions;

type MapOptions = {
  mappingParams?: { [key: string]: string };
};

@Injectable()
export class Serializer<Source, Target> {
  public serialize(source: Source, opt?: SerializeOptions): Target {
    const result: Target = {} as Target;
    const { ignoreFromSource = [] } = opt ?? {};

    const source_keys: string[] = Object.keys(source);
    return source_keys.reduce((obj, key) => {
      if (!!source[key] && ignoreFromSource.indexOf(key) === -1) {
        obj[this.getKey(key, opt?.mappingParams)] = source[key];
      }
      return obj;
    }, result);
  }

  public deserialize(target: Target, opt?: DeserializeOptions): Source {
    const result: Source = {} as Source;
    const { ignoreFromTarget = [] } = opt ?? {};

    const target_keys: string[] = Object.keys(target);
    return target_keys.reduce((obj, key) => {
      if (!!target[key] && ignoreFromTarget.indexOf(key) === -1) {
        obj[this.getKey(key, opt?.mappingParams)] = target[key];
      }
      return obj;
    }, result);
  }

  private getKey(
    key: string,
    mappingParams: { [key: string]: string },
  ): string {
    if (mappingParams && mappingParams.hasOwnProperty(key)) {
      return mappingParams[key];
    }
    return key;
  }
}
