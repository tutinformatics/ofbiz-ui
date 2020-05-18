import { OrderService } from '../../../service/order-service';
import { inject } from 'aurelia-framework';
import { Store } from 'aurelia-store';

@inject(OrderService, Store)
export class CardView {
  constructor(orderService, store) {
    this.orderService = orderService;
    this.store = store;
  }

  attached() {
    this.orderService.getOrders()
      .then(
        data => this.store.orders = data
    );
    this.orderService.getOrders()
      .then(
        data => this.store.ordersCopy = data
      )
  }

  deleteOrder(id, index) {
    this.store.orders.splice(index, 1);
    this.orderService.deleteOrder(id);
  }
}
