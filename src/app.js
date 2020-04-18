import { PLATFORM } from 'aurelia-pal';

export class App {
  configureRouter(config, router) {
    config.title = 'Ofbiz UI';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      { route: '', redirect: 'tasks' },
      { route: 'tasks', moduleId: PLATFORM.moduleName('task/task-list'), name: 'tasks' },
      { route: 'new-task', moduleId: PLATFORM.moduleName('task/task-edit'), name: 'new-task' },
      { route: 'kanban', moduleId: PLATFORM.moduleName('commons/kanban/kanban'), name: 'kanban' },
      { route: 'object-dist/publisher', moduleId: PLATFORM.moduleName('objektide_levi/publisher/publisher'), name: 'publisher' },
      { route: 'object-dist', moduleId: PLATFORM.moduleName('objektide_levi/object-dist/object-dist'), name: 'object-dist' },
      { route: 'crm/agents', moduleId: PLATFORM.moduleName('crm/agents/agents'), name: 'agents' },
      { route: 'crm/pipeline', moduleId: PLATFORM.moduleName('./crm/pipeline/pipeline'), name: 'pipeline' },
      { route: 'crm/opportunities-list-view', moduleId: PLATFORM.moduleName('./crm/opportunities/opportunities'), name: 'opportunities-list-view' },
      { route: 'crm/opportunities-card-view', moduleId: PLATFORM.moduleName('./crm/opportunities-card-view/opportunities-card-view'), name: 'opportunities-card-view' },
      { route: 'crm/opportunity-edit', moduleId: PLATFORM.moduleName('./crm/opportunity-edit/opportunity-edit'), name: 'opportunity-edit' },

    ]);
    this.router = router;
  }
}
