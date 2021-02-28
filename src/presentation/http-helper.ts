import { HttpResponse } from './protocols/http';

export const HttpBadRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error,
});
