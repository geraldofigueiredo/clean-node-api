import { MissingParamError } from '../errors/missing-param-error';
import { HttpBadRequest } from '../http-helper';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    if (!httpRequest.body.name) {
      return HttpBadRequest(new MissingParamError('name'));
    }
    if (!httpRequest.body.email) {
      return HttpBadRequest(new MissingParamError('email'));
    }
  }
}
