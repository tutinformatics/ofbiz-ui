import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { OrderService } from '../../../service/order-service.js';
import {Store} from "aurelia-store";

@inject(EventAggregator, OrderService, Store)
export class OrderHeader {

  constructor(ea, orderService, store) {
    this.ea = ea;
    this.orderService = orderService;
    this.store = store;
    this.subscription = this.store.state.subscribe(
      (state) => this.state = state
    );
  }

  // unbind() {
  //   this.subscription.unsubscribe();
  // }

  newOrder() {
    let order = {
      orderName: this.orderName,
      grandTotal: this.grandTotal,
      currencyUom: this.currencyUom,
      salesChannelEnumId: this.salesChannelEnumId,
      createdBy: this.state.userLoginId,
      orderTypeId: "SALES_ORDER",
      statusId: "ORDER_CREATED",
    };
    //billingAccountId: this.billingAccountId,
    this.orderService.createNewOrder(order);
    window.location.reload();
  };
}
