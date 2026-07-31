import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty,IsUUID,IsInt,IsString,Min,Max} from 'class-validator';
import {Type} from 'class-transformer';



export class CreatePerformanceReviewDto {
   
    @ApiProperty({
        description:'Id of your staff profile',
        example:'d8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly staffId!: string

    @ApiProperty({
        description:'Review period for the performance review',
        example:'2025-26 Annual'
    })
    @IsNotEmpty()
    @IsString()
    readonly reviewPeriod!: string

    @ApiProperty({
        description:'Rating for the performance review (1-5)',
        example:4
    })
    @IsNotEmpty()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    @Max(5)
    readonly rating!: number

    @ApiProperty({
        description:'Remarks for the performance review',
        example:'Good performance overall'
    })
    @IsString()
    readonly remarks?: string
}