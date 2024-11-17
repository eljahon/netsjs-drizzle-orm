import { Body, Controller, Get, HttpCode, Param, Post, Put, Query, Delete, HttpException } from '@nestjs/common';
import { ApiBody, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { RolesService } from './roles.service';
import { CreateRoleDto, findByIdQuery, UpdateRoleDto } from './dto/roles.dto';
import { PaginationDto, PaginationResult } from 'src/common/pagination';
import { roleResponseMessages } from 'src/common/messages';
import { RoleType } from 'src/databases/databaseSchema';
import { Type } from 'class-transformer';
@ApiTags('Roles')
@Controller()
export class RolesController {
    constructor(private readonly rolesService:RolesService){}

    @Get('roles')
    @HttpCode(200)
  
    async findAllRoles(@Query()query:PaginationDto):Promise<PaginationResult<RoleType>>{
            return await this.rolesService.findAllRoles(query)
    }
    @Get('role/:id')
    @ApiParam({name:'id',description:'Role uuid',type:String})
    @ApiResponse({
        status:200,
        description:roleResponseMessages.roleFound,
        type:UpdateRoleDto
    })
    @HttpCode(200)
    async findRoleById(@Param('id') id:string):Promise<RoleType|HttpException>{
        return await this.rolesService.findRoleById(id)
    }

    @Post('role')
    @ApiBody({type:CreateRoleDto})
    @ApiResponse({
        status:201,
        description:roleResponseMessages.roleCreated,
        type:UpdateRoleDto
    })
    async createRole(@Body() body:CreateRoleDto){
         return await this.rolesService.createRole(body)
    }

    @Put('role/:id')
    @ApiBody({type:CreateRoleDto})
    @ApiParam({name:'id',description:'Role uuid',type:String})
    @ApiResponse({
        status:200,
        description:roleResponseMessages.roleDeleted,
        type:UpdateRoleDto
    })
    async updateRole(@Param('id') id:string,@Body() body:CreateRoleDto):Promise<RoleType|HttpException>{
        return await this.rolesService.updateRole(id,body)
    }
    @Delete('role/:id')
    @ApiParam({name:'id',description:'Role uuid',type:String})
    @ApiResponse({
        status:204,
        description:roleResponseMessages.roleDeleted,
        type:UpdateRoleDto
    })
    async deleteRole(@Param('id') id:string):Promise<RoleType|HttpException>{
        return await this.rolesService.deleteRole(id)
    }
}
