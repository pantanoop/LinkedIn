import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const response = context.switchToHttp().getResponse();

    const accessToken = request.cookies?.access_token;
    const refreshToken = request.cookies?.refresh_token;

    if (!accessToken && !refreshToken) {
      throw new UnauthorizedException('No tokens found');
    }

    if (accessToken) {
      try {
        const payload = await this.jwtService.verifyAsync(accessToken);

        request.user = payload;
        return true;
      } catch (err) {
        console.log(err, 'err');
        if (err.name !== 'TokenExpiredError') {
          throw new UnauthorizedException('Invalid access token');
        }
      }
    }

    if (!refreshToken) {
      throw new UnauthorizedException('Refresh token missing');
    }

    try {
      const payload = await this.jwtService.verifyAsync(refreshToken);

      const newAccessToken = await this.jwtService.signAsync({
        sub: payload.sub,
        email: payload.email,
        role: payload.role,
      });

      response.cookie('access_token', newAccessToken, {
        httpOnly: true,
        maxAge: 9000,
      });

      request.user = payload;

      return true;
    } catch {
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
