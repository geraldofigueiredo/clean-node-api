import { MissingParamError } from '../errors/missing-param-error';
import { HttpBadRequest } from '../http-helper';
import { HttpRequest, HttpResponse } from '../protocols/http';

export class SignUpController {
  handle(httpRequest: HttpRequest): HttpResponse {
    const requiredFields = ['name', 'email'];
    for (const field of requiredFields) {
      if (!httpRequest.body[field]) {
        return HttpBadRequest(new MissingParamError(field));
      }
    }
  }
}
