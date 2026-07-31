import {CreateStudentEnrollmentDto} from "@/student-enrollment/dto/create-student-enrollment.dto";
import {PartialType} from "@nestjs/swagger";

export class UpdateStudentEnrollmentDto extends PartialType(CreateStudentEnrollmentDto) {}