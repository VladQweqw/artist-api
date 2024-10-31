// src/cats/cats.controller.ts
import { Controller, Get, Post, Delete, Body, Param, HttpException, Put, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ArtPieces } from './artPieces.service';
import { CreateArtPieceDto } from './dto/createPiece.dto';
import mongoose from 'mongoose';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';

import sizeOf from 'image-size'

@Controller('pieces')
export class ArtPiecesController {
  constructor(private artsPieces: ArtPieces) {}

  @Post()
  @UseInterceptors(FileInterceptor('image_url', {
    storage: diskStorage({
      destination: './public/uploads',
      filename: (req, file, callback) => {
        const uniqueSuffix = Date.now() + "-" + Math.floor(Math.random() * 1000)
        const extension = file.mimetype.split('/')[1]

        callback(null, `${uniqueSuffix}.${extension}`)
      }
    })
  }))
  create(@UploadedFile() file: Express.Multer.File, @Body() CreateArtPieceDto: CreateArtPieceDto) {
    if(file) {
      CreateArtPieceDto.image_url = `/public/uploads/${file.filename}`
      
      const sizes = sizeOf(`./public/uploads/${file.filename}`)
      CreateArtPieceDto.width = sizes.width
      CreateArtPieceDto.height = sizes.height
          
    }
    
    return this.artsPieces.createPiece(CreateArtPieceDto);
  }

  @Get()
  findAll() {
    return this.artsPieces.getAll();
  }

  @Get(':id')
   getByPieceId(@Param('id') id: string) {
    return this.artsPieces.getByPieceId(id); 
  }

  @Get("user/:id")
   getByUserId(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if(!isValid) return new HttpException( "Invalid user ID", 404)
      
    return this.artsPieces.getByUserId(id)
  }

  @Delete(':id')
   deletePiece(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if(!isValid) return new HttpException( "Invalid piece ID", 404)
      
    return this.artsPieces.deletePiece(id)
  }

  @Put(':id')
  updatePiece(@Body() CreateArtPieceDto: CreateArtPieceDto, @Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if(!isValid) return new HttpException( "Invalid piece ID", 404)

    return this.artsPieces.updatePiece(id, CreateArtPieceDto)
  }

}
