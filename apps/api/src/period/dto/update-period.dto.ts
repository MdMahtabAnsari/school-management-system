import { PartialType,ApiProperty } from '@nestjs/swagger';
import { CreatePeriodDto } from '@/period/dto/create-period.dto';
import { IsInt,IsOptional,Min } from 'class-validator';
import { Type } from 'class-transformer';



export class UpdatePeriodDto extends PartialType(CreatePeriodDto) {
    @ApiProperty({
        description: 'Sequence number of the period',
        example: 1,
        required: false
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    readonly sequence?: number;
}