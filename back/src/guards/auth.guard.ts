import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Observable } from 'rxjs';
import { Role } from 'src/enums/enums';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = request.headers.authorization?.split(' ')[1];
    if (!token) {
      throw new UnauthorizedException('Debe enviar el token');
    }

    try {
      const verifySignature = process.env.JWT_SECRET;
      const payload = this.jwtService.verify(token, {
        secret: verifySignature,
      });
      if (!payload) {
        throw new UnauthorizedException('Ocurrio un error al validar el token');
      }

      const roles: Role[] = payload.roles;
      payload.exp = new Date(payload.exp * 1000);
      payload.roles = roles;

      request.user = payload;
      console.log('que hay aqui?', request.user);

      return true;
    } catch (error) {
      throw new UnauthorizedException('Token inválido');
    }
  }
}
