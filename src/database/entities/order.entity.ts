import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  JoinColumn,
  OneToMany,
} from 'typeorm';
import { CartItem } from './cart-item.entity';
import { CartStatus } from './cart.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('uuid')
  user_id: string;

  @Column('uuid')
  cart_id: string;

  @OneToMany(
    () => CartItem,
    item => item.cart,
  )
  @JoinColumn({ name: 'cart_id' })
  items: CartItem[];

  @Column({ type: 'jsonb' })
  payment: {
    type: string;
    address?: any;
    creditCard?: any;
  };

  @Column({ type: 'jsonb' })
  delivery: {
    type: string;
    address: any;
  };

  @Column({ type: 'text' })
  comments: string;

  @Column({ type: 'enum', enum: CartStatus, default: CartStatus.OPEN })
  status: CartStatus;

  @Column({ type: 'integer' })
  total: number;
}
