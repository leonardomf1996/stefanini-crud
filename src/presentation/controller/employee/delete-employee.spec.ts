import { MissingParamError } from "../../errors";
import { DeleteEmployeeController } from "./delete-employee";

interface SutType {
   sut: DeleteEmployeeController;
}

const makeSut = (): SutType => {
   const sut = new DeleteEmployeeController();
   return { sut };
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
})