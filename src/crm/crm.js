import { PLATFORM } from 'aurelia-pal';

export class Crm {
  configureRouter(config, router) {
    config.title = 'Crm';
    config.options.pushState = true;
    // config.options.root = '/';
    config.map([
      { route: ['', 'opportunities'], moduleId: PLATFORM.moduleName('crm/views/opportunities/opportunities'), name: 'opportunities' },
      { route: 'quotes', moduleId: PLATFORM.moduleName('crm/views/quotes/quotes'), name: 'quotes' },
      { route: 'agents', moduleId: PLATFORM.moduleName('crm/views/agents/agents'), name: 'agents'},
    ]);
    this.router = router;
  }
}
