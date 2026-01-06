import { signToken } from "@/common/auth/jwt/jwt.utils";
import { authService } from "./../../../common/container";
import {
  AppError,
  config,
  UserDto,
  comparePassword,
  hashPassword,
} from "@/common/container";
import type { CreateUserDto } from "./dto/create.dto";
import { UserRepository } from "./repository";
import type { UserService } from "./service";
import type { SignInDto } from "./dto/sign-in.dto";

export class AccountService {
  constructor(
    private readonly repository: UserRepository,
    private readonly userService: UserService
  ) {}

  async signUp(signUpDto: CreateUserDto) {
    // force user role as USER
    signUpDto = {
      ...signUpDto,
      password: await hashPassword(signUpDto.password),
      role: config.default.user_role,
    };
    const newItem = await this.userService.createItem(signUpDto);

    // send an email
    // ...

    return UserDto.from(newItem);
  }

  async signIn(signInDto: SignInDto) {
    const { email, password } = signInDto;

    const user = await this.repository.findOne({ filter: { email } });
    if (!user) throw AppError.Unauthorized(`Invalid credentials`);

    const isValid = await comparePassword(password, user.password);
    if (!isValid) throw AppError.Unauthorized(`Invalid credentials`);

    // create token
    const token = {
      userId: user.id,
      role: user.role,
    };

    const signedToken = authService.signToken(token);

    return signedToken;
  }

  async signOut() {}
}
