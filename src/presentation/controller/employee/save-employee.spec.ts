import { MissingParamError } from "../../errors";
import { SaveEmployeeController } from "./save-employee";

interface SutType {
   sut: SaveEmployeeController;
}

const makeSut = (): SutType => {
   const sut = new SaveEmployeeController();
   return { sut };
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
})