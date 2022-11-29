import { AddEmployee, AddEmployeeModel, AddEmployeeRepository, EmployeeModel } from './db-add-employee-protocols';

export class DbAddEmployee implements AddEmployee {
   constructor(
      private readonly addEmployeeRepository: AddEmployeeRepository,
   ) { }

   async add(employee: AddEmployeeModel): Promise<EmployeeModel> {
      const newAccount = await this.addEmployeeRepository.add(Object.assign({}, employee));
      return newAccount;
   }
}