import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "@sp/schemas";
import { Model } from "mongoose";
import { LoginDto } from "./dtos/login.dto";
import { RegisterDto } from "./dtos/register.dto";
import * as bcrypt from "bcrypt";

@Injectable()
export class AuthService {
  readonly HASH_SALT_ROUNDS = 10;

  constructor(
    private jwtService: JwtService,
    @InjectModel(User.name) private readonly userModel: Model<User>
  ) {}

  async register(dto: RegisterDto) {
    await this.ensureUserDoesNotExist(dto.email);
    this.ensureIsUniversityEmail(dto.email);
    const hashedPassword = await this.hashPassword(dto.password);
    const userId = await this.addUserToDB({ ...dto, password: hashedPassword });
    return { token: this.jwtService.sign({ id: userId }) };
  }

  private async ensureUserDoesNotExist(email: string) {
    const existingUser = await this.userModel.findOne({ email }).exec();
    if (existingUser) {
      throw new HttpException(
        "User with same email already exists",
        HttpStatus.CONFLICT
      );
    }
  }

  private ensureIsUniversityEmail(email: string) {
    if (!email.includes("@giu-uni.de")) {
      throw new HttpException(
        "Invalid university email, must include @giu-uni.de",
        HttpStatus.BAD_REQUEST
      );
    }
  }

  private async addUserToDB(user: User): Promise<string> {
    const result = await this.userModel.insertMany([user]);
    if (!result[0]) {
      console.log("Failed to add user", user);
      throw new HttpException(
        "Failed to add user",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return result[0]._id;
  }

  private async hashPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, this.HASH_SALT_ROUNDS);
  }

  login(dto: LoginDto) {
    //Return value should look like this at the end
    // return { token: this.jwtService.sign({ id:userId }) };
  }
}
