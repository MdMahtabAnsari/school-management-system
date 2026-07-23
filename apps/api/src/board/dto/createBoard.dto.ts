import {ApiProperty} from '@nestjs/swagger';
import {IsEnum, IsNotEmpty, IsString} from 'class-validator';
import {BoardType} from '@workspace/db/generated/prisma/cjs/enums';

export class CreateBoardDto {

    // The name of the board
    @ApiProperty({ description: 'The name of the board', example: 'My Board' })
    @IsNotEmpty()
    @IsString()
    readonly name!: string;

    // The type of the board
    @ApiProperty({ description: 'The type of the board', enum:BoardType })
    @IsNotEmpty()
    @IsEnum(BoardType)
    readonly type!: BoardType;
  
}
