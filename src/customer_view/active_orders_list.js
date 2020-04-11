import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { OrdersService } from './order_service';

@inject(Router, OrdersService)
export class ActiveOrdersList {
  datasource = {
    transport: {
      read: (options) => {
        options.success(this.activeOrders);
      }
    }
  };

  constructor(router, orderService) {
    this.router = router;
    this.orderService = orderService;
    this.activeOrders = [];
  }

  created() {
    this.loadTasks();
  }

  loadTasks() {
    this.orderService.getActiveOrders()
      .then(activeOrders => this.activeOrders = activeOrders);
  }

  /*
  handleAddTask() {
    this.router.navigate('/new-task');
  }
  */
}
