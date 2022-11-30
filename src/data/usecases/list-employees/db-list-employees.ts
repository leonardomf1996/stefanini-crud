import { EmployeeModel } from '../../../domain/models/employee';
import { ListEmployees } from '../../../domain/usecases/list-employees';
import { ListEmployeesRepository } from '../../protocols/list-employees-repository';

export class DbListEmployees implements ListEmployees {
   constructor(
      private readonly listEmployeesRepository: ListEmployeesRepository,
   ) { }

   async list(): Promise<Array<EmployeeModel> | null> {
      const employees = await this.listEmployeesRepository.list();
      return employees;
   }
}