import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'

import { UserModule } from './user/user.module';
import { ArtPiecesModule } from './artPieces/artPieces.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb+srv://vladpoienariu:admin123@artist.5vhezvm.mongodb.net/artist?retryWrites=true&w=majority'),
    UserModule,
    AuthModule,
    ArtPiecesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})


export class AppModule {}
