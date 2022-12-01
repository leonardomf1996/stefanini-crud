import { EmployeeModel } from "../../../domain/models/employee";
import { AddEmployeeModel } from "../../../domain/usecases/add-employee";
import { DeleteEmployeeModel } from "../../../domain/usecases/delete-employee";
import { ListEmployeesModel } from "../../../domain/usecases/list-employees";
import { EmployeeRepository } from "../../protocols/employee-repository";
import { DbAddEmployee } from "../add-employee/db-add-employee";
import { DbListEmployees } from "./db-list-employees";

interface SutTypes {
   sut: DbAddEmployee;
   addEmployeeRepositoryStub: EmployeeRepository;
   sutList: DbListEmployees;
   listEmployeesRepositoryStub: EmployeeRepository;
}

const makeAddEmployeeRepository = (): EmployeeRepository => {
   class AddEmployeeRepositoryStub implements EmployeeRepository {
      list(): Promise<ListEmployeesModel[]> {
         throw new Error("Method not implemented.");
      }
      delete(employeeData: DeleteEmployeeModel): Promise<void> {
         throw new Error("Method not implemented.");
      }
      async add(employeeData: AddEmployeeModel): Promise<EmployeeModel> {
         const fakeEmployee = {
            id: 'valid_id',
            name: 'valid_name',
            age: 'valid_age',
            role: 'valid_role',
         }

         return new Promise(resolve => resolve(fakeEmployee));
      }
   }
   return new AddEmployeeRepositoryStub();
}

const makeListEmployeesRepository = (): EmployeeRepository => {
   class ListEmployeesRepositoryStub implements EmployeeRepository {
      add(accountData: AddEmployeeModel): Promise<EmployeeModel> {
         throw new Error("Method not implemented.");
      }
      delete(employeeData: DeleteEmployeeModel): Promise<void> {
         throw new Error("Method not implemented.");
      }
      async list(): Promise<Array<EmployeeModel> | null> {
         return new Promise(resolve => resolve([
            {
               id: 'valid_id',
               name: 'valid_name',
               age: 'valid_age',
               role: 'valid_role',
            }
         ]));
      }
   }
   return new ListEmployeesRepositoryStub();
}

const makeSut = (): SutTypes => {
   const addEmployeeRepositoryStub = makeAddEmployeeRepository();
   const sut = new DbAddEmployee(addEmployeeRepositoryStub);
   const listEmployeesRepositoryStub = makeListEmployeesRepository();
   const sutList = new DbListEmployees(listEmployeesRepositoryStub);
   return { sut, addEmployeeRepositoryStub, sutList, listEmployeesRepositoryStub };
}

describe('DblistEmployees use case', () => {
   test('should return an employee if on success', async () => {
      const { sut, sutList } = makeSut();

      await sut.add({
         name: 'valid_name',
         age: 'valid_age',
         role: 'valid_role',
      });

      const employees = await sutList.list();

      expect(employees).toEqual([
         {
            id: 'valid_id',
            name: 'valid_name',
            age: 'valid_age',
            role: 'valid_role',
         }
      ]);
   });

   test('should return null if not exists employee', async () => {
      const { sutList } = makeSut();

      const employees = await sutList.list();
      employees.shift();
      
      expect(employees).toEqual([]);
   });
});