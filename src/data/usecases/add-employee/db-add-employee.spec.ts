import { AddEmployeeModel, EmployeeRepository, EmployeeModel } from "./db-add-employee-protocols";
import { DbAddEmployee } from "./db-add-employee";
import { DeleteEmployeeModel } from "../../../domain/usecases/delete-employee";
import { ListEmployeesModel } from "../../../domain/usecases/list-employees";

interface SutTypes {
   sut: DbAddEmployee;
   addEmployeeRepositoryStub: EmployeeRepository;
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

const makeSut = (): SutTypes => {
   const addEmployeeRepositoryStub = makeAddEmployeeRepository();
   const sut = new DbAddEmployee(addEmployeeRepositoryStub);
   return { sut, addEmployeeRepositoryStub };
}

describe('DbAddAccount use case', () => {
   test('should call AddEmployeeRepository with correct values', async () => {
      const { sut, addEmployeeRepositoryStub } = makeSut();

      const saveSpy = jest.spyOn(addEmployeeRepositoryStub, 'add');

      const employeeData = {
         name: 'valid_name',
         age: 'valid_age',
         role: 'valid_role',
      }

      await sut.add(employeeData);

      await expect(saveSpy).toHaveBeenCalledWith({
         name: 'valid_name',
         age: 'valid_age',
         role: 'valid_role',
      })
   });

   test('should return an employee if on success', async () => {
      const { sut } = makeSut();

      const employeeData = {
         name: 'valid_name',
         age: 'valid_age',
         role: 'valid_role',
      };

      const account = await sut.add(employeeData);

      expect(account).toEqual({
         id: 'valid_id',
         name: 'valid_name',
         age: 'valid_age',
         role: 'valid_role',
      });
   });
});