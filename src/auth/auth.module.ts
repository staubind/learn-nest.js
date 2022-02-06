import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersRepository } from './users.repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';


@Module({
  providers: [AuthService],
  controllers: [AuthController],
  imports: [
    TypeOrmModule.forFeature([UsersRepository]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({ // exports a jwt service - we'll use in in the auth service.
      secret: 'topsecret51', // don't store them like this, probably you'd want to use a private key
      signOptions: {
        expiresIn: 3600, // expires in an hour
      },
    }),
  ]
})
export class AuthModule {}
