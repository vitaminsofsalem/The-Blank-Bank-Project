import { Body, Controller, Post } from "@nestjs/common";
import { LoginDto } from "./dtos/login.dto";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dtos/register.dto";

@Controller("auth")
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post("/register")
  async register(@Body() dto: RegisterDto) {
    return await this.authService.register(dto);
  }

  @Post("/login")
  login(@Body() dto: LoginDto) {
    this.authService.login(dto);
  }
}
