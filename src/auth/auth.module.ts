import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResolver } from './auth.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ErrorRequestProvider } from 'src/providers/error-request.provider';
import { LoginException } from 'src/providers/login-exception.provider'

@Module({
  providers: [
    AuthResolver, 
    AuthService,
    JwtStrategy,
    ErrorRequestProvider,
    { 
      provide: 'ServiceName', 
      useValue: 'ErrorRequestProvider' 
    },
    LoginException
  ],
  imports:[
    TypeOrmModule.forFeature([User]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    ConfigModule,
    JwtModule.registerAsync({
      imports: [
        ConfigModule
      ],
      inject: [
        ConfigService
      ],
      useFactory: ( configService:ConfigService ) => {
        return {
          secret: process.env.JWT_SECRET,
          //secret:configService.get('JWT_SECRET'),
          signOptions:{
            expiresIn:'30d'
          }        
        }
      }

    })
  ],
  exports:[
    TypeOrmModule,
    JwtStrategy,
    PassportModule,
    JwtModule,
    AuthService,
  ]
})
export class AuthModule {}
