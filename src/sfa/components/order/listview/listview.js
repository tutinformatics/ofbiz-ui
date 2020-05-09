import { OrderService } from '../../../service/order-service';
import { inject } from 'aurelia-framework';

@inject(OrderService)
export class ListView {
  constructor(orderService) {
    this.orderService = orderService;
  }

  attached() {
    this.orderService.getOrders()
      .then(
        data => this.orders = data
      );

  }

  deleteOrders(id, index) {
    this.orders.splice(index, 1);
    this.orderService.deleteOrders(id);
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
