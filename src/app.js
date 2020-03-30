import { PLATFORM } from 'aurelia-pal';

export class App {
  configureRouter(config, router) {
    config.title = 'Ofbiz UI';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      {route: '', moduleId: PLATFORM.moduleName('workspace/no-selection'), title: 'Select'},
      {route: 'workspace/:id', moduleId: PLATFORM.moduleName('workspace/workspace-detail'), name: 'contacts'},
      {route: 'workspaces', moduleId: PLATFORM.moduleName('workspace/workspaces'), name: 'workspaces'},
      {route: 'kanban', moduleId: PLATFORM.moduleName('commons/kanban/kanban'), name: 'kanban'},
      {route: 'object-dist/publisher', moduleId: PLATFORM.moduleName('objektide_levi/publisher/publisher'), name: 'publisher'},
      {route: 'object-dist', moduleId: PLATFORM.moduleName('objektide_levi/object-dist/object-dist'), name: 'object-dist'},
      {route: 'kendo-grid',  moduleId: PLATFORM.moduleName('commons/kendo-grid-test/kendo-grid'), name:'grid'},
      
      {route: '', redirect: 'tasks'},
      {route: 'tasks', moduleId: PLATFORM.moduleName('task/task-list'), name: 'tasks'},
      {route: 'new-task', moduleId: PLATFORM.moduleName('task/task'), name: 'new-task'},
      {route: 'kanban', moduleId: PLATFORM.moduleName('commons/kanban/kanban'), name: 'kanban'}
    ]);
    this.router = router;
  }
}
