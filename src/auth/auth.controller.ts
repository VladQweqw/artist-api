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
    
    const access_token = await this.authService.login(user)
    const jwtToken = access_token.access_token; // Ensure this is a valid JWT
    
    res.cookie('token', jwtToken, {
      httpOnly: true, // Prevent JavaScript access to the cookie
      secure: false, // Set to true if you're using HTTPS
      sameSite: 'none', // Required for cross-origin cookies
      maxAge: 3600000, // 1 hour in milliseconds
    });
  
    // Send response separately
    return res.status(200).json(access_token); // Send the access token information
    

  }
}
