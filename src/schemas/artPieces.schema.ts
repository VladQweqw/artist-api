import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";

export type pieceDocument = HydratedDocument<ArtPiece>;

@Schema({
    timestamps: true,
})
export class ArtPiece {
    @Prop({ unique: true, required: true})
    title: string;

    @Prop({ type: Types.ObjectId, ref: "User", required: true })
    user_id: Types.ObjectId;

    @Prop({ required: true})
    image_url: string;

    @Prop()
    width: number

    @Prop()
    height: number
}

export const ArtPieceSchema = SchemaFactory.createForClass(ArtPiece);