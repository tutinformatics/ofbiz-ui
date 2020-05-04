import { PLATFORM } from 'aurelia-pal';

export class Quotes {
  configureRouter(config, router) {
    config.title = 'Quotes';
    config.options.pushState = true;
    // config.options.root = '/';
    config.map([
      { route: '', redirect: 'listview' },
      { route: 'listview', moduleId: PLATFORM.moduleName('sfa/components/quote/listview/listview'), name: 'listview' },
      { route: 'cardview', moduleId: PLATFORM.moduleName('sfa/components/quote/cardview/cardview'), name: 'cardview' },
    ]);
    this.router = router;
  }
}
