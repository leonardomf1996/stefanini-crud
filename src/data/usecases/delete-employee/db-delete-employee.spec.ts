import { DeleteEmployeeModel } from "../../../domain/usecases/delete-employee";
import { DeleteEmployeeRepository } from "../../protocols/delete-employee-repository";
import { DbDeleteEmployee } from "./db-delete-employee";

interface SutTypes {
   sut: DbDeleteEmployee;
   deleteEmployeeRepositoryStub: DeleteEmployeeRepository;
}

const makeDeleteEmployeeRepository = (): DeleteEmployeeRepository => {
   class DeleteEmployeeRepositoryStub implements DeleteEmployeeRepository {
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