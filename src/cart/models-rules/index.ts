import { Cart as CartModel, CartItem } from '../models';
import { Product } from '../../database/entities/product.entity';
import { Cart } from '../../database/entities/cart.entity';

/**
 * @param {CartModel} cart
 * @returns {number}
 */
export function calculateCartTotal(cart: Partial<CartModel>): number {
  return cart
    ? cart.items?.reduce(
        (acc: number, { product: { price }, count }: CartItem) => {
          return (acc += price * count);
        },
        0,
      )
    : 0;
}

export const mergeCartWithProducts = (cart: Cart, products: Product[]) => ({
  ...cart,
  items: cart.items.map(item => ({
    ...item,
    product: products.find(product => product.id === item.product_id),
  })),
});
