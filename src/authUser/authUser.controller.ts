import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthUserService } from './authUser.service';
import { CreateUserDto } from './interfaces/authUser.interface';

@Controller("/users")
export class AuthUserController {
  constructor(private readonly authUserService: AuthUserService) {}

  @Post("/create")
  async createUser(@Body() createUserDto: CreateUserDto) {
    const newUser = await this.authUserService.createUser(createUserDto);
    return newUser.id;
  }

  @Post("/get_token")
  async getToken(@Body() userDto: CreateUserDto) {
    return await this.authUserService.getUserToken(userDto);
  }
}
