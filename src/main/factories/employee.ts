import { SaveEmployeeController } from '../../presentation/controller/employee/save-employee';
import { DbAddEmployee } from '../../data/usecases/add-employee/db-add-employee';
import { EmployeeMongoRepository } from '../../infra/db/mongodb/employee'
import { ListEmployeesController } from '../../presentation/controller/employee/list-employee';
import { DeleteEmployeeController } from '../../presentation/controller/employee/delete-employee';
import { DbListEmployees } from '../../data/usecases/list-employees/db-list-employees';
import { DbDeleteEmployee } from '../../data/usecases/delete-employee/db-delete-employee';

export const makeSaveEmployeeController = (): SaveEmployeeController => {
   const employeeMongoRepository = new EmployeeMongoRepository();
   const dbAddEmployee = new DbAddEmployee(employeeMongoRepository);
   return new SaveEmployeeController(dbAddEmployee);
}

export const makeListEmployeesController = (): ListEmployeesController => {
   const employeeMongoRepository = new EmployeeMongoRepository();
   const dbListEmployees = new DbListEmployees(employeeMongoRepository);
   return new ListEmployeesController(dbListEmployees);
}

export const makeDeleteEmployeeController = (): DeleteEmployeeController => { 
   const employeeMongoRepository = new EmployeeMongoRepository();
   const dbDeleteEmployee = new DbDeleteEmployee(employeeMongoRepository);
   return new DeleteEmployeeController(dbDeleteEmployee);
}