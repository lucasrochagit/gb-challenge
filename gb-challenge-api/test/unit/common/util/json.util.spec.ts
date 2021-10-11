import { JsonUtil } from '../../../../src/common/util/json.util';

describe('JsonUtil', () => {
  describe('when validate if a string is a json', () => {
    it('should return true', () => {
      const result = JsonUtil.isJSONString(JSON.stringify({ key: 'value' }));
      expect(result).toEqual(true);
    });
  });

  describe('when param is not a json', () => {
    it('should return false', () => {
      const result = JsonUtil.isJSONString('notAJson');
      expect(result).toEqual(false);
    });
  });

  describe('when param is empty', () => {
    it('should return false', () => {
      const result = JsonUtil.isJSONString('');
      expect(result).toEqual(false);
    });
  });

  describe('when param is null', () => {
    it('should return false', () => {
      const result = JsonUtil.isJSONString(null);
      expect(result).toEqual(false);
    });
  });

  describe('when param is undefined', () => {
    it('should return false', () => {
      const result = JsonUtil.isJSONString(undefined);
      expect(result).toEqual(false);
    });
  });
});
