import { Controller,Get,Post,Put,BadRequestException,Param,Body } from '@nestjs/common';
import { TermService } from '@/term/term.service';
import { CreateTermDto } from '@/term/dto/create-term.dto';
import { UpdateTermDto } from '@/term/dto/update-term.dto';
import { IdDto } from '@/term/dto/id.dto';
import {
  RequireActiveOrg,
  Session,
  type UserSession,
  MemberHasPermission
} from "@thallesp/nestjs-better-auth";

@Controller('terms')
export class TermController {
    constructor(private readonly termService: TermService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{academicStructure:['create']}})
    async createTerm(
        @Session() session: UserSession,
        @Body() createTermDto: CreateTermDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a term.');
        }
        return this.termService.createTerm(session.session.activeOrganizationId, createTermDto);
    }

    @Put(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{academicStructure:['update']}})
    async updateTerm(
        @Session() session: UserSession,
        @Body() updateTermDto: UpdateTermDto,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to update a term.');
        }
        return this.termService.updateTerm(id.id, session.session.activeOrganizationId, updateTermDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{academicStructure:['read']}})
    async getTermById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a term.');
        }
        return this.termService.getTermById(id.id, session.session.activeOrganizationId);
    }
}
