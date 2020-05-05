import { PLATFORM } from 'aurelia-pal';

export class Opportunities {
  configureRouter(config, router) {
    config.title = 'Opportunities';
    config.options.pushState = true;
    // config.options.root = '/';
    config.map([
      { route: '', redirect: 'pipeline' },
      { route: 'pipeline', moduleId: PLATFORM.moduleName('sfa/components/opportunity/pipeline/pipeline'), name: 'pipeline' },
      { route: 'listview', moduleId: PLATFORM.moduleName('sfa/components/opportunity/listview/listview'), name: 'listview' },
      { route: 'cardview', moduleId: PLATFORM.moduleName('sfa/components/opportunity/cardview/cardview'), name: 'cardview' },
      { route: 'opportunity-edit', moduleId: PLATFORM.moduleName('sfa/components/opportunity/opportunity-edit/opportunity-edit'), name: 'opportunity-edit' },
    ]);
    this.router = router;

  }

  goBack() {
    history.back();
  }
  goForward() {
    history.forward();
  }
}
