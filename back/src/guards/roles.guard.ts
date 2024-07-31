import { CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';

import { Role } from 'src/enums/enums';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private readonly reflector: Reflector){}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    //deberia recibir el rol del usuario desde la metadata, osea desde el token
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>('roles',[//El decorador cuyo metadato se desea recuperar.
      context.getHandler(),//que contexto me invoca?
      context.getClass()//que clase me invoca?
    ])
    const request = context.switchToHttp().getRequest()
    
    // recibo el token, donde lo busco o como me lo envian?
    const token = request.headers.authorization?.split(' ')[1]

    if (!token) {
      throw new UnauthorizedException('Error al recibir el token')
    }
// viene desdes el payloat
    const user = request.user;
// que rol tiene, cumple con la condicion del decorador que solicita el metodo del controllador? 
    const hasRole = ()=>
      requiredRoles.some((role)=>user?.roles?.includes(role))
    const valid = user && user.roles && hasRole()
    if (!valid) {
      throw new ForbiddenException('No tienes permiso para acceder')
    }
    return valid
  }
}
