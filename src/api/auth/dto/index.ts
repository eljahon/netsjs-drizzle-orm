import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
import { userUpdateDto } from 'src/api/user/dto';
import { UserType } from 'src/databases/databaseSchema';

export class LoginDto {
  @ApiProperty({
    description: 'The phone number of the user',
    example: '+919876543210',
  })
  @IsString()
  @IsNotEmpty()
  phone: string;

  @ApiProperty({
    description: 'The password of the user',
    example: 'p@ssword',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
export class LoginResponseDto {
  @ApiProperty({
    description: 'The token of the user',
    example: 'token',
  })
  token: string;
  @ApiProperty({
    description: 'The user of the user',
    type: userUpdateDto,
  })
  user: userUpdateDto;   
}
export class RegisterDto extends LoginDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  email: string;
}
