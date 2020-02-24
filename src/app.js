import {inject, PLATFORM} from 'aurelia-framework';
import {WebAPI} from './web-api';

@inject(WebAPI)
export class App {
  constructor(api) {
    this.api = api;
  }

  configureRouter(config, router) {
    config.title = 'Workspace';
    config.map([
      { route: '',              moduleId: PLATFORM.moduleName('no-selection'),   title: 'Select'},
      { route: 'workspace/:id',  moduleId: PLATFORM.moduleName('workspace-detail'), name:'contacts' }
    ]);

    this.router = router;
  }
}
