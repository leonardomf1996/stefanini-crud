import { EmployeeModel } from "../../../domain/models/employee";
import { AddEmployee, AddEmployeeModel } from "../../../domain/usecases/add-employee";
import { ListEmployees } from "../../../domain/usecases/list-employees";
import { ListEmployeesController } from "./list-employee";
import { SaveEmployeeController } from "./save-employee";

interface SutType {
   sut: SaveEmployeeController;
   addEmployeeStub: AddEmployee;
   sutList: ListEmployeesController;
   listEmployeeStub: ListEmployees;
}

const makeAddEmployee = (): AddEmployee => {
   class AddEmployeeStub implements AddEmployee {
      async add(employee: AddEmployeeModel): Promise<EmployeeModel> {
         const fakeEmployee = {
            id: 'valid_id',
            name: 'valid_name',
            age: 'valid_age',
            role: 'valid_role',
         }
         return new Promise(resolve => resolve(fakeEmployee));
      }
   }
   return new AddEmployeeStub();
}

const makeListEmployees = (): ListEmployees => {
   class ListEmployeesStub implements ListEmployees {
      async list(): Promise<Array<EmployeeModel> | null> {
         return new Promise(resolve => resolve([]));
      }
   }
   return new ListEmployeesStub();
}

const makeSut = (): SutType => {
   const addEmployeeStub = makeAddEmployee();
   const sut = new SaveEmployeeController(addEmployeeStub);
   const listEmployeeStub = makeListEmployees();
   const sutList = new ListEmployeesController(listEmployeeStub);
   return { sut, addEmployeeStub, sutList, listEmployeeStub };
}

describe('ListEmployees Controller', () => {
   test('Should return 200 if return a employee', async () => {
      const { sut, sutList } = makeSut();

      const httpRequest = {
         body: {
            name: 'valid_name',
            age: 'valid_age',
            role: 'valid_role'
         }
      };

      await sut.handle(httpRequest);

      const httpResponse = await sutList.handle();

      expect(httpResponse).toBeTruthy();
      expect(httpResponse.statusCode).toBe(200);
   })
})