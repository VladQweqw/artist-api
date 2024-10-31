import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/createUser.dto";
import { jwtDecode } from "jwt-decode";
import * as bcrypt from 'bcrypt'
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

    async createUser(createUserDto: CreateUserDto) {
        try {
            const salt = await bcrypt.genSalt(); 
            
            const hashedPwd = await bcrypt.hash(createUserDto.password, salt)

            const newUser = new this.UserModel({
                ...createUserDto,
                password: hashedPwd
            })
            newUser.save()

            return {
                detail: "User Created!",
                user: newUser
            }
        }
        catch(err) {
            if(err.code === 11000) {
                return "Username already exists"
            }

            return `Error: ${err}`
        }
    }

    async validateUser(email: string, password: string): Promise<User | null> {
        const user = await this.UserModel.findOne({ email })
        
        if (user && await bcrypt.compare(password, user.password)) {
          return user;
        }
        return null;
      }

    getAllUsers() {
        try {
            return this.UserModel.find()
        }
        catch(err) {
            return new HttpException("An error occured", 500)
        }
    }

    async getUser(id: string) {
        try {
            const user = await this.UserModel.findById(id)

            return user
        }
        catch(err) {
            return "Invalid user ID"
        }
    }

    async getUserByJwt( token: string) {
        try {
            const decoded: any = jwtDecode(token)
            console.log(decoded);
            
            const user = await this.UserModel.findById(decoded._id).select("name email image_of_artist age createdAt updatedAt")

            return user
        }
        catch(err) {
            return "Invalid user IDawd"
        }
    }

    async deleteUser(id: string) {
        try {
            await this.UserModel.deleteOne({_id: id})

            return {
                detail: "User deleted",
                status: 200
            }
        }
        catch(err) {
            return new HttpException("Cannot delete user", 404)
        }
    }

    async updateUser(id: string, file, createUserDto: CreateUserDto) {
        
        try {
            const user = await this.UserModel.findById(id)
            
            user.name = createUserDto.name;
            if(file) {
                let oldImgPath = path.join(__dirname, '..', '..', user.image_of_artist)
                console.log("OLD IMAGE", oldImgPath);
                
                if(fs.existsSync(oldImgPath)) {
                    fs.unlinkSync(oldImgPath)
                }

                user.image_of_artist = `/public/artists-photos/${file.filename}`
            }
            
            
            
            await this.UserModel.updateOne({
              _id: id
            }, user)
            
            return {
              detail: `User with ID:${id} updated`,
              user: CreateUserDto
            }
          }
          catch(err) {
            return new HttpException("Could not update the User", 500)
          }
    }
}