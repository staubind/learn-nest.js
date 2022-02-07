// strategy is just injectible class
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from './jwt-payload.interface';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
    ) {
        super({
            secretOrKey: 'topsecret51',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),// extract it from a header 'bearer-token'
        })
    }

    async validate(payload: JwtPayload): Promise<User> {// overrides default validate method - provide logic what to do after we know the token is valid
        const {username } = payload;
        const user: User = await this.usersRepository.findOne({ username })
        
        if (!user) {
            throw new UnauthorizedException();
        }

        return user;
    } 
}