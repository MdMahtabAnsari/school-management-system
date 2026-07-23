import { Controller,Post,Get,Put,Delete,Body,Param,BadRequestException } from '@nestjs/common';
import { AcademicYearService } from '@/academic-year/academic-year.service';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';
import { UpdateAcademicYearDto } from './dto/update-academic-year.dto';
import { RequireActiveOrg, Session, type UserSession,  MemberHasPermission } from '@thallesp/nestjs-better-auth';
import {IdDto} from '@/academic-year/dto/id.dto';


@Controller('academic-years')
export class AcademicYearController {
    constructor(private readonly academicYearService: AcademicYearService) {}

    @Post()
    @RequireActiveOrg()
     @MemberHasPermission({permissions:{academicStructure:['create']}})
    async createAcademicYear(
        @Session() session: UserSession,
        @Body() createAcademicYearDto: CreateAcademicYearDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to create an academic year.');
        }
        return this.academicYearService.createAcademicYear(session.session.activeOrganizationId, createAcademicYearDto);
    }

    @Put(':id')
    @RequireActiveOrg()
     @MemberHasPermission({permissions:{academicStructure:['update']}})
    async updateAcademicYear(
        @Session() session: UserSession,
        @Body() updateAcademicYearDto: UpdateAcademicYearDto,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to update an academic year.');
        }
        return this.academicYearService.updateAcademicYear(id.id, session.session.activeOrganizationId, updateAcademicYearDto);
    }

    @Delete(':id')
    @RequireActiveOrg()
     @MemberHasPermission({permissions:{academicStructure:['delete']}})
    async deleteAcademicYear(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to delete an academic year.');
        }
        return this.academicYearService.deleteAcademicYear(id.id, session.session.activeOrganizationId);
    }

    @Get(':id')
    @RequireActiveOrg()
     @MemberHasPermission({permissions:{academicStructure:['read']}})
    async getAcademicYearById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to view an academic year.');
        }
        return this.academicYearService.getAcademicYearById(id.id, session.session.activeOrganizationId);
    }

}
