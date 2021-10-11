import { PasswordUtil } from '../../../../src/business/util/password.util';

describe('PasswordUtil', () => {
  describe('encryptPassword', () => {
    describe('when encrypt a password text', () => {
      it('should return the encrypted password', () => {
        const result = PasswordUtil.encryptPassword('password');
        expect(result).toBeDefined();
      });
    });

    describe('when text is empty', () => {
      it('should return nothing', () => {
        const result = PasswordUtil.encryptPassword('');
        expect(result).toBeUndefined();
      });
    });

    describe('when text is null', () => {
      it('should return nothing', () => {
        const result = PasswordUtil.encryptPassword(null);
        expect(result).toBeUndefined();
      });
    });

    describe('when text is undefined', () => {
      it('should return nothing', () => {
        const result = PasswordUtil.encryptPassword(undefined);
        expect(result).toBeUndefined();
      });
    });
  });

  describe('isSamePassword', () => {
    describe('when a  password and an encrypted password are the same', () => {
      it('should return true', () => {
        const pwd = 'p4ssw0rd';
        const encryptedPwd = PasswordUtil.encryptPassword(pwd);
        const result = PasswordUtil.isSamePassword(pwd, encryptedPwd);
        expect(result).toEqual(true);
      });
    });

    describe('when a  password and an encrypted password are not the same', () => {
      it('should return true', () => {
        const pwd = 'p4ssw0rd';
        const encryptedPwd = PasswordUtil.encryptPassword('4n0th3rPwd');
        const result = PasswordUtil.isSamePassword(pwd, encryptedPwd);
        expect(result).toEqual(false);
      });
    });

    describe('when passwors are empty', () => {
      it('should return false', () => {
        const result = PasswordUtil.isSamePassword('', '');
        expect(result).toEqual(false);
      });
    });

    describe('when passwors are null', () => {
      it('should return false', () => {
        const result = PasswordUtil.isSamePassword(null, null);
        expect(result).toEqual(false);
      });
    });

    describe('when passwors are undefined', () => {
      it('should return false', () => {
        const result = PasswordUtil.isSamePassword(undefined, undefined);
        expect(result).toEqual(false);
      });
    });
  });
});
