import {PLATFORM} from 'aurelia-pal';
import {inject} from "aurelia-dependency-injection";
import {WebAPI} from "./web-api";

@inject(WebAPI)
export class App {
  constructor(api) {
    this.api = api;
  }

  configureRouter(config, router) {
    config.title = 'Workspace';
    config.map([
      { route: '', moduleId: PLATFORM.moduleName('no-selection'),   title: 'Select'},
      { route: 'workspace/:id',  moduleId: PLATFORM.moduleName('workspace-detail'), name:'contacts' },
      { route: 'workspaces',  moduleId: PLATFORM.moduleName('workspaces'), name:'workspaces' },
      { route: 'kanban',  moduleId: PLATFORM.moduleName('commons/kanban/kanban'), name:'kanban' }
    ]);

    this.router = router;
  }
}
