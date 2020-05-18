import { OrderService } from '../../../service/order-service';
import { inject } from 'aurelia-framework';
import { Store } from 'aurelia-store';

@inject(OrderService, Store)
export class ListView {
  constructor(orderService, store) {
    this.store = store;
    this.orderService = orderService;
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
  timeConverter(UNIX_timestamp){
    let a = new Date(UNIX_timestamp);
    let months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let time = date + ' ' + month + ' ' + year;
    return time;
  }
}
