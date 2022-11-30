import { DeleteEmployee } from "../../../domain/usecases/delete-employee";
import { MissingParamError } from "../../errors";
import { badRequest, noContent, serverError } from "../../helpers/http-helper";
import { Controller, HttpRequest, HttpResponse } from "../../protocols";

export class DeleteEmployeeController implements Controller {
   constructor(
      private readonly deleteEmployee: DeleteEmployee,
   ) { }

   async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
         if (!httpRequest.params.id) {
            return badRequest(new MissingParamError('id'))
         }

         const { id } = httpRequest.params;
         await this.deleteEmployee.delete({ id })

         return noContent();
      } catch (_) {
         return serverError();
      }
   }

}