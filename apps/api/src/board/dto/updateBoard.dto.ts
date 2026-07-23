import {CreateBoardDto} from '@/board/dto/createBoard.dto';
import { PartialType } from '@nestjs/swagger';

export class UpdateBoardDto extends PartialType(CreateBoardDto) {}