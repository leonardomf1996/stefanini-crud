import { MissingParamError } from "../../errors";
import { SaveEmployeeController } from "./save-employee";

describe('SaveEmployee Controller', () => {
   test('Should return 400 if no name is provided', async () => {
      const sut = new SaveEmployeeController();

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
})