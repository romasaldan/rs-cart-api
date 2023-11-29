import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart-item.entity';
import { Cart } from './entities/cart.entity';
import { Order } from './entities/order.entity';
import { Product } from './entities/product.entity';
import { User } from './entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.databaseHost,
      port: Number(process.env.databasePort),
      username: process.env.username,
      password: process.env.userPassword,
      database: process.env.database,
      ssl: {
        ca: process.env.CA,
        rejectUnauthorized: false,
      },
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
    }),
    TypeOrmModule.forFeature([Cart, CartItem, Order, Product, User]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
