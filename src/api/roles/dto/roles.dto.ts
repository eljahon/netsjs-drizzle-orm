

import { ApiProperty } from "@nestjs/swagger";
import { IsArray, IsNotEmpty,IsString, IsUUID } from "class-validator";

export class CreateRoleDto{
    @ApiProperty({
        default:'user',
        required:true,
        description:'Role name default is user'
    })
    @IsString()
    @IsNotEmpty()
    name:string

    @ApiProperty({
        default:[],
        required:true,
        description:'Role permissions array default is empty'
    })
    @IsArray()
    @IsNotEmpty()
    permissions:string[]
}

export class findByIdQuery{
    @IsUUID()
    @IsNotEmpty()
    id:string
}
export class UpdateRoleDto extends CreateRoleDto{
    @IsUUID()
    @IsNotEmpty()
    id:string
}