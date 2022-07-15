import { IsNumber, IsString } from "class-validator";

export class CreateEmployeeDto {
    @IsString()
    public name: string;
    @IsString()
    public password: string;

    @IsString()
    public departmentId: string;
    @IsString()
    public role: string;
    @IsString()
    public street_name: string;
    @IsString()
    public state_name: string;
    @IsString()
    public house_number: string;
   
}