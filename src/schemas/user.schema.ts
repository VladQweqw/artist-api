import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
import { HydratedDocument } from "mongoose"

export type userDocument = HydratedDocument<User>

@Schema({
    timestamps: true,
})
export class User {
    @Prop({required: true})
    name: string;

    @Prop({required: true, unique: true})
    email: string;

    @Prop({required: true})
    image_of_artist: string;

    @Prop()
    age: number;
}

export const UserSchema = SchemaFactory.createForClass(User)