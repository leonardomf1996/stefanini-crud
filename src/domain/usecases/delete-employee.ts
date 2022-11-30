export interface DeleteEmployeeModel {
   id: string;
}

export interface DeleteEmployee {
   delete(employee: DeleteEmployeeModel): Promise<void>;
}
