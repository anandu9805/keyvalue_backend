import { AbstractController } from "../util/rest/controller";
import { NextFunction, Response } from "express";
import RequestWithUser from "../util/rest/request";
import APP_CONSTANTS from "../constants";
import { DepartmentService } from "../service/DepartmentService";
import { department } from "../entities/Department";
import Roles from "../constants/roles";
import authorize from "../middleware/AuthorizationMiddleware";
import validationMiddleware from "../middleware/validationMIddleware";
import { CreateDepartmentDto } from "../dto/CreateDepartment";
class DepartmentController extends AbstractController {
  constructor(private departmentService: DepartmentService) {
    super(`${APP_CONSTANTS.apiPrefix}/department`);
    this.initializeRoutes();
  }
  protected initializeRoutes() {
    this.router.get(`${this.path}`,authorize([Roles.admin, Roles.engineer, Roles.hr, Roles.manager]), this.getAllDepartment);
    this.router.post(`${this.path}`, authorize([Roles.admin, Roles.hr]),validationMiddleware(CreateDepartmentDto, APP_CONSTANTS.body), this.createDepartment);
    this.router.get(
      `${this.path}/:id`,

     authorize([Roles.admin, Roles.engineer, Roles.hr, Roles.manager]), 
      this.getDepartmentById
    );
    this.router.put(
      `${this.path}/:id`,authorize([Roles.admin, Roles.hr]),
     
      this.updateDepartmentById 
    );
     this.router.delete(
      `${this.path}/:id`,
      authorize([Roles.admin, Roles.hr]),
      this.deleteDepartmentById
    );
  }
 
  private getDepartmentById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.departmentService.getDepartmentById(
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


  private getAllDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = { message: "Employee Controller" };
      response.status(200);
      response.send(this.departmentService.getAllDepartment());
    } catch (error) {
      return next(error);
    }
  };


  private createDepartment = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data:department = await this.departmentService.createDepartment(
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
  private updateDepartmentById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.departmentService.updateDepartmentById(
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
  private deleteDepartmentById = async (
    request: RequestWithUser,
    response: Response,
    next: NextFunction
  ) => {
    try {
      const data: any = await this.departmentService.deleteDepartmentById(
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
}

export default DepartmentController;
