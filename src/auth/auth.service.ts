import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm'
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository,
        private jwtService: JwtService, // don't need the injectable because ???
    ){}

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.usersRepository.createUser(authCredentialsDto);
    }

    async signIn(authCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string}> {
        const { username, password } = authCredentialsDto;
        const user = await this.usersRepository.findOne({ username });
        if (user && (await bcrypt.compare(password, user.password))) {
            // return an access token to the client
            const payload: JwtPayload = { username }; // remove the password - not type-safe, so we'll set up an interface...
            const accessToken = await this.jwtService.sign(payload);
            return { accessToken }; // accessToken is a string.
        } else {
            throw new UnauthorizedException('Please check your login credentials.');
        }
    }
}
