import { inject } from 'aurelia-framework';
import {OrderService} from "../../../service/order-service";
import { Store } from 'aurelia-store';

@inject(OrderService, Store)
export class OrderEdit {
    constructor(orderService, store) {
      this.store = store;
      this.orderService = orderService;
    }

    attached() {
    }

    activate(params, routeConfig, navigationInstruction) {
      this.billingAccounts = this.orderService.get("BillingAccount");
      this.contacts = this.orderService.get("Person");
      if (params.order === undefined) {
        this.date = new Date().toLocaleDateString();
        this.order = {orderId: "New order"};
        return;
      }
      this.date = new Date(params.order.lastUpdatedStamp * 1).toLocaleDateString();
        if (params.order.orderId && typeof(params.order.orderId) === 'string') {
            this.order = params.order;
            this.orderId = params.order.orderId;
        }
    }
    editOrder() {
      let order = { orderId: this.order.orderId, grandTotal: this.order.grandTotal, statusId: this.order.statusId, billingAccountId: this.order.billingAccountId, contactId: this.order.contactId, salesChannelEnumId: this.order.salesChannelEnumId, currencyUom: this.order.currencyUom};
      this.orderService.editOrder(order);
      this.goBack();
    };
  createOrder() {
    let order = { salesChannelEnumId: this.order.salesChannelEnumId, currencyUom: this.order.currencyUom, grandTotal: this.order.grandTotal, statusId: this.order.statusId, billingAccountId: this.order.billingAccountId, contactId: this.order.contactId};
    this.orderService.createNewOrder(order);
    this.goBack();
  };

    goBack() {
      history.back();
    }
}
