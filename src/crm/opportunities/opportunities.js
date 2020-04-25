import { PLATFORM } from 'aurelia-pal';

export class OpportunitiesTest {
  configureRouter(config, router) {
    config.title = 'Opportunities';
    config.options.pushState = true;
    // config.options.root = '/';
    config.map([
      { route: ['', 'pipeline'], moduleId: PLATFORM.moduleName('crm/components/pipeline/pipeline'), name: 'pipeline' },
      { route: 'listview', moduleId: PLATFORM.moduleName('crm/components/listview/listview'), name: 'listview' },
      { route: 'cardview', moduleId: PLATFORM.moduleName('crm/components/cardview/cardview'), name: 'cardview' },

    ]);
    this.router = router;
  }
}
