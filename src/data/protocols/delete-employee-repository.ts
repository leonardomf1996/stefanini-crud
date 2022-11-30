import { DeleteEmployeeModel } from "../../domain/usecases/delete-employee";

export interface DeleteEmployeeRepository {
   delete(employeeData: DeleteEmployeeModel): Promise<void>;
}