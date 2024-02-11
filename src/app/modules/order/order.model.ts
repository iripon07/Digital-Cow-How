import { Schema, model } from 'mongoose';
import { IOrder, OrderModel } from './order.interface';

const orderSchema = new Schema<IOrder, OrderModel>(
  {
    cow: {
      type: Schema.Types.ObjectId,
      ref: 'Cow',
    },
    buyer: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  },
);

export const Order = model<IOrder, OrderModel>('Order', orderSchema);
