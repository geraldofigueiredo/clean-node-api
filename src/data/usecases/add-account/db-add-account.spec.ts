import { Encrypter } from '../../protocols/encrypter';
import { DbAddAccount } from './db-add-account';

describe('DbAddAccount Usecase', () => {
  test('Should Call Encrypter with correct password', async () => {
    class EncrypterStub implements Encrypter {
      async encrypt(value: string): Promise<string> {
        return new Promise((resolve) => resolve('hashed_password'));
      }
    }
    const encypterStub = new EncrypterStub();
    const sut = new DbAddAccount(encypterStub);
    const encryptSpy = jest.spyOn(encypterStub, 'encrypt');
    const accountData = {
      name: 'valid_name',
      email: 'valid_email@email.com',
      password: 'valid_password',
    };
    await sut.add(accountData);
    expect(encryptSpy).toHaveBeenCalledWith('valid_password');
  });
});
