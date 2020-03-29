import { PLATFORM } from 'aurelia-pal';

export class App {
  configureRouter(config, router) {
    config.title = 'Ofbiz UI';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { route: '', redirect: 'tasks' },
      { route: 'tasks', moduleId: PLATFORM.moduleName('task/task-list'), name: 'tasks' },
      { route: 'new-task', moduleId: PLATFORM.moduleName('task/task'), name: 'new-task' },
      { route: 'kanban', moduleId: PLATFORM.moduleName('commons/kanban/kanban'), name: 'kanban' }
    ]);

    this.router = router;
  }
}
