import {PartialType} from '@nestjs/swagger';
import {CreateStudentMedicalInfoDto} from '@/student-medical-info/dto/create-student-medical-info.dto';


export class UpdateStudentMedicalInfoDto extends PartialType(CreateStudentMedicalInfoDto) {}