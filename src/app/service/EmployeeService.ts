import { plainToClass } from "class-transformer";
import { Employee } from "../entities/Employee";
import EntityNotFoundException from "../exception/EntityNotFoundException";
import HttpException from "../exception/HttpException";
import { EmployeeRespository } from "../repository/EmployeeRepository";
import { ErrorCodes } from "../util/errorCode";
import bcrypt from "bcrypt";
import UserNotAuthorizedException from "../exception/UserNotAuthorizedException";
import IncorrectUsernameOrPasswordException from "../exception/IncorrectUsernameOrPasswordException";
import jsonwebtoken from "jsonwebtoken";
import { Address } from "../entities/Address";
import { CreateEmployeeDto } from "../dto/CreateEmployee";

import { AddressRepository } from "../repository/AddressRepository";
export class EmployeeService {
  constructor(
    private employeerepo: EmployeeRespository,
    private addressrepo: AddressRepository
  ) {}

  async getAllEmployees() {
    return this.employeerepo.getAllEmployees();
  }
  async deleteEmployeeById(id: any) {
    const data = await this.employeerepo.deleteEmployeeById(id);

    if (data.affected == 0) {
      throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
    }
    return data;
  }

  async getEmployeeById(id: any) {
    const data = await this.employeerepo.getEmployeeById(id);

    if (data == null) {
      throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
    }
    return data;
  }
  async updateEmployeeById(id: any, body: any) {
    const data = await this.employeerepo.updateEmployeeById(id, body);

    if (data == null) {
      throw new EntityNotFoundException(ErrorCodes.USER_WITH_ID_NOT_FOUND);
    }
    return data;
  }

  public async createEmployee(employeeDetails: CreateEmployeeDto) {
    try {
      const newAddress = plainToClass(Address, {
        street_name: employeeDetails.street_name,
        state_name: employeeDetails.state_name,
        house_number: employeeDetails.house_number,
      });
      const addressrecord = await this.addressrepo.addAddress(newAddress);

      const newEmployee = plainToClass(Employee, {
        name: employeeDetails.name,

        password: employeeDetails.password
          ? await bcrypt.hash(employeeDetails.password, 10)
          : "",

        departmentId: employeeDetails.departmentId,
        role: employeeDetails.role,
        address: addressrecord,
      });

      const save = await this.employeerepo.createEmployee(newEmployee);
      return save;
    } catch (err) {
      console.log(err);
    }
  }

  public employeeLogin = async (name: string, password: string) => {
    const employeeDetails = await this.employeerepo.getEmployeeByName(name);
    console.log(employeeDetails);
    if (!employeeDetails) {
      throw new UserNotAuthorizedException();
    }
    const validPassword = await bcrypt.compare(
      password,
      employeeDetails.password
    );
    console.log(validPassword);
    if (validPassword) {
      let payload = {
        "custom:id": employeeDetails.id,
        "custom:name": employeeDetails.name,
        "custom:role": employeeDetails.role,
      };
      const token = this.generateAuthTokens(payload);

      return {
        idToken: token,
        employeeDetails,
      };
    } else {
      throw new IncorrectUsernameOrPasswordException();
    }
  };

  private generateAuthTokens = (payload: any) => {
    return jsonwebtoken.sign(payload, process.env.JWT_TOKEN_SECRET, {
      expiresIn: process.env.ID_TOKEN_VALIDITY,
    });
  };
}
