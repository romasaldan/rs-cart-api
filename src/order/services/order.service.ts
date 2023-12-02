import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '../../database/entities/order.entity';
import { Repository } from 'typeorm';
import { v4 } from 'uuid';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
  ) { }


  async findById(orderId: string): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: {
        id: orderId
      }
    })

    return order
  }

  async create(data: any) {
    const id = v4()
    const order = {
      ...data,
      id,
      status: 'inProgress',
    };

    const newOrder = this.orderRepository.create(order)

    return newOrder;
  }

  async update(orderId, data) {
    const order = await this.findById(orderId);

    if (!order) {
      throw new Error('Order does not exist.');
    }

    const newOrder = this.orderRepository.create({
      ...data,
      id: orderId,
    })

    return newOrder;
  }
}
