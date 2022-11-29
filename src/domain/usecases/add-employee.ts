import { EmployeeModel } from "../models/employee";

export interface AddEmployeeModel {
   name: string;
   age: string;
   role: string;
}

export interface AddEmployee {
   add(employee: AddEmployeeModel): Promise<EmployeeModel>;
}
