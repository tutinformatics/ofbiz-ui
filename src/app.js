import { PLATFORM } from 'aurelia-pal';

export class App {
  configureRouter(config, router) {
    config.title = 'Ofbiz UI';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { route: '', redirect: 'order-history' },
      { route: 'tasks', moduleId: PLATFORM.moduleName('task/task-list'), name: 'tasks' },
      { route: 'new-task', moduleId: PLATFORM.moduleName('task/task-edit'), name: 'new-task' },
      { route: 'kanban', moduleId: PLATFORM.moduleName('commons/kanban/kanban'), name: 'kanban' },
      { route: 'object-dist/publisher', moduleId: PLATFORM.moduleName('objektide_levi/publisher/publisher'), name: 'publisher' },
      { route: 'object-dist', moduleId: PLATFORM.moduleName('objektide_levi/object-dist/object-dist'), name: 'object-dist' },
      { route: 'order-history', moduleId: PLATFORM.moduleName('customer_view/order_history'), name: 'order-history'},
      { route: 'active-orders', moduleId: PLATFORM.moduleName('customer_view/active_orders'), name: 'active-orders'},
      { route: 'active-orders-list', moduleId: PLATFORM.moduleName('customer_view/active_orders_list'), name: 'active-orders-list' },
      { route: 'order-view', moduleId: PLATFORM.moduleName('customer_view/order_view'), name: 'order-view'}
    ]);
    this.router = router;
  }
}
