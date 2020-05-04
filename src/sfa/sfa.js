import { PLATFORM } from 'aurelia-pal';

export class Crm {
  configureRouter(config, router) {
    config.title = 'Crm';
    config.options.pushState = true;
    // config.options.root = '/';
    config.map([
      { route: '', redirect: 'opportunities' },
      { route: 'opportunities', moduleId: PLATFORM.moduleName('sfa/view/opportunities/opportunities'), nav: true, name: 'opportunities', title: 'Opportunities'},
      { route: 'quotes', moduleId: PLATFORM.moduleName('sfa/view/quotes/quotes'), nav: true, name: 'quotes', title: 'Quotes'},
      { route: 'agents', moduleId: PLATFORM.moduleName('sfa/view/agents/agents'), nav: true, name: 'agents', title: 'Agents'},
    ]);
    this.router = router;
  }
}
