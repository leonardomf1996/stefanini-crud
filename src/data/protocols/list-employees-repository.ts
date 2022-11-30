import { ListEmployeesModel } from "../../domain/usecases/list-employees";

export interface ListEmployeesRepository {
   list(): Promise<Array<ListEmployeesModel> | null>;
}