
import { getConnection } from "typeorm";
import { department } from "../entities/Department";
import { Employee } from "../entities/Employee";
export class DepartemntRespository{
    async getAllDepartment(){
        const departmentRepo = getConnection().getRepository(department);
        return departmentRepo.find({relations:['employee']});
    }
    public async createDepartment(departmentDetails:department) {
        const employeeRepo = getConnection().getRepository(department);
       
        return employeeRepo.save(departmentDetails);
    }
    async getdepartmentById(id:any){
        const departmentRepo = getConnection().getRepository(department);
        return departmentRepo.findOne({ id });

        
    }
    async getemployeeBydept(id:any){
        const employeeRepo = getConnection().getRepository(Employee);
        console.log("employee in a dept",await employeeRepo.findOne({ id }));
        return employeeRepo.findOne({ id });
        

        
    }
    async updateDepartmentById(id:any,body:any){

        const departmentRepo = getConnection().getRepository(department);
        const dep=await departmentRepo.findOne({ id });
        dep.dep_name=body.dep_name;
        const dep_updates=departmentRepo.save(dep);
        return dep_updates;

        
    }
    async deleteDepartmentById(id:any){
        const departmentRepo = getConnection().getRepository(department);
        
       const data= await departmentRepo.softDelete(id);
      // console.log("the value returned after deleting",data.affected);
       return data;
      
       
        
    }
    }