import { Module } from '@nestjs/common';
import { nestAuth } from '@/auth/configs/nest-auth';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { PrismaModule } from '@/prisma/prisma.module';
import { NotificationModule } from '@/notification/notification.module';
import {EmailQueueService} from '@/notification/email-queue.service';

@Module({
  imports: [
    BetterAuthModule.forRootAsync({
      imports: [PrismaModule, NotificationModule],
      inject: [PrismaService, EmailQueueService],
      useFactory: (prisma: PrismaService, emailQueueService: EmailQueueService) => ({
        auth: nestAuth(prisma, emailQueueService),
        bodyParser: {
          json: { limit: '2mb' },
          urlencoded: { limit: '2mb', extended: true },
          rawBody: true,
        },
      }),
    }),
  ],
  exports: [BetterAuthModule],
})
export class AuthModule {}
