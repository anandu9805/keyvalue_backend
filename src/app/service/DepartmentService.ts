import { plainToClass } from "class-transformer";
import { IsNull } from "typeorm";
import { CreateDepartmentDto } from "../dto/CreateDepartment";
import { department } from "../entities/Department";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import { DepartemntRespository } from "../repository/DepartmentRepository";
import { ErrorCodes } from "../util/errorCode";
export class DepartmentService {
  constructor(private departmentrepo: DepartemntRespository) {}

  async getAllDepartment() {
    return this.departmentrepo.getAllDepartment();
  }

  public async createDepartment(departmentDetails: CreateDepartmentDto) {
    try {
      const newdep = plainToClass(department, {
        dep_name: departmentDetails.dep_name,
      });

      const save = await this.departmentrepo.createDepartment(newdep);
      return save;
    } catch (err) {
      console.log(err);
    }
  }
  async getDepartmentById(id: any) {
    const data = await this.departmentrepo.getdepartmentById(id);

    if (data == null) {
      throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
    }
    return data;
  }
  async updateDepartmentById(id: any, body: any) {
    const data = await this.departmentrepo.updateDepartmentById(id, body);

    if (data == null) {
      throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
    }
    return data;
  }
  async deleteDepartmentById(id: any) {
    const dept = await this.departmentrepo.getdepartmentById(id);
    if (dept == null) {
      throw new EntityNotFoundException(
        ErrorCodes.DEPARTMENT_WITH_ID_NOT_FOUND
      );
    } else {
      const employee = await this.departmentrepo.getemployeeBydept(id);

      if (employee != null) {
        throw new EntityNotFoundException(ErrorCodes.FOREIGN_KEY_ERROR);
      } else {
        const data = await this.departmentrepo.deleteDepartmentById(id);
        return data;
      }
    }
  }
}
