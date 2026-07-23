import { Injectable } from '@nestjs/common';
import {BoardRepository} from '@/board/board.repository';
import {CreateBoardDto} from '@/board/dto/createBoard.dto';
import {UpdateBoardDto} from '@/board/dto/updateBoard.dto';
import { BadRequestException,NotFoundException,ForbiddenException } from '@nestjs/common';

@Injectable()
export class BoardService {
  constructor(private readonly boardRepository: BoardRepository) {}

  async createBoard(orgId: string, createBoardDto: CreateBoardDto) {
    return this.boardRepository.createBoard(orgId, createBoardDto);
  }
  async updateBoard(boardId: string, orgId: string, updateBoardDto: UpdateBoardDto) {
    const board = await this.boardRepository.getBoardById(boardId);
    if (!board) {
      throw new NotFoundException('Board not found.');
    }
    if (board.organizationId !== orgId) {
      throw new ForbiddenException('You do not have permission to update this board.');
    }
    return this.boardRepository.updateBoard(boardId, updateBoardDto);
  }
  async getBoardById(boardId: string, orgId: string) {
    const board = await this.boardRepository.getBoardById(boardId);
    if (!board) {
      throw new NotFoundException('Board not found.');
    }
    if (board.organizationId !== orgId) {
      throw new ForbiddenException('You do not have permission to view this board.');
    }
    return board;
  }
  async deleteBoard(boardId: string, orgId: string) {
    const board = await this.boardRepository.getBoardById(boardId);
    if (!board) {
      throw new NotFoundException('Board not found.');
    }
    if (board.organizationId !== orgId) {
      throw new ForbiddenException('You do not have permission to delete this board.');
    }
    return this.boardRepository.deleteBoard(boardId);
  }
}