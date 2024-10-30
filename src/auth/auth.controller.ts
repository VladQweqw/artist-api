import { Controller, Post, Body, Res, UseInterceptors } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { CreateUserDto } from 'src/user/dto/createUser.dto';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('register')
  @UseInterceptors(AnyFilesInterceptor())
  async register(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  @UseInterceptors(AnyFilesInterceptor())
  async login(
    @Body() data: {email: string, password: string},
    @Res() res: Response
  ) {
    
    const user = await this.authService.validateUser(data.email, data.password);
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    const acces_token = await this.authService.login(user)
    
    const jwtToken = acces_token.access_token;
    return res.cookie('token', jwtToken, {
      httpOnly: true, 
      secure: false, 
      maxAge: 3600000, // 1h in ms
    })
    .status(200)
    .json(acces_token);
    

  }
}
