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

  deleteOpportunity(index, id) {
    this.orders.splice(index, 1);
    this.orderService.deleteOrderById(id);
  }
}
