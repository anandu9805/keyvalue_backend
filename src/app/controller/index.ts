/**
 * Wraps Controllers for easy import from other modules
 */
import HealthController from "./HealthController";
import EmployeeController from "./EmployeeController";
import DepartmentController from "./DepartmentController";

import { EmployeeService } from "../service/EmployeeService";
import { DepartmentService } from "../service/DepartmentService";

import { EmployeeRespository } from "../repository/EmployeeRepository";
import { DepartemntRespository } from "../repository/DepartmentRepository";
import { AddressRepository } from "../repository/AddressRepository";
export default [
  new HealthController(),
  new EmployeeController(new EmployeeService(new EmployeeRespository(), new AddressRepository())),
  new DepartmentController(new DepartmentService(new DepartemntRespository())),

];
