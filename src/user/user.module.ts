import { MongooseModule } from "@nestjs/mongoose";
import { Module } from "@nestjs/common";
import { User, UserSchema } from "src/schemas/user.schema";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";



@Module({
    imports: [
        MongooseModule.forFeature([{
            name: User.name,
            schema: UserSchema
        }])
    ],
    providers: [UserService],
    controllers: [UserController],
    exports: [UserService]
})

export class UserModule {}