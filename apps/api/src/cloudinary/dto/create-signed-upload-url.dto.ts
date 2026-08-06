import {ApiProperty} from '@nestjs/swagger';
import {IsString,IsNotEmpty,IsOptional,ValidateNested,IsEnum} from 'class-validator';
import {Type} from 'class-transformer';
import { SignedUploadUrlOptionsDto } from '@/cloudinary/dto/signed-upload-url-options.dto';
import { ResourceType } from '@/cloudinary/dto/resource-type-enum.dto';






export class CreateSignedUploadUrlDto  {
    @ApiProperty({
        description: 'The public ID of the file to be uploaded',
        example: 'my-folder/my-file'
    })
    @IsNotEmpty()
    @IsString()
    publicId!: string;

    @ApiProperty({
        description: 'The resource type of the file to be uploaded',
        example: ResourceType.IMAGE,
        enum: ResourceType
    })
    @IsNotEmpty()
    @IsEnum(ResourceType)
    resourceType!: ResourceType;

    @ApiProperty({
        description: 'Optional parameters for the signed upload URL',
        required: false,
    })
    @IsOptional()
    @ValidateNested()
    @Type(() => SignedUploadUrlOptionsDto)
    options?: SignedUploadUrlOptionsDto;
}
