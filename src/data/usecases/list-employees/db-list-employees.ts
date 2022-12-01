import { EmployeeModel } from '../../../domain/models/employee';
import { ListEmployees } from '../../../domain/usecases/list-employees';
import { EmployeeRepository } from '../../protocols/employee-repository';

export class DbListEmployees implements ListEmployees {
   constructor(
      private readonly listEmployeesRepository: EmployeeRepository,
   ) { }

   async list(): Promise<Array<EmployeeModel> | null> {
      const employees = await this.listEmployeesRepository.list();
      return employees;
   }
}