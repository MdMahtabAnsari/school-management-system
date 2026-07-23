import { Controller, Post, Get, Delete, Put, BadRequestException, Param, Body } from '@nestjs/common';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';
import { CampusService } from '@/campus/campus.service';
import { CreateCampusDto } from '@/campus/dto/create-campus.dto';
import { UpdateCampusDto } from '@/campus/dto/update-campus.dto';
import { IdDto } from '@/campus/dto/id.dto';

@Controller('campuses')
export class CampusController {
    constructor(private readonly campusService: CampusService) { }

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({ permissions: { academicStructure: ['create'] } })
    async createCampus(
        @Session() session: UserSession,
        @Body() createCampusDto: CreateCampusDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create a campus.');
        }
        return this.campusService.createCampus(session.session.activeOrganizationId, createCampusDto);
    }

    @Put(':id')
    @RequireActiveOrg()
    @MemberHasPermission({ permissions: { academicStructure: ['update'] } })
    async updateCampus(
        @Session() session: UserSession,
        @Body() updateCampusDto: UpdateCampusDto,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to update a campus.');
        }
        return this.campusService.updateCampus(id.id, session.session.activeOrganizationId, updateCampusDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({ permissions: { academicStructure: ['read'] } })
    async getCampusById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a campus.');
        }
        return this.campusService.getCampusById(id.id, session.session.activeOrganizationId);
    }

    @Delete(':id')
    @RequireActiveOrg()
    @MemberHasPermission({ permissions: { academicStructure: ['delete'] } })
    async deleteCampus(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to delete a campus.');
        }
        return this.campusService.deleteCampus(id.id, session.session.activeOrganizationId);
    }

}
