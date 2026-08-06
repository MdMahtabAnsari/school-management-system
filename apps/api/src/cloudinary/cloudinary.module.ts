import { Module } from '@nestjs/common';
import { CloudinaryService } from '@/cloudinary/cloudinary.service';
import { CloudinaryModule as NestCloudinaryModule } from 'nestjs-cloudinary';
import { CloudinaryController } from './cloudinary.controller';

@Module({
    imports: [
        NestCloudinaryModule.forRootAsync({
            useFactory: () => ({
                cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
                api_key: process.env.CLOUDINARY_API_KEY,
                api_secret: process.env.CLOUDINARY_API_SECRET,
            }),
        }),
    ],
  providers: [ CloudinaryService],
  controllers: [CloudinaryController]
})
export class CloudinaryModule {}
