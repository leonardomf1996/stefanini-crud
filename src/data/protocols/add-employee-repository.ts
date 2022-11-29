import { EmployeeModel } from "../../domain/models/employee";
import { AddEmployeeModel } from "../../domain/usecases/add-employee";

export interface AddEmployeeRepository {
   add(accountData: AddEmployeeModel): Promise<EmployeeModel>;
}