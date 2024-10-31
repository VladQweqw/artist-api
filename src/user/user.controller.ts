import { Controller, Get, Post, Body, Param, Request, Delete, Put, UseInterceptors, UploadedFile } from "@nestjs/common";
import { CreateUserDto } from "./dto/createUser.dto";
import { UserService } from "./user.service";
import { diskStorage } from 'multer';
import { FileInterceptor } from "@nestjs/platform-express";

@Controller('user')
export class UserController {
    constructor(private user: UserService) {}

    @Post()
    @UseInterceptors(FileInterceptor("image_of_artist", {
        storage: diskStorage({
            destination: "./public/artists-photos",
            filename: (req, file, callback) => {
                const uniqueSuffix = Date.now() + "-" + Math.floor(Math.random() * 1000)
                const extension = file.mimetype.split('/')[1]
        
                callback(null, `${uniqueSuffix}.${extension}`)
              }
        })
    }))
    createUser(@UploadedFile() file: Express.Multer.File, @Body() createUserDto: CreateUserDto) {
        console.log(file);
        if(file) {
          createUserDto.image_of_artist = `/public/artists-photos/${file.filename}`
        }

        return this.user.createUser(createUserDto)
    }

    @Get()
    async getAllUsers() {
        return await this.user.getAllUsers()
    }

    @Get("jwt")
    getUserByJwt(@Request() req) {     
        console.log('awd');
            
        return this.user.getUserByJwt(req.cookies.token)
    }

    @Get(":id")
    getUser( @Param('id') id: string) {        
        return this.user.getUser(id)
    }

    @Delete(":id")
    deleteUser(@Param("id") id:string) {
        return this.user.deleteUser(id)
    }

    @Put(":id")
    updateUser(@Param("id") id:string, @Body() createUserDto: CreateUserDto) {
        return this.user.updateUser(id, createUserDto)
    }

}