import { DeleteEmployee, DeleteEmployeeModel } from "../../../domain/usecases/delete-employee";
import { DeleteEmployeeRepository } from "../../protocols/delete-employee-repository";

export class DbDeleteEmployee implements DeleteEmployee {
   constructor(
      private readonly deleteEmployeeRepository: DeleteEmployeeRepository,
   ) { }

   async delete(employee: DeleteEmployeeModel): Promise<void> {
      return this.deleteEmployeeRepository.delete(employee);
   }
}