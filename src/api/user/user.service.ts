import { Injectable, Inject, HttpException } from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import { count, eq, ilike, or, sql } from 'drizzle-orm';
import { UserType, UsersTable } from 'src/databases/databaseSchema';
import { QueryBuilder } from 'drizzle-orm/pg-core';
import { PaginationDto, PaginationResult } from 'src/common/pagination';

import { DrizzleService } from 'src/databases/drizzle.service';
import { userCreateDto } from './dto';
import { hashGenerator } from 'src/utils';

@Injectable()
export class UserService {
  constructor(private readonly drizzleService: DrizzleService) {}

  async findAllUsers(query: PaginationDto):Promise<PaginationResult<UserType>|null>{
    try{
        const { page, pageSize, search } = query;
    const users=await this.drizzleService.db.query.UsersTable.findMany({
      limit:pageSize,
      offset:(page-1)*pageSize,
    //   with:{
    //     role:true
    //   }
    })
    console.log(users, 'users')
    const total=await this.drizzleService.db.select({count:count()}).from(UsersTable).then(res=>res[0].count)
    const result:PaginationResult<UserType> = {
      data:users,
      meta: {
        page:page,
        pageSize:pageSize,
        pageCount:Math.ceil(total/pageSize),
        total:total
      }
      }
      return result
    } catch(error){
      console.log(error)
      throw new HttpException('Internal server error',500)
    }
    
  }

  async findOneUser(id: string): Promise<UserType | HttpException> {
    const user=await this.drizzleService.db.query.UsersTable.findFirst({
      where:eq(UsersTable.id,id),
      with:{
        role:true
      }
    })
    if(!user) throw new HttpException('User not found',404)
    return user;
  }

  async createUser(user:userCreateDto): Promise<UserType> {
    const hashedPassword=await hashGenerator(user.password) 
    const [newUser] = await this.drizzleService.db
      .insert(UsersTable)
      .values({...user,password:hashedPassword})
      .returning();
    delete newUser.password
    return newUser;
  }
 
  async updateUser(id: string,user:typeof UsersTable.$inferInsert): Promise<UserType|HttpException> {
    await this.findOneUser(id)
    const [updatedUser] = await this.drizzleService.db
      .update(UsersTable)
      .set(user)
      .where(eq(UsersTable.id, id))
      .returning();
    return updatedUser;
  } 

  async deleteUser(id: string): Promise<UserType|HttpException> {
    await this.findOneUser(id)
    const [deletedUser] = await this.drizzleService.db
      .delete(UsersTable)
      .where(sql`id = ${id}`)
      .returning();
    return deletedUser;
  }

  async findUserByPhone(phone:string):Promise<UserType|HttpException>{
    const user=await this.drizzleService.db.query.UsersTable.findFirst({
      where:eq(UsersTable.phone,phone),
      with:{
        role:true
      }
    })
    if(!user) throw new HttpException('User not found',404)
    return user
  }
  async getUserMe(req:Request):Promise<{message:string}>{
    // const user=req.user as UserType
    return {
      message:'user me'
    }
  }
}
