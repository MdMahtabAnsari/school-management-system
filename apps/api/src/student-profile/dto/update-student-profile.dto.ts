import {CreateStudentProfileDto} from "@/student-profile/dto/create-student-profile.dto";
import {PartialType} from "@nestjs/swagger";

export class UpdateStudentProfileDto extends PartialType(CreateStudentProfileDto) {}