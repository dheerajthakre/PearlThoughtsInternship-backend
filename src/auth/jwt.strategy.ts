import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private config: ConfigService) {
    const secret = config.get<string>('JWT_SECRET');
  console.log('🚀 JWT_SECRET:', secret);
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret
    });
  }

  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role,
    };
  }
}
