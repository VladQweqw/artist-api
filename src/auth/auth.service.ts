import { Inject, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise <any> {
        const user = await this.userService.validateUser(email, password)

        if(user) {
            const {password, ...result} = user.toObject()
            return result
        }

        return null
    }

    async login(user: any) {
        const payload = {username: user.name, _id: user._id};

        return {
            access_token: this.jwtService.sign(payload)
        }
    }
 }