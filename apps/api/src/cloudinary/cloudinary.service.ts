import { Injectable } from '@nestjs/common';
import {CloudinaryService as NestCloudinaryService} from 'nestjs-cloudinary';
import { CreateSignedUploadUrlDto } from '@/cloudinary/dto/create-signed-upload-url.dto';


@Injectable()
export class CloudinaryService {
    constructor(private readonly cloudinaryService: NestCloudinaryService) {}

    async createSignedUploadUrl(dto: CreateSignedUploadUrlDto) {
        return this.cloudinaryService.createSignedUploadUrl(dto.publicId, dto.resourceType, dto.options);
    }
}
