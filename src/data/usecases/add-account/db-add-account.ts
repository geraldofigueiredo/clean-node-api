import {
  AccountModel,
  AddAccount,
  AddAccountModel,
  AddAccountRepository,
  Encrypter,
} from './db-add-account-protocols';

export class DbAddAccount implements AddAccount {
  private readonly encrypter: Encrypter;
  private readonly AddAccountRepository: AddAccountRepository;

  constructor(
    encrypter: Encrypter,
    addAccountRepository: AddAccountRepository
  ) {
    this.encrypter = encrypter;
    this.AddAccountRepository = addAccountRepository;
  }

  async add(accountData: AddAccountModel): Promise<AccountModel> {
    const hashedPassword = await this.encrypter.encrypt(accountData.password);
    const account = await this.AddAccountRepository.add(
      Object.assign({}, accountData, { password: hashedPassword })
    );
    return new Promise((resolve) => resolve(account));
  }
}
