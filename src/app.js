import {PLATFORM} from 'aurelia-pal';

export class App {

  configureRouter(config, router) {
    config.title = 'Workspace';
    config.map([
      { route: '', moduleId: PLATFORM.moduleName('workspace/no-selection'),   title: 'Select'},
      { route: 'workspace/:id',  moduleId: PLATFORM.moduleName('workspace/workspace-detail'), name:'contacts' },
      { route: 'workspaces',  moduleId: PLATFORM.moduleName('workspace/workspaces'), name:'workspaces' },
      { route: 'kanban',  moduleId: PLATFORM.moduleName('commons/kanban/kanban'), name:'kanban' },
      { route: 'kendo-grid',  moduleId: PLATFORM.moduleName('commons/kendo-grid-test/kendo-grid'), name:'grid' },
    ]);

    this.router = router;
  }
}
