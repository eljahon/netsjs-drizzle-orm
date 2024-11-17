import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto, LoginResponseDto, RegisterDto } from './dto';


@Controller()
@ApiTags('Auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'Login' })
  @ApiBody({ type: LoginDto })
  @ApiResponse({ status: 200, description: 'Login successful',type:LoginResponseDto })
  @HttpCode(200)
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async login(@Body() data: LoginDto) {
    return this.authService.login(data);
  }

  @Post('register')
  @HttpCode(200)
  @ApiOperation({ summary: 'Register' })
  @ApiResponse({ status: 200, description: 'Register successful' })
  @ApiResponse({ status: 400, description: 'Bad Request' })
  async register(@Body() data: RegisterDto) {
    return this.authService.register(data);
  }
}
