import { DeleteEmployeeRepository } from "../../../../data/protocols/delete-employee-repository";
import { DeleteEmployeeModel } from "../../../../domain/usecases/delete-employee";
import { MongoHelper } from "../helpers/mongo-helper";

export class EmployeeMongoRepository implements DeleteEmployeeRepository {
   async delete(employeeData: DeleteEmployeeModel): Promise<void> {
      const employeeCollection = await MongoHelper.getCollection('employees');
      return await employeeCollection.deleteOne({ "_id": employeeData.id });
   }
}