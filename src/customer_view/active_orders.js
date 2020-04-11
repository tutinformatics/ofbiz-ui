import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { OrdersService } from './order_service';

@inject(Router, OrdersService)
export class TaskList {
  datasource = {
    transport: {
      read: (options) => {
        this.orderService.getProjectTaskList({ projectId: '9000' }) // TODO: projectId should not be hard-coded
          .then(activeOrders => options.success(activeOrders));
      }
    },
    schema: {
      model: {
        fields: {
          orderId: { type: 'number' },
          totalCost: { type: 'number' },
          dateOrdered: { type: 'date' },
          approxArrival: { type: 'date' },
          progress: { type: 'number'},
          details: { type: 'string' },
        }
      }
    }
  };

  constructor(router, orderService) {
    this.router = router;
    this.orderService = orderService;
  }

}
