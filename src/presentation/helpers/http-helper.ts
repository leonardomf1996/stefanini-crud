import { ServerError } from '../errors';
import { HttpResponse } from '../protocols';

export const badRequest = (error: Error): HttpResponse => ({
   statusCode: 400,
   body: error,
});

export const serverError = (): HttpResponse => ({
   statusCode: 400,
   body: new ServerError(),
});

export const ok = (data: unknown): HttpResponse => ({
   statusCode: 200,
   body: data,
});

export const created = (data: unknown): HttpResponse => ({
   statusCode: 201,
   body: data,
});

export const noContent = (): HttpResponse => ({
   statusCode: 204,
   body: null,
});