import { Controller,Get,Post,Param,Body,BadRequestException } from '@nestjs/common';
import { StudentPromotionService } from '@/student-promotion/student-promotion.service';
import { CreateStudentPromotionDto } from '@/student-promotion/dto/create-student-promotion.dto';
import {IdDto} from '@/student-promotion/dto/id.dto';
import { RequireActiveOrg, Session, type UserSession, MemberHasPermission } from '@thallesp/nestjs-better-auth';


@Controller('student-promotions')
export class StudentPromotionController {
    constructor(private readonly studentPromotionService: StudentPromotionService) {}

    @Post()
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['promote']}})
    async promoteStudent(
        @Session() session: UserSession,
        @Body() createStudentPromotionDto: CreateStudentPromotionDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to promote a student.');
        }
        return this.studentPromotionService.promoteStudent(session.session.activeOrganizationId, createStudentPromotionDto);
    }

    @Get(':id')
    @RequireActiveOrg()
    @MemberHasPermission({permissions:{student:['read']}})
    async getStudentPromotionById(
        @Session() session: UserSession,
        @Param() id: IdDto
    ) {
        if (!session.session.activeOrganizationId) {
            throw new BadRequestException('Active organization is required to get a student promotion.');
        }
        return this.studentPromotionService.getStudentPromotionById(id.id, session.session.activeOrganizationId);
    }
}
