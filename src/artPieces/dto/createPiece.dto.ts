import { IsNotEmpty, IsString } from 'class-validator';

export class CreateArtPieceDto {
    
    @IsNotEmpty()
    @IsString()
    title: string;
    
    @IsNotEmpty()
    @IsString()
    user_id: string;

    @IsNotEmpty()
    @IsString()
    image_url: string;
}