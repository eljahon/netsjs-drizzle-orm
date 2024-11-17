import { HttpException, Injectable } from '@nestjs/common';
// import { UserService } from '../user/user.service';
import { LoginDto, LoginResponseDto, RegisterDto } from './dto';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { hashCompare } from 'src/utils';
import { UserType } from 'src/databases/databaseSchema';

@Injectable()
export class AuthService {
    constructor(
      private readonly jwtService: JwtService,
      private readonly userService:UserService
    ) {}

  async login(data: LoginDto):Promise<{token:string,user:UserType}|HttpException>{
    const {phone,password}=data
    const user=await this.userService.findUserByPhone(phone)
    if(!user||user instanceof HttpException) throw new HttpException('User not found',404)
    delete user.password
    return {user,token: 'dafasfddsfd'} 
    // const isPasswordMatch=await hashCompare(password,user.password)
    // const isPasswordMatch=await hashCompare(password,user.password)
    // if(!isPasswordMatch) throw new HttpException('Invalid password',401)
    // const {token}=await this.jwtGenertor(user.id)
    // return {
    //   token,
    //   user
    // };
  }

  async register(data: RegisterDto) {
    return data;
  }
  async jwtGenertor (id:string) {
    return {
      token: await this.jwtService.signAsync({ id }),
    }
  }
}
