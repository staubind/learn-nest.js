import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {

    constructor(private authService: AuthService){}

    @Post('/signup')
    signUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post('/signin')
    signIn(@Body() AuthCredentialsDto: AuthCredentialsDto): Promise<{ accessToken: string}> {
        return this.authService.signIn(AuthCredentialsDto);
    }

    // // use a guard to protect either a handler or controller, here, obviously, we'll be acting on a handler.
    // @Post('/test')
    // @UseGuards(AuthGuard())
    // test(@Req() req) {
    //     console.log(req);
    // }
}
