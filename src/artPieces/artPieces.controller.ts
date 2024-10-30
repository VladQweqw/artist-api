// src/cats/cats.controller.ts
import { Controller, Get, Post, Delete, Body, Param, HttpException, Put } from '@nestjs/common';
import { ArtPieces } from './artPieces.service';
import { CreateArtPieceDto } from './dto/createPiece.dto';
import mongoose from 'mongoose';

@Controller('pieces')
export class ArtPiecesController {
  constructor(private artsPieces: ArtPieces) {}

  @Post()
  create(@Body() CreateArtPieceDto: CreateArtPieceDto) {
    return this.artsPieces.createPiece(CreateArtPieceDto);
  }

  @Get()
  findAll() {
    return this.artsPieces.getAll();
  }

  @Get(':id')
  async getByPieceId(@Param('id') id: string) {
    return await this.artsPieces.getByPieceId(id); 
  }

  @Get("user/:id")
  async getByUserId(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if(!isValid) return new HttpException( "Invalid user ID", 404)
      
    return await this.artsPieces.getByUserId(id)
  }

  @Delete(':id')
  async deletePiece(@Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if(!isValid) return new HttpException( "Invalid piece ID", 404)
      
    return this.artsPieces.deletePiece(id)
  }

  @Put(':id')
  async updatePiece(@Body() CreateArtPieceDto: CreateArtPieceDto, @Param('id') id: string) {
    const isValid = mongoose.Types.ObjectId.isValid(id)
    if(!isValid) return new HttpException( "Invalid piece ID", 404)

    return this.artsPieces.updatePiece(id, CreateArtPieceDto)
  }

}
