import { Module } from '@nestjs/common';
import { nestAuth } from '@/auth/configs/nest-auth';
import { PrismaService } from '@/prisma/prisma.service';
import { AuthModule as BetterAuthModule } from '@thallesp/nestjs-better-auth';
import { PrismaModule } from '@/prisma/prisma.module';

@Module({
  imports: [
    BetterAuthModule.forRootAsync({
      imports: [PrismaModule],
      inject: [PrismaService],
      useFactory: (prisma: PrismaService) => ({
        auth: nestAuth(prisma),
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
