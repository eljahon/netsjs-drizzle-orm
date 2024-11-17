import { IsEmail, IsNotEmpty, IsOptional, IsPhoneNumber, IsString, IsUUID } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class userCreateDto {
  @ApiProperty({
    default: 'test first name',
    required: true,
    description: 'User first name',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;

  @ApiProperty({
    default: 'test last name',
    required: true,
    description: 'User last name',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;

  @ApiProperty({
    default: 'test@test.com',
    required: true,
    description: 'User email',
  })

  @ApiProperty({
    default: 'p@ssword',
    required: true,
    description: 'User password',
  })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({
    default: '+919876543210',
    required: true,
    description: 'User phone number',
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber()
  
  phone: string;

  @ApiProperty({
    required: true,
    description: 'User role id',
  })
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  role_id: string;
}

export class userQueryDto{
  @IsNotEmpty()
  @IsUUID()
  id: string;
}

export class userUpdateDto extends userCreateDto{
  @ApiProperty({
    required: true,
    description: 'User id',
  })
  @IsNotEmpty()
  @IsUUID()
  id: string;
}