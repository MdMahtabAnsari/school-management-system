import { CreateEmergencyContactDto } from "@/emergency-contact/dto/create-emergency-contact.dto";
import { ApiProperty, PartialType } from "@nestjs/swagger";
import { IsInt, IsOptional, Min } from "class-validator";
import { Type } from "class-transformer";

export class UpdateEmergencyContactDto extends PartialType(CreateEmergencyContactDto) {
    @ApiProperty({
        description: 'Priority of the emergency contact (1 being the highest)',
        example: 1,
        required: false
    })
    @IsOptional()
    @IsInt()
    @Type(() => Number)
    @Min(1)
    readonly priority?: number;
}