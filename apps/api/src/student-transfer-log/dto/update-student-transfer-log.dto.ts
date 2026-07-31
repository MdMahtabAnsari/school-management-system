import {CreateStudentTransferLogDto} from "@/student-transfer-log/dto/create-student-transfer-log.dto";
import {PartialType} from "@nestjs/swagger";

export class UpdateStudentTransferLogDto extends PartialType(CreateStudentTransferLogDto) {}