import { EmployeeModel } from "../../../domain/models/employee";
import { AddEmployeeModel } from "../../../domain/usecases/add-employee";
import { ListEmployeesRepository } from "../../protocols/list-employees-repository";
import { DbAddEmployee } from "../add-employee/db-add-employee";
import { AddEmployeeRepository } from "../add-employee/db-add-employee-protocols";
import { DbListEmployees } from "./db-list-employees";

interface SutTypes {
   sut: DbAddEmployee;
   addEmployeeRepositoryStub: AddEmployeeRepository;
   sutList: DbListEmployees;
   listEmployeesRepositoryStub: ListEmployeesRepository;
}

const makeAddEmployeeRepository = (): AddEmployeeRepository => {
   class AddEmployeeRepositoryStub implements AddEmployeeRepository {
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

const makeListEmployeesRepository = (): ListEmployeesRepository => {
   class ListEmployeesRepositoryStub implements ListEmployeesRepository {
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
});