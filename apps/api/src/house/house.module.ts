import { Module } from '@nestjs/common';
import { HouseController } from '@/house/house.controller';
import { HouseService } from '@/house/house.service';
import { HouseRepository } from '@/house/house.repository';

@Module({
  controllers: [HouseController],
  providers: [HouseService, HouseRepository],
  exports: [HouseService, HouseRepository],
})
export class HouseModule {}
