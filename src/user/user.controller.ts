import { Controller, Get, Post, Body, Param } from "@nestjs/common";
import { User } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(private user: UserService) {}

    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {
        return this.user.createUser(createUserDto)
    }


    @Get(":id")
    async getUser(@Param('id') id: string) {
        return await this.user.getUser(id)
    }

}