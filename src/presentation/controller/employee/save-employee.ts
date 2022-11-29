import { MissingParamError } from "../../errors";
import { badRequest } from "../../helpers/http-helper";
import { HttpRequest } from "../../protocols";

export class SaveEmployeeController {
   handle(httpRequest: HttpRequest): any {
      const requiredFields = ['name', 'age', 'role'];

      for (const field of requiredFields) {
         if (!httpRequest.body[field]) {
            return badRequest(new MissingParamError(field));
         }
      }
   }
}