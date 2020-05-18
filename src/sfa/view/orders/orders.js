import { PLATFORM } from 'aurelia-pal';

export class Orders {
  configureRouter(config, router) {
    config.title = 'Quotes';
    config.options.pushState = true;
    config.map([
      { route: '', redirect: 'listview' },
      { route: 'listview', moduleId: PLATFORM.moduleName('sfa/components/order/listview/listview'), name: 'listview' },
      { route: 'cardview', moduleId: PLATFORM.moduleName('sfa/components/order/cardview/cardview'), name: 'cardview' },
      { route: 'order-edit', moduleId: PLATFORM.moduleName('sfa/components/order/order-edit/order-edit'), name: 'order-edit' },
    ]);
    this.router = router;
  }
}
