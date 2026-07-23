import { Injectable } from '@nestjs/common';
import { TransactionalAdapterPrisma } from '@nestjs-cls/transactional-adapter-prisma';
import { TransactionHost } from '@nestjs-cls/transactional';
import {PrismaService} from '@/prisma/prisma.service';
import {CreateBoardDto} from '@/board/dto/createBoard.dto';
import {UpdateBoardDto} from '@/board/dto/updateBoard.dto';

@Injectable()
export class BoardRepository {
    constructor(
    private readonly prisma: TransactionHost<
      TransactionalAdapterPrisma<PrismaService>
    >,
  ) {}

  async createBoard(orgId: string, createBoardDto: CreateBoardDto) {
    const {  name, type } = createBoardDto;
    return this.prisma.tx.board.create({
      data: {
        organizationId: orgId,
        name,
        type,
      },
    });
  }

  async updateBoard(boardId: string, updateBoardDto: UpdateBoardDto) {
    const { name, type } = updateBoardDto;
    return this.prisma.tx.board.update({
      where: { id: boardId },
      data: {
        name,
        type,
      },
    });
  }

  async getBoardById(boardId: string) {
    return this.prisma.tx.board.findUnique({
      where: { id: boardId },
    });
  }

  async deleteBoard(boardId: string) {
    return this.prisma.tx.board.delete({
      where: { id: boardId },
    });
  }
}