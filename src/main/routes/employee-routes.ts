import { Router } from "express";
import { adaptRoute } from "../adapters/express-route-adapter";
import { makeSaveEmployeeController, makeListEmployeesController, makeDeleteEmployeeController } from '../factories/employee';

export default (router: Router): void => {
   router.post('/employee', adaptRoute(makeSaveEmployeeController()));
   router.get('/employee', adaptRoute(makeListEmployeesController()));
   router.delete('/employee/:id', adaptRoute(makeDeleteEmployeeController()));
}