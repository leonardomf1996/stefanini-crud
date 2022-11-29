import { AddEmployee } from "../../../domain/usecases/add-employee";
import { MissingParamError } from "../../errors";
import { badRequest, created, serverError } from "../../helpers/http-helper";
import { HttpRequest, HttpResponse, Controller } from "../../protocols";

export class SaveEmployeeController implements Controller {
   constructor(
      private readonly addEmployee: AddEmployee,
   ) { }

   async handle(httpRequest: HttpRequest): Promise<HttpResponse> {
      try {
         const requiredFields = ['name', 'age', 'role'];

         for (const field of requiredFields) {
            if (!httpRequest.body[field]) {
               return badRequest(new MissingParamError(field));
            }
         }

         const { name, age, role } = httpRequest.body;

         const employee = await this.addEmployee.add({
            name,
            age,
            role
         });

         return created(employee);
      } catch (_) {
         return serverError();
      }

   }
}