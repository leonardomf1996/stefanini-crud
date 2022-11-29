import { EmployeeModel } from "../../../domain/models/employee";
import { AddEmployee, AddEmployeeModel } from "../../../domain/usecases/add-employee";
import { MissingParamError, ServerError } from "../../errors";
import { SaveEmployeeController } from "./save-employee";

interface SutType {
   sut: SaveEmployeeController;
   addEmployeeStub: AddEmployee;
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

const makeSut = (): SutType => {
   const addEmployeeStub = makeAddEmployee();
   const sut = new SaveEmployeeController(addEmployeeStub);
   return { sut, addEmployeeStub };
}

describe('SaveEmployee Controller', () => {
   test('Should return 400 if no name is provided', async () => {
      const { sut } = makeSut();

      const httpRequest = {
         body: {
            age: 26,
            role: 'developer'
         }
      }

      const httpResponse = await sut.handle(httpRequest);

      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body).toEqual(new MissingParamError('name'));
   })

   test('Should return 400 if no age is provided', async () => {
      const { sut } = makeSut();

      const httpRequest = {
         body: {
            name: 'John Doe',
            role: 'developer'
         }
      }

      const httpResponse = await sut.handle(httpRequest);

      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body).toEqual(new MissingParamError('age'));
   })

   test('Should return 400 if no role is provided', async () => {
      const { sut } = makeSut();

      const httpRequest = {
         body: {
            name: 'John Doe',
            age: 26
         }
      }

      const httpResponse = await sut.handle(httpRequest);

      expect(httpResponse.statusCode).toBe(400);
      expect(httpResponse.body).toEqual(new MissingParamError('role'));
   })

   test('Should call AddEmployee with correct values', async () => {
      const { sut, addEmployeeStub } = makeSut();

      const saveSpy = jest.spyOn(addEmployeeStub, 'add');

      const httpRequest = {
         body: {
            name: 'John Doe',
            age: 26,
            role: 'developer'
         }
      }

      await sut.handle(httpRequest);

      expect(saveSpy).toHaveBeenCalledWith({
         name: 'John Doe',
         age: 26,
         role: 'developer'
      });
   })

   test('Should return 500 if AddEmployee throws', async () => {
      const { sut, addEmployeeStub } = makeSut();

      jest.spyOn(addEmployeeStub, 'add').mockImplementationOnce(() => {
         return new Promise((resolve, reject) => reject(new Error()))
      });

      const httpRequest = {
         body: {
            name: 'John Doe',
            age: 26,
            role: 'developer'
         }
      }

      const httpResponse = await sut.handle(httpRequest);

      expect(httpResponse.statusCode).toBe(500);
      expect(httpResponse.body).toEqual(new ServerError());
   })
})