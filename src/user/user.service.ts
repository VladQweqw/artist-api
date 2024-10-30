import { HttpException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/schemas/user.schema";
import { CreateUserDto } from "./dto/createUser.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private UserModel: Model<User>) {}

    createUser(createUserDto: CreateUserDto) {
        try {
            const newUser = new this.UserModel(createUserDto)
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

    async updateUser(id: string, CreateUserDto: CreateUserDto) {
        try {
            await this.UserModel.updateOne({
              _id: id
            }, CreateUserDto)
      
            return {
              detail: `User with ID:${id} updated`,
              piece: CreateUserDto
            }
          }
          catch(err) {
            return new HttpException("Could not update the User", 500)
          }
    }
}