import { DeleteEmployeeModel } from "../../../domain/usecases/delete-employee";
import { ListEmployeesModel } from "../../../domain/usecases/list-employees";
import { EmployeeRepository } from "../../protocols/employee-repository";
import { AddEmployeeModel, EmployeeModel } from "../add-employee/db-add-employee-protocols";
import { DbDeleteEmployee } from "./db-delete-employee";

interface SutTypes {
   sut: DbDeleteEmployee;
   deleteEmployeeRepositoryStub: EmployeeRepository;
}

const makeDeleteEmployeeRepository = (): EmployeeRepository => {
   class DeleteEmployeeRepositoryStub implements EmployeeRepository {
      add(accountData: AddEmployeeModel): Promise<EmployeeModel> {
         throw new Error("Method not implemented.");
      }
      list(): Promise<ListEmployeesModel[]> {
         throw new Error("Method not implemented.");
      }
      async delete(employeeData: DeleteEmployeeModel): Promise<void> {
         return new Promise(resolve => resolve(null))
      }
   }
   return new DeleteEmployeeRepositoryStub();
}

const makeSut = (): SutTypes => {
   const deleteEmployeeRepositoryStub = makeDeleteEmployeeRepository();
   const sut = new DbDeleteEmployee(deleteEmployeeRepositoryStub);
   return { sut, deleteEmployeeRepositoryStub };
}

describe('DbAddAccount use case', () => {
   test('Should call DeleteEmployeeRepository with correct values', async () => {
      const { sut, deleteEmployeeRepositoryStub } = makeSut();

      const deleteSpy = jest.spyOn(deleteEmployeeRepositoryStub, 'delete');

      const employeeData = {
         id: 'valid_id'
      };

      await sut.delete(employeeData);

      await expect(deleteSpy).toHaveBeenCalledWith({
         id: 'valid_id'
      })
   })
})