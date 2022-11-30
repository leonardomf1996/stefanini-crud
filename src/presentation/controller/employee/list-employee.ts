import { ListEmployees } from "../../../domain/usecases/list-employees";
import { ok, serverError } from "../../helpers/http-helper";
import { HttpResponse, Controller } from "../../protocols";

export class ListEmployeesController implements Controller {
   constructor(
      private readonly listEmployees: ListEmployees,
   ) { }

   async handle(): Promise<HttpResponse> {
      try {
         const employees = await this.listEmployees.list();
         return ok(employees);
      } catch (_) {
         return serverError();
      }
   }
}