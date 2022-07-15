import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { EmployeeService } from "../service/EmployeeService";
import validationMiddleware from "../middleware/validationMIddleware";
import { CreateEmployeeDto } from "../dto/CreateEmployee";
import authorize from "../middleware/AuthorizationMiddleware";
import Roles from "../constants/roles";
import { Employee } from "../entities/Employee";

class EmployeeController extends AbstractController {
  constructor(private employeeService: EmployeeService) {
    super(`${APP_CONSTANTS.apiPrefix}/employee`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(
      `${this.path}`,
      authorize([Roles.admin, Roles.engineer, Roles.hr, Roles.manager]),
      this.getAllEmployees
    );

    this.router.post(
      `${this.path}`,

      validationMiddleware(CreateEmployeeDto, APP_CONSTANTS.body),
      this.createEmployee
    );

    this.router.get(
      `${this.path}/:id`,
      authorize([Roles.admin, Roles.engineer, Roles.hr, Roles.manager]),
      this.getEmployeeById
    );
    this.router.put(
      `${this.path}/:id`,
      authorize([Roles.admin, Roles.hr]),
      this.updateEmployeeById
    );
    this.router.post(`${this.path}/login`, this.login);
    this.router.delete(
      `${this.path}/:id`,
      authorize([Roles.admin, Roles.hr]),
      this.deleteEmployeeById
    );
  }

  private createEmployee = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: Employee = await this.employeeService.createEmployee(
        request.body
      );
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };

  private getAllEmployees = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.getAllEmployees();
      response.status(200);
      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };
  private getEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.getEmployeeById(
        request.params.id
      );
      response.status(200);

      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };
  private deleteEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.deleteEmployeeById(
        request.params.id
      );
      response.status(200);

      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };
  private updateEmployeeById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.employeeService.updateEmployeeById(
        request.params.id,
        request.body
      );
      response.status(200);

      response.send(
        this.fmt.formatResponse(data, Date.now() - request.startTime, "OK", 1)
      );
    } catch (error) {
      return next(error);
    }
  };
  private login = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    const loginData = request.body;
    const loginDetail = await this.employeeService.employeeLogin(
      loginData.name,
      loginData.password
    );
    response.send(
      this.fmt.formatResponse(loginDetail, Date.now() - request.startTime, "OK")
    );
  };
}

export default EmployeeController;
