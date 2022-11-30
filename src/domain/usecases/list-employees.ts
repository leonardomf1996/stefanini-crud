import { EmployeeModel } from "../models/employee";

export interface ListEmployeesModel {
   id: string;
   name: string;
   age: string;
   role: string;
}

export interface ListEmployees {
   list(): Promise<Array<EmployeeModel> | null>;
}
