import { Module } from '@nestjs/common';
import { BoardController } from '@/board/board.controller';
import { BoardService } from '@/board/board.service';
import {PrismaModule} from '@/prisma/prisma.module';
import {BoardRepository} from '@/board/board.repository';

@Module({
  controllers: [BoardController],
  providers: [BoardService, BoardRepository],
  imports: [PrismaModule]
})
export class BoardModule {}
