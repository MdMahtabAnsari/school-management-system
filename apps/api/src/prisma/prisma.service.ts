import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@workspace/db/generated/prisma/cjs/client';
import { PrismaPg } from '@prisma/adapter-pg';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super({
      adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL,
      }),
    });
  }
  async onModuleInit() {
    // Note: this is optional
    await this.$connect();
  }
}
