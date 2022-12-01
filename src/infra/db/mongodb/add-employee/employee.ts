import { AddEmployeeRepository } from "../../../../data/protocols/add-employee-repository";
import { EmployeeModel } from "../../../../domain/models/employee";
import { AddEmployeeModel } from "../../../../domain/usecases/add-employee";
import { MongoHelper } from "../helpers/mongo-helper";
import { map } from "./employee-mapper";

export class EmployeeMongoRepository implements AddEmployeeRepository {
   async add(accountData: AddEmployeeModel): Promise<EmployeeModel> {
      const employeeCollection = await MongoHelper.getCollection('employees');
      const result = await employeeCollection.insertOne(accountData);
      return map(result.ops[0]);
   }
}