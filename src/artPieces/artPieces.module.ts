import { Module } from '@nestjs/common';
import { ArtPieces } from './artPieces.service';
import { ArtPiecesController } from './artPieces.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ArtPiece, ArtPieceSchema } from 'src/schemas/artPieces.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: ArtPiece.name,
      schema: ArtPieceSchema
    }])
  ],
  providers: [ArtPieces],
  controllers: [ArtPiecesController],
})
export class ArtPiecesModule {}
