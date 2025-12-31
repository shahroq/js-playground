import { AppError, AppQuery, config, UserDto } from "@/common/container";
import type { CreateUserDto } from "./dto/create.dto";
import { UserRepository } from "./repository";
import type { UserService } from "./service";
import type { SignInDto } from "./dto/sign-in.dto";
import { password } from "bun";

export class AuthService {
  constructor(
    private readonly repository: UserRepository,
    private readonly userService: UserService
  ) {}

  async signUp(signUpDto: CreateUserDto) {
    // force user role as USER
    signUpDto = {
      ...signUpDto,
      role: config.default.user_role,
    };
    const newItem = await this.userService.createItem(signUpDto);

    // send an email
    // ...

    return UserDto.from(newItem);
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;
    const appQuery = new AppQuery({ email, password });
    console.log(appQuery.normQuery);
    const item = await this.repository.findOne(appQuery);
    console.log(new Date().toISOString());
    console.log(item);
    if (!item) throw AppError.NotFound(`Username or Password is not correct`);
  }

  /*
  async signOut() {
    //
  }
  */
}
