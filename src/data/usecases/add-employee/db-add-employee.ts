import { AddEmployee, AddEmployeeModel, EmployeeRepository, EmployeeModel } from './db-add-employee-protocols';

export class DbAddEmployee implements AddEmployee {
   constructor(
      private readonly addEmployeeRepository: EmployeeRepository,
   ) { }

   async add(employee: AddEmployeeModel): Promise<EmployeeModel> {
      const newAccount = await this.addEmployeeRepository.add(Object.assign({}, employee));
      return newAccount;
   }
}