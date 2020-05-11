import { OrderService } from '../../../service/order-service';
import { inject } from 'aurelia-framework';

@inject(OrderService)
export class CardView {
  constructor(orderService) {
    this.orderService = orderService;
  }

  attached() {
    this.orderService.getOrders()
      .then(
        data => this.orders = data
      );
  }

  deleteOrder(id, index) {
    this.orders.splice(index, 1);
    this.orderService.deleteOrder(id);
  }
}
