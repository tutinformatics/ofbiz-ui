import { inject } from 'aurelia-framework';
import {OrderService} from "../../../service/order-service";

@inject(OrderService)
export class OrderEdit {
    constructor(orderService, router) {
      this.router = router;
      this.orderService = orderService;
    }

    attached() {
    }

    activate(params, routeConfig, navigationInstruction) {
      this.billingAccounts = this.orderService.get("BillingAccount");
      this.customers = this.orderService.get("customer");
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
      let order = { grandTotal: this.order.grandTotal, statusId: this.order.statusId, orderId: this.order.orderId, billingAccountId: this.order.billingAccountId};
      console.log(order);
      this.orderService.editOrder(order);
      this.goBack();
    };
  createOrder() {
    let order = { salesChannelEnumId: this.salesChannelEnumId, currencyUom: "USD", grandTotal: this.order.grandTotal, statusId: this.order.statusId, billingAccountId: this.order.billingAccountId};
    console.log(order);
    this.orderService.createNewOrder(order);
    this.goBack();
  };

    goBack() {
      history.back();
    }
}
