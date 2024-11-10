import { IsString, IsEmail, IsOptional, IsPhoneNumber } from 'class-validator';


export class CreateLetsConnectSubmissionDto {
    @IsString()
    name:string;

    @IsEmail()
    email:string;

    @IsPhoneNumber('SG')
    @IsOptional()
    contactNumber?:string;

    @IsString()
    message:string
}
