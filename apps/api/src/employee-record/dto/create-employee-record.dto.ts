import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty,IsUUID,IsString,IsOptional} from 'class-validator';



export class CreateEmployeeRecordDto {
    @ApiProperty({
        description:'Id of your staff profile',
        example:'d8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly staffId!: string

    @ApiProperty({
        description:'PAN number of the employee',
        example:'ABCDE1234F',
        required: false
    })
    @IsOptional()
    @IsString()
    readonly panMasked?: string

    @ApiProperty({
        description:'Aadhaar number of the employee',
        example:'1234 5678 9012',
        required: false
    })
    @IsOptional()
    @IsString()
    readonly aadhaarMasked?: string

    @ApiProperty({
        description:'PF number of the employee',
        example:'PF1234567890',
        required: false
    })
    @IsOptional()
    @IsString()
    readonly pfNumber?: string

    @ApiProperty({
        description:'ESI number of the employee',
        example:'ESI1234567890',
        required: false
    })
    @IsOptional()
    @IsString()
    readonly esiNumber?: string

    @ApiProperty({
        description:'Bank account number of the employee',
        example:'1234567890123456',
        required: false
    })
    @IsOptional()
    @IsString()
    readonly bankAccountMasked?: string

    @ApiProperty({
        description:'Bank IFSC code of the employee',
        example:'SBIN0001234',
        required: false
    })
    @IsOptional()
    @IsString()
    readonly bankIfsc?: string

    @ApiProperty({
        description:'Bank name of the employee',
        example:'State Bank of India',
        required: false
    })
    @IsOptional()
    @IsString()
    readonly bankName?: string

    @ApiProperty({
        description:'Salary structure ID of the employee',
        example:'d8c36158-1182-42a4-817d-74cfc5d7bc28',
        required: false
    })
    @IsOptional()
    @IsUUID()
    readonly salaryStructureId?: string
}