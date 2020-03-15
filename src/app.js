import {PLATFORM} from 'aurelia-pal';

export class App {

  configureRouter(config, router) {
    config.title = 'Workspace';
    config.map([
      {route: '', moduleId: PLATFORM.moduleName('workspace/no-selection'), title: 'Select'},
      {route: 'workspace/:id', moduleId: PLATFORM.moduleName('workspace/workspace-detail'), name: 'contacts'},
      {route: 'workspaces', moduleId: PLATFORM.moduleName('workspace/workspaces'), name: 'workspaces'},
      {route: 'kanban', moduleId: PLATFORM.moduleName('commons/kanban/kanban'), name: 'kanban'},
      {route: 'publisher', moduleId: PLATFORM.moduleName('objektide_levi/publisher/publisher'), name: 'publisher'},
      {route: 'subscriber', moduleId: PLATFORM.moduleName('objektide_levi/subscriber/subscriber'), name: 'subscriber'},
      {route: 'object-dist', moduleId: PLATFORM.moduleName('objektide_levi/object-dist/object-dist'), name: 'object-dist'}
    ]);

    this.router = router;
  }
}
