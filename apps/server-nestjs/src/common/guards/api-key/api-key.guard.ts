import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(
    private readonly config: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest<Request>();

    const tmp1 = req.url;
    // console.log(tmp1);

    const tmp2 = `` + this.config.get('api_key');
    // console.log(tmp2);

    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    // console.log(roles);

    return true;
  }
}
