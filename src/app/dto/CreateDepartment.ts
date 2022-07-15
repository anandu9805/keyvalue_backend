import { IsNumber, IsString } from "class-validator";

export class CreateDepartmentDto {
    @IsString()
    public dep_name: string;
       
}