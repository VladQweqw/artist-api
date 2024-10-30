import { Injectable } from "@nestjs/common";
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

    async getUser(id: string) {
        try {
            const user = await this.UserModel.findById(id)

            return user
        }
        catch(err) {
            return "Invalid user ID"
        }
    }
}