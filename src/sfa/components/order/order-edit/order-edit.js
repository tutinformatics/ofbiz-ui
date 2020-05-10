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
      this.billingAccounts = this.orderService.getBillingAccounts();
      console.log(this.billingAccounts);
        if (params.order.orderId && typeof(params.order.orderId) === 'string') {
            this.order = params.order;
            this.orderId = params.order.orderId;
        }
    }
    editOrder() {
      let order = { grandTotal: this.order.grandTotal, statusId: this.order.statusId, orderId: this.order.orderId };
      this.orderService.editOrder(order);
      this.goBack();
    };

    goBack() {
      history.back();
    }
}
