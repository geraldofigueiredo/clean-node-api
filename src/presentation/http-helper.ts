import { ServerError } from './errors';
import { HttpResponse } from './protocols/http';

export const HttpBadRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});

export const HttpServerError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(),
});

export const HttpOkRequest = (body: any): HttpResponse => ({
  statusCode: 200,
  body: body,
});
