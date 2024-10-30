import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { ArtPiece } from 'src/schemas/artPieces.schema';

import { CreateArtPieceDto } from './dto/createPiece.dto';

@Injectable()
export class ArtPieces {
  constructor(@InjectModel(ArtPiece.name) private ArtPieceModel: Model<ArtPiece>) {}

  createPiece(createPieceDto: CreateArtPieceDto) {
      try {
        const newPiece = new this.ArtPieceModel(createPieceDto)

        newPiece.save()

        return {
          detail: "User created succesfully",
          piece: newPiece
        }
      }
      catch(err) {
        if(err.code === 11000) {
          return "Title already exists"
        }
        
        return `Error`
      }
  }

  getAll() {
    try {
      const artPieces = this.ArtPieceModel.find().populate('user_id')
      return artPieces
    }
    catch(err) {
      return `Error: ${err}`
    }
  }

  async getByPieceId(id: string) {
    try {
      const piece = await this.ArtPieceModel.findById(id)

      return piece
    }
    catch(err) {
      return "Invalid piece id"
    }
  }

  async getByUserId(user_id: string) {
    try {
      const pieces = await this.ArtPieceModel.find({
        user_id: user_id
      })
            
      return pieces
    }
    catch(err) {
      return "Unexpected error"
    }
  }

  async deletePiece(id: string) {
    
    try {
      await this.ArtPieceModel.deleteOne({
        _id: id
      })

      return "Art piece deleted succesfully"
    }
    catch(err){
      return new HttpException("Could not delete Art piece", 500)
    }
  }

  async updatePiece(id: string, CreateArtPieceDto: CreateArtPieceDto) {
    try {
      await this.ArtPieceModel.updateOne({
        _id: id
      }, CreateArtPieceDto)

      return {
        detail: `Piece with ID:${id} updated`,
        piece: CreateArtPieceDto
      }
    }
    catch(err) {
      return new HttpException("Could not update", 500)
    }
  }
}
