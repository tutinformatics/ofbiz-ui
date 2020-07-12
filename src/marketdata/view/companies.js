import { PLATFORM } from 'aurelia-pal';

export class Companies {
  configureRouter(config, router) {
    config.title = 'Companies';
    config.options.pushState = true;
    config.map([
      { route: '', redirect: 'vaadin-listview' },
      { route: 'listview', moduleId: PLATFORM.moduleName('marketdata/components/listview/listview'), name: 'listview' },
      { route: 'cardview', moduleId: PLATFORM.moduleName('marketdata/components/cardview/cardview'), name: 'cardview' },
      { route: 'vaadin-listview', moduleId: PLATFORM.moduleName('marketdata/components/vaadin-list/vaadin-listview'), name: 'vaadin-listview' }

    ]);
    this.router = router;
  }
}
