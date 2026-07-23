import { Controller,Post,Body, BadRequestException, Put, Param, Get, Delete } from '@nestjs/common';
import {
  RequireActiveOrg,
  Session,
  type UserSession,
  MemberHasPermission
} from "@thallesp/nestjs-better-auth";
import { CreateBoardDto } from '@/board/dto/createBoard.dto';
import { BoardService } from '@/board/board.service';
import { UpdateBoardDto } from '@/board/dto/updateBoard.dto';
import {IdDto} from '@/board/dto/id.dto';


@Controller('boards')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  @RequireActiveOrg()
  @MemberHasPermission({permissions:{academicStructure:['create']}})
  async createBoard(
    @Body() createBoardDto: CreateBoardDto,
    @Session() session: UserSession,
  ) {
    if (!session.session.activeOrganizationId) {
      throw new BadRequestException('Active organization is required to create a board.');
    }
    return this.boardService.createBoard(session.session.activeOrganizationId, createBoardDto);
  }
  @Put(':id')
  @RequireActiveOrg()
  @MemberHasPermission({permissions:{academicStructure:['update']}})
  async updateBoard(
    @Param() id:IdDto,
    @Body() updateBoardDto: UpdateBoardDto,
    @Session() session: UserSession,
  ) {
    if (!session.session.activeOrganizationId) {
      throw new BadRequestException('Active organization is required to update a board.');
    }
    return this.boardService.updateBoard(id.id, session.session.activeOrganizationId, updateBoardDto);
  }
  @Get(':id')
  @RequireActiveOrg()
  @MemberHasPermission({permissions:{academicStructure:['read']}})
  async getBoardById(
    @Param() id:IdDto,
    @Session() session: UserSession,
  ) {
    if (!session.session.activeOrganizationId) {
      throw new BadRequestException('Active organization is required to get a board.');
    }
    return this.boardService.getBoardById(id.id, session.session.activeOrganizationId);
  }
  @Delete(':id')
  @RequireActiveOrg()
  @MemberHasPermission({permissions:{academicStructure:['delete']}})
  async deleteBoard(
    @Param() id:IdDto,
    @Session() session: UserSession,
  ) {
    if (!session.session.activeOrganizationId) {
      throw new BadRequestException('Active organization is required to delete a board.');
    }
    return this.boardService.deleteBoard(id.id, session.session.activeOrganizationId);
  }
}
