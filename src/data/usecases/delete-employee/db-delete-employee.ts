import { DeleteEmployee, DeleteEmployeeModel } from "../../../domain/usecases/delete-employee";
import { EmployeeRepository } from "../../protocols/employee-repository";

export class DbDeleteEmployee implements DeleteEmployee {
   constructor(
      private readonly deleteEmployeeRepository: EmployeeRepository,
   ) { }

   async delete(employee: DeleteEmployeeModel): Promise<void> {
      return this.deleteEmployeeRepository.delete(employee);
   }
}