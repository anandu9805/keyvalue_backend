
import { getConnection } from "typeorm";
import { Address } from "../entities/Address";
import { Employee } from "../entities/Employee";

export class EmployeeRespository{
    async getAllEmployees(){
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.find({relations:['department']});
    }
    // async createEmployee(request:any){//request is any variable name here
    //     const employeeRepo = getConnection().getRepository(Employee).save(request);
    //    // return employeeRepo.find({relations:['department']});
    // }
    
    async getEmployeeById(id:any){
        const employeeRepo = getConnection().getRepository(Employee);
        return employeeRepo.findOne({ id });

        
    }
    async deleteEmployeeById(id:any){
        const employeeRepo = getConnection().getRepository(Employee);
        
       const data= await employeeRepo.softDelete(id);
      // console.log("the value returned after deleting",data.affected);
       return data;
      
       
        
    }
    async updateEmployeeById(id:any,body:any){

        const employeeRepo = getConnection().getRepository(Employee);
        const emp=await employeeRepo.findOne({ id });
        emp.name=body.name;
        const emp_updates=employeeRepo.save(emp);
        return emp_updates;

        
    }
//chnages made on dictation
    public async getEmployeeByName(name: string) {
        const employeeRepo = getConnection().getRepository(Employee);
        const employeeDetail = await employeeRepo.findOne({
            where: { name: name },
        });
        return employeeDetail;
    }
    public async createEmployee(employeeDetails: Employee) {
        const employeeRepo = getConnection().getRepository(Employee);
       
        return employeeRepo.save(employeeDetails);
    }
    // public async createEmployeeAddress(employeeaddressDetails: EmployeeAddress) {
    //     const employeeRepo = getConnection().getRepository(EmployeeAddress);
    //     return employeeRepo.save(employeeaddressDetails);
    // }
    }