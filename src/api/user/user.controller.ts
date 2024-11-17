import { Body, Controller, Delete, Get, HttpException, Param, Post, Put, Query, Req } from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PaginationDto, PaginationResult } from 'src/common/pagination';
import { UsersTable, UserType } from 'src/databases/databaseSchema';
import { userCreateDto, userQueryDto, userUpdateDto } from './dto';
import {userResponseMessages} from 'src/common/messages';
import { Request } from 'express';
@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('users')
  async findAllUsers(@Query()query: PaginationDto):Promise<PaginationResult<UserType>|HttpException>{
    return await this.userService.findAllUsers(query);
  }

  @Get('user/:id')
  async findOneUser(@Param() query:userQueryDto):Promise<UserType|HttpException>{
    const {id}=query
    return await this.userService.findOneUser(id)
  }
  @Post('user')
  
  async createUser(
    @Body() body: userCreateDto,
  ): Promise<UserType> {
    return await this.userService.createUser(body);
  }

  @Put('user/:id')

  @ApiResponse({
    status: 200,
    description: userResponseMessages.userUpdated,
    type: userUpdateDto
  })

  async updateUser(@Param() query:userQueryDto,@Body() body:userCreateDto):Promise<UserType|HttpException>{
    const {id}=query
    return await this.userService.updateUser(id,body)
  }

  @Delete('user/:id')
  @ApiResponse({
    status: 200,
    description: userResponseMessages.userDeleted,
    type: userUpdateDto
  })
  @ApiParam({
    name: 'id',
    description: 'User uuid',
    type: String
  })
  async deleteUser(@Param('id') id:string):Promise<UserType|HttpException>{
    return await this.userService.deleteUser(id)
  }
  @Get('user/me')
  async getUserMe(@Req() req:Request):Promise<{message:string}|HttpException|any>{
    console.log(req)
    return 
  }
}
