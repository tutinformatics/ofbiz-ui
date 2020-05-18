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
      { route: 'formview', moduleId: PLATFORM.moduleName('sfa/components/opportunity/formview/formview'), name: 'formview' },
    ]);
    this.router = router;

  }
}
