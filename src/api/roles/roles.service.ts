import { HttpException, Injectable } from '@nestjs/common';
import { RolesTable, RoleType } from 'src/databases/databaseSchema';
import { DrizzleService } from 'src/databases/drizzle.service';
import { CreateRoleDto, findByIdQuery } from './dto/roles.dto';
import { eq, sql } from 'drizzle-orm';
import { PaginationDto, PaginationResult } from 'src/common/pagination';
import { roleResponseMessages } from 'src/common/messages';

@Injectable()
export class RolesService {
    constructor(private readonly drizzleService:DrizzleService){}

    async findAllRoles(query:PaginationDto):Promise<PaginationResult<RoleType>>{
        const {page, pageSize}=query
         const data=await this.drizzleService.db.query.RolesTable.findMany({
            offset:(page-1)*pageSize,
            limit:pageSize
        })
        const total=await this.drizzleService.db.select({count:sql<number>`count(*)`}).from(RolesTable).then(res=>res[0].count)
        const resutl:PaginationResult<RoleType>={
            data,
            meta:{
                page,
                pageSize,
                pageCount:Math.ceil(total/pageSize),
                total:+total
            }
        }
        return resutl
    }

    async findOneRole(id:string):Promise<RoleType|HttpException>{
        const role=await this.drizzleService.db.query.RolesTable.findFirst({
            where:eq(RolesTable.id,id)
        })
        if(!role) throw new HttpException(roleResponseMessages.roleNotFound,404)
        return role
    }

    async createRole(body:CreateRoleDto):Promise<RoleType|HttpException>{
        const [data]=await this.drizzleService.db.insert(RolesTable).values(body).returning()
        return data
    }

    async findRoleById(id:string):Promise<RoleType|HttpException>{
        await this.findOneRole(id)
        const role=await this.drizzleService.db.query.RolesTable.findFirst({
            where:eq(RolesTable.id,id)
        })
        return role
    }  

    async updateRole(id:string,body:any):Promise<RoleType|HttpException>{
        await this.findOneRole(id)
        const [role]=await this.drizzleService.db.update(RolesTable).set(body).where(eq(RolesTable.id,id)).returning()
        return role
    }

    async deleteRole(id:string):Promise<RoleType|HttpException>{
        await this.findOneRole(id)
        const [result]=await this.drizzleService.db.delete(RolesTable).where(eq(RolesTable.id,id)).returning()
        return result
    }

}
