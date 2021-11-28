import { Body, Controller, Post } from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  /**
   * API endpoint handler for user login
   * @param dto
   */
  @Post('/login')
  login(@Body() dto: AuthDto) {
    // TODO: Add your login logic here
  }
}
