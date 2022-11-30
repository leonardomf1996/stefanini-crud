import { MissingParamError } from "../../errors";
import { badRequest, noContent, serverError } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class DeleteEmployeeController {
   handle(httpRequest: HttpRequest): any {
      try {
         if (!httpRequest.params.id) {
            return badRequest(new MissingParamError('id'))
         }

      } catch (_) {
         return serverError();
      }
   }

}