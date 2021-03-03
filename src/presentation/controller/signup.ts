import { InvalidParamError, MissingParamError } from '../errors';
import { HttpBadRequest, HttpServerError } from '../http-helper';
import { Controller } from '../protocols/controller';
import { IEmailValidator } from '../protocols/email-validator';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignUpController implements Controller {
  private readonly emailValidator: IEmailValidator;

  constructor(emailValidator: IEmailValidator) {
    this.emailValidator = emailValidator;
  }

  handle(httpRequest: HttpRequest): HttpResponse {
    try {
      const requiredFields = [
        'name',
        'email',
        'password',
        'passwordConfirmation',
      ];
      for (const field of requiredFields) {
        if (!httpRequest.body[field]) {
          return HttpBadRequest(new MissingParamError(field));
        }
      }
      const isValid = this.emailValidator.isValid(httpRequest.body.email);
      if (!isValid) {
        return HttpBadRequest(new InvalidParamError('email'));
      }
    } catch (error) {
      return HttpServerError();
    }
  }
}
