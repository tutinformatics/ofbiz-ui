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
        if (params.order.orderId && typeof(params.order.orderId) === 'string') {
            this.order = params.order;
            console.log(this.order);
            this.orderId = params.order.orderId;
        }
    }
    editOpportunity() {
      let order = { name: this.order.name, description: this.order.description, price: this.order.price, pipelineId: "SAMPLE_ID1", customerId: "SAMPLE_ID1", contactId: "SAMPLE_ID1", stage: this.stage, opportunityId: this.opportunityId };
      this.orderService.editOpportunity(order);
      OrderEdit.goBack();
    };

    goBack() {
      history.back();
    }
}
