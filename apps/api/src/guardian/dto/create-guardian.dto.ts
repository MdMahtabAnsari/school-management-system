import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsString, IsEmail, IsPhoneNumber, IsOptional, IsInt, Min } from "class-validator";
import { MessageChannel } from "@workspace/db/generated/prisma/cjs/enums";
import { Type } from "class-transformer";



export class CreateGuardianDto {
    @ApiProperty({
        description: 'Id of the user',
        example: 'd8c36158-1182-42a4-817d-74cfc5d7bc28'
    })
    @IsNotEmpty()
    @IsString()
    readonly userId!: string;

    @ApiProperty({
        description: 'First name of the guardian',
        example: 'John'
    })
    @IsNotEmpty()
    @IsString()
    readonly firstName!: string;

    @ApiProperty({
        description: 'Last name of the guardian',
        example: 'Doe'
    })
    @IsNotEmpty()
    @IsString()
    readonly lastName!: string;

    @ApiProperty({
        description: 'Phone number of the guardian',
        example: '+1234567890'
    })
    @IsNotEmpty()
    @IsPhoneNumber()
    readonly phone!: string;

    @ApiProperty({
        description: 'Alternate phone number of the guardian',
        example: '+0987654321'
    })
    @IsOptional()
    @IsPhoneNumber()
    readonly altPhone?: string;

    @ApiProperty({
        description: 'Email of the guardian',
        example: 'john.doe@example.com'
    })
    @IsOptional()
    @IsEmail()
    readonly email?: string;

    @ApiProperty({
        description: 'Occupation of the guardian',
        example: 'Software Engineer'
    })
    @IsOptional()
    @IsString()
    readonly occupation?: string;

    @ApiProperty({
        description: 'Annual income of the guardian',
        example: '50000.00'
    })
    @IsOptional()
    @Type(() => Number)
    @IsInt()
    @Min(1)
    readonly annualIncome?: string;

    @ApiProperty({
        description: 'Address of the guardian',
        example: '123 Main St, City, State, 12345'
    })
    @IsOptional()
    @IsString()
    readonly address?: string;

    @ApiProperty({
        description: 'City of the guardian',
        example: 'City'
    })
    @IsOptional()
    @IsString()
    readonly city?: string;

    @ApiProperty({
        description: 'State of the guardian',
        example: 'State'
    })
    @IsOptional()
    @IsString()
    readonly state?: string;

    @ApiProperty({
        description: 'Pincode of the guardian',
        example: '12345'
    })
    @IsOptional()
    @IsString()
    readonly pincode?: string;

    @ApiProperty({
        description: 'Photo URL of the guardian',
        example: 'https://example.com/photo.jpg'
    })
    @IsOptional()
    @IsString()
    readonly photoUrl?: string;

    @ApiProperty({
        description: 'Preferred message channel of the guardian',
        example: MessageChannel.SMS,
        enum: MessageChannel
    })
    @IsOptional()
    readonly preferredChannel?: MessageChannel;
}
