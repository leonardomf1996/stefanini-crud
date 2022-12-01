import { EmployeeModel } from "../../domain/models/employee";
import { AddEmployeeModel } from "../../domain/usecases/add-employee";
import { DeleteEmployeeModel } from "../../domain/usecases/delete-employee";
import { ListEmployeesModel } from "../../domain/usecases/list-employees";

export interface EmployeeRepository {
   add(accountData: AddEmployeeModel): Promise<EmployeeModel>;
   list(): Promise<Array<ListEmployeesModel> | null>;
   delete(employeeData: DeleteEmployeeModel): Promise<void>;
}