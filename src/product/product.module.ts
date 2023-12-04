import { Module } from '@nestjs/common';

import { DatabaseModule } from '../database/database.module';
import { ProductService } from './services';

@Module({
  imports: [DatabaseModule],
  providers: [ProductService],
  exports: [ProductService],
})
export class ProductsModule {}
