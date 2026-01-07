import {
  AppError,
  config,
  UserDto,
  comparePassword,
  hashPassword,
  authService,
} from "@/common/container";
import type { CreateUserDto } from "./dto/create.dto";
import type { UserService } from "./service";
import { UserRepository } from "./repository";
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

    // create payload
    const payload = {
      id: user.id,
      name: user.name,
      role: user.role,
    };

    const accessToken = authService.issueToken(payload);
    return accessToken;
  }

  async signOut() {}
}
