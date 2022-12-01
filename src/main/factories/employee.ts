import { SaveEmployeeController } from '../../presentation/controller/employee/save-employee';
import { DbAddEmployee } from '../../data/usecases/add-employee/db-add-employee';
import { EmployeeMongoRepository } from '../../infra/db/mongodb/add-employee/employee'
import { EmployeeMongoRepository as ListEmployeeMongoRepository } from '../../infra/db/mongodb/list-employees/employee'
import { EmployeeMongoRepository as DeleteEmployeeMongoRepository } from '../../infra/db/mongodb/delete-employee/employee'
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
   const employeeMongoRepository = new ListEmployeeMongoRepository();
   const dbListEmployees = new DbListEmployees(employeeMongoRepository);
   return new ListEmployeesController(dbListEmployees);
}

export const makeDeleteEmployeeController = (): DeleteEmployeeController => { 
   const employeeMongoRepository = new DeleteEmployeeMongoRepository();
   const dbDeleteEmployee = new DbDeleteEmployee(employeeMongoRepository);
   return new DeleteEmployeeController(dbDeleteEmployee);
}