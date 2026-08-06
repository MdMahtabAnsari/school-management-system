import { Module } from '@nestjs/common';
import { EmailService } from '@/notification/email.service';
import { EmailProcessingService } from '@/notification/email-processing.service';
import { EmailQueueService } from '@/notification/email-queue.service';
import { BullModule } from '@nestjs/bullmq';

@Module({
  imports: [BullModule.registerQueue(
    {
      name: 'email',
    },
    {
      name: 'sms',
    },
  ),],
  providers: [EmailService, EmailProcessingService, EmailQueueService],
  exports: [EmailQueueService],
})
export class NotificationModule { }
