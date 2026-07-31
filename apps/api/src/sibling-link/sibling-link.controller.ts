import { Controller,Get,Post,Param,Body,BadRequestException } from '@nestjs/common';
import { SiblingLinkService } from '@/sibling-link/sibling-link.service';
import { CreateSiblingLinkDto } from '@/sibling-link/dto/create-sibling-link.dto';
import { IdDto } from '@/sibling-link/dto/id.dto';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';

@Controller('sibling-links')
export class SiblingLinkController {
    constructor(private readonly siblingLinkService: SiblingLinkService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['create']}})
    async createSiblingLink(
        @Session() session: UserSession,
        @Body() createSiblingLinkDto: CreateSiblingLinkDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a sibling link.');
        }
        return this.siblingLinkService.createSiblingLink(session.session.activeOrganizationId, session.session.userId, createSiblingLinkDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['read']}})
    async getSiblingLinkById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a sibling link.');
        }
        return this.siblingLinkService.getSiblingLinkById(id.id, session.session.activeOrganizationId);
    }
}
