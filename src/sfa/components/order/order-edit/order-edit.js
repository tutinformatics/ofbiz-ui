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
        let order = { salesChannel: this.salesChannel, totalSum: this.order.totalSum, status: this.order.status, orderId: this.order.orderId, billingAccountId: this.order.billingAccountId, customerId: this.order.customerId};
        this.orderService.editOrder(order);
        this.goBack();
      };
      createOrder() {
        let order = { salesChannel: this.salesChannel, currencyUom: this.order.currencyUom, totalSum: this.order.totalSum, status: this.order.status, billingAccountId: this.order.billingAccountId, customerId: this.order.customerId};
        this.orderService.createNewOrder(order);
        this.goBack();
      };

      goBack() {
        history.back();
      }
}
