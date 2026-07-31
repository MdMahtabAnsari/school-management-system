import {ApiProperty} from '@nestjs/swagger';
import {IsNotEmpty,IsUUID,IsEnum,IsBoolean} from 'class-validator';
import {RelationType} from '@workspace/db/generated/prisma/cjs/enums';



export class CreateStudentGuardianDto {
    @ApiProperty({
        description:'Id of your student',
        example:'d8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly studentId!: string

    @ApiProperty({
        description:'Id of your guardian',
        example:'d8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsUUID()
    readonly guardianId!: string

    @ApiProperty({
        description:'Relation of the guardian to the student',
        example:RelationType.FATHER
    })
    @IsNotEmpty()
    @IsEnum(RelationType)
    readonly relation!: RelationType

    @ApiProperty({
        description:'Is this guardian the primary contact for the student?',
        example:true
    })
    @IsNotEmpty()
    @IsBoolean()
    readonly isPrimaryContact!: boolean

    @ApiProperty({
        description:'Does this guardian have portal access?',
        example:true
    })
    @IsNotEmpty()
    @IsBoolean()
    readonly hasPortalAccess!: boolean

    @ApiProperty({
        description:'Does this guardian have legal custody of the student?',
        example:true
    })
    @IsNotEmpty()
    @IsBoolean()
    readonly hasLegalCustody!: boolean
}