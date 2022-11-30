import { DeleteEmployee, DeleteEmployeeModel } from "../../../domain/usecases/delete-employee";
import { MissingParamError } from "../../errors";
import { DeleteEmployeeController } from "./delete-employee";

interface SutType {
   sut: DeleteEmployeeController;
   deleteEmployeeStub: DeleteEmployee;
}

const makeDeleteEmployee = (): DeleteEmployee => {
   class DeleteEmployeeStub implements DeleteEmployee {
      async delete(employee: DeleteEmployeeModel): Promise<void> {
         return new Promise(resolve => resolve(null));
      }
   }
   return new DeleteEmployeeStub();
}

const makeSut = (): SutType => {
   const deleteEmployeeStub = makeDeleteEmployee();
   const sut = new DeleteEmployeeController(deleteEmployeeStub);
   return { sut, deleteEmployeeStub };
}

describe('DeketeEmployee Controller', () => {
   test('Should return 400 if no id is provided', async () => {
      const { sut } = makeSut();

      const httpRequest = {
         params: {}
      };

      const httpResponse = await sut.handle(httpRequest);

      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body).toEqual(new MissingParamError('id'));
   })

   test('Should call DeleteEmployee with correct values', async () => {
      const { sut, deleteEmployeeStub } = makeSut();

      const deleteSpy = jest.spyOn(deleteEmployeeStub, 'delete');

      const httpRequest = {
         params: {
            id: 'valid_id'
         }
      }

      await sut.handle(httpRequest);

      expect(deleteSpy).toHaveBeenCalledWith({
         id: 'valid_id'
      });
   })
})