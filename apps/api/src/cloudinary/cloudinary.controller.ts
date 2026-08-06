import { Controller,Post,Body } from '@nestjs/common';
import { CloudinaryService } from '@/cloudinary/cloudinary.service';
import { CreateSignedUploadUrlDto } from '@/cloudinary/dto/create-signed-upload-url.dto';

@Controller('cloudinary')
export class CloudinaryController {
    constructor(private readonly cloudinaryService: CloudinaryService) {}

    @Post('signed-upload-url')
    async createSignedUploadUrl(@Body() dto: CreateSignedUploadUrlDto) {
        return this.cloudinaryService.createSignedUploadUrl(dto);
    }
}
