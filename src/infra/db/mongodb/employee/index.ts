import { EmployeeRepository } from "../../../../data/protocols/employee-repository";
import { EmployeeModel } from "../../../../domain/models/employee";
import { AddEmployeeModel } from "../../../../domain/usecases/add-employee";
import { DeleteEmployeeModel } from "../../../../domain/usecases/delete-employee";
import { ListEmployeesModel } from "../../../../domain/usecases/list-employees";
import { MongoHelper } from "../helpers/mongo-helper";
import { map } from "./employee-mapper";

export class EmployeeMongoRepository implements EmployeeRepository {
   async add(accountData: AddEmployeeModel): Promise<EmployeeModel> {
      const employeeCollection = await MongoHelper.getCollection('employees');
      const result = await employeeCollection.insertOne(accountData);
      return map(result.ops[0]);
   }
   async list(): Promise<ListEmployeesModel[]> {
      const employeeCollection = await MongoHelper.getCollection('employees');
      const result = await employeeCollection.find().toArray();
      return result;
   }
   async delete(employeeData: DeleteEmployeeModel): Promise<void> {
      const employeeCollection = await MongoHelper.getCollection('employees');
      return await employeeCollection.deleteOne({ "_id": employeeData.id });
   }
}