import { DeleteEmployee, DeleteEmployeeModel } from "../../../domain/usecases/delete-employee";
import { MissingParamError, ServerError } from "../../errors";
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

   test('Should return 500 if DeleteEmployee throws', async () => {
      const { sut, deleteEmployeeStub } = makeSut();

      jest.spyOn(deleteEmployeeStub, 'delete').mockImplementationOnce(() => {
         return new Promise((resolve, reject) => reject(new Error()))
      });

      const httpRequest = {
         params: {
            id: 'valid_id'
         }
      }

      const httpResponse = await sut.handle(httpRequest);

      expect(httpResponse.statusCode).toBe(500);
      expect(httpResponse.body).toEqual(new ServerError());
   })

   test('Should return 204 if valid data is provided', async () => {
      const { sut } = makeSut();

      const httpRequest = {
         params: {
            id: 'valid_id'
         }
      };

      const httpResponse = await sut.handle(httpRequest);

      expect(httpResponse.statusCode).toBe(204);
      expect(httpResponse.body).toEqual(null);
   })
})