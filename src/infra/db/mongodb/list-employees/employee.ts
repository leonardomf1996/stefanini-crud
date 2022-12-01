import { ListEmployeesRepository } from "../../../../data/protocols/list-employees-repository";
import { ListEmployeesModel } from "../../../../domain/usecases/list-employees";
import { MongoHelper } from "../helpers/mongo-helper";

export class EmployeeMongoRepository implements ListEmployeesRepository {
   async list(): Promise<ListEmployeesModel[]> {
      const employeeCollection = await MongoHelper.getCollection('employees');
      const result = await employeeCollection.find().toArray();
      return result;
   }

}