import { Entity, Column, ManyToOne, JoinColumn, PrimaryColumn } from 'typeorm';
import { Cart } from './cart.entity';
import { Product } from './product.entity';

@Entity({ name: 'cart_items' })
export class CartItem {
  @PrimaryColumn('uuid')
  cart_id: string;

  @Column('uuid')
  product_id: string;

  @ManyToOne(
    () => Cart,
    cart => cart.items,
  )
  @JoinColumn({ name: 'cart_id', referencedColumnName: 'id' })
  cart: Cart;

  @ManyToOne(() => Product)
  @JoinColumn({ name: 'product_id', referencedColumnName: 'id' })
  product: Product;

  @Column({ type: 'integer', default: 1 })
  count: number;
}
