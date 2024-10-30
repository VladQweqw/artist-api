import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArtPieceDto {
    
    @IsNotEmpty()
    @IsString()
    title: string;
    
    @IsNotEmpty()
    @IsString()
    user_id: string;

    image_url?: string;
}