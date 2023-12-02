import { Module } from '@nestjs/common';
import { ProductsModule } from '../product/product.module';
import { DatabaseModule } from '../database/database.module';
import { OrderModule } from '../order/order.module';

import { CartController } from './cart.controller';
import { CartService } from './services';

@Module({
  imports: [OrderModule, DatabaseModule, ProductsModule],
  providers: [CartService],
  controllers: [CartController],
})
export class CartModule {}
