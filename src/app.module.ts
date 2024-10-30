import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'

import { UserModule } from './user/user.module';
import { ArtPiecesModule } from './artPieces/artPieces.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://vladpoienariu:admin123@artist.5vhezvm.mongodb.net/artist?retryWrites=true&w=majority'),
    ArtPiecesModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
