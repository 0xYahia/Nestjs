import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from './enum.auth';
import { ROLES_KEY } from './roles.decorator';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector, private jwtService: JwtService) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // console.log('Required Role ', requiredRoles);

    if (!requiredRoles) {
      return true;
    }
    // const { user } = context.switchToHttp().getRequest();
    // return requiredRoles.some((role) => user.roles?.includes(role));
    // console.log(context.switchToHttp().getRequest().header('x-auth-token'));
    let reciveJWT = context.switchToHttp().getRequest().header('x-auth-token');
    let data = this.jwtService.verify(reciveJWT, { secret: 'secret' });
    // console.log(data);
    if (data.isAdmin) return true;
    return false;

    // return false;
  }
}
