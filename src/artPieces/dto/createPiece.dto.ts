import { IsNotEmpty, IsString } from 'class-validator';
import { Types } from 'mongoose';

export class CreateArtPieceDto {
    
    @IsNotEmpty()
    @IsString()
    title: string;
    
    @IsNotEmpty()
    user_id:Types.ObjectId;

    image_url?: string;

    width?: number
    height?: number
}