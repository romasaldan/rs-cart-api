import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from '../../database/entities/cart-item.entity';
import { Cart, CartStatus } from '../../database/entities/cart.entity';
import { Product } from '../../database/entities/product.entity';
import { Repository } from 'typeorm';
import { Any } from 'typeorm';
import { v4 } from 'uuid';
import { In } from 'typeorm';
@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepository: Repository<Cart>,
    @InjectRepository(CartItem)
    private readonly cartItemRepository: Repository<CartItem>,
  ) {}

  async findByUserId(userId: string): Promise<Cart> {
    const userCart = await this.cartRepository.findOne({
      where: { user_id: userId, status: CartStatus.OPEN },
      relations: ['items'],
    });

    return userCart;
  }

  async createByUserId(userId: string) {
    const userCart = {
      id: v4(),
      user_id: userId,
      items: [],
      createdAt: new Date(),
      updatedAt: new Date(),
      status: CartStatus.OPEN,
    };

    return this.cartRepository.save(userCart);
  }

  async findOrCreateByUserId(userId: string): Promise<Cart> {
    const userCart = await this.findByUserId(userId);

    if (userCart) {
      return userCart;
    }

    return this.createByUserId(userId);
  }

  async updateByUserId(userId: string, { items }: Cart): Promise<Cart> {
    console.log(items);
    const cart = await this.findOrCreateByUserId(userId);
    console.log(items.map(item => item.cart_id));
    const cartItems = await this.cartItemRepository.findByIds(
      items.map(item => item.cart_id),
    );
    console.log(cartItems);

    const updatedCart = {
      ...cart,
      updatedAt: new Date(),
      items: cartItems,
    };

    return this.cartRepository.save(updatedCart);
  }

  async removeByUserId(userId): Promise<void> {
    const card = await this.findByUserId(userId);
    const cardItem = await this.cartItemRepository.findOne({
      where: { cart_id: card.id },
    });

    if (cardItem) {
      await this.cartItemRepository.remove(cardItem);
    }

    await this.cartRepository.remove(card);
  }
}
