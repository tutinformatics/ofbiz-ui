import {PLATFORM} from 'aurelia-pal';

export class App {

  configureRouter(config, router) {
    config.title = 'Workspace';
    config.map([
      { route: '', redirect: 'projects' },
      { route: 'new-task', moduleId: PLATFORM.moduleName('project/task/task-edit'), name: 'new-task' },
      { route: 'kanban', moduleId: PLATFORM.moduleName('commons/kanban/kanban'), name: 'kanban' },
      { route: 'object-dist/publisher', moduleId: PLATFORM.moduleName('objektide_levi/publisher/publisher'), name: 'publisher' },
      { route: 'object-dist', moduleId: PLATFORM.moduleName('objektide_levi/object-dist/object-dist'), name: 'object-dist' },
      { route: 'marketdata',  moduleId: PLATFORM.moduleName('marketdata/marketdata'), name: 'marketdata' },
      { route: 'crm/agents', moduleId: PLATFORM.moduleName('crm/agents/agents'), name: 'agents' },
      { route: 'crm/pipeline', moduleId: PLATFORM.moduleName('./crm/pipeline/pipeline'), name: 'pipeline' },
      { route: 'crm/opportunities', moduleId: PLATFORM.moduleName('./crm/opportunities/opportunities'), name: 'opportunities' },
      { route: 'projects', moduleId: PLATFORM.moduleName('project/project-list'), name: 'projects', title: 'Projects' },
      { route: 'projects/:id', moduleId: PLATFORM.moduleName('project/task/task-list'), name: 'project' },
      { route: 'new-project', moduleId: PLATFORM.moduleName('project/project-new'), name: 'newProject', title: 'Create Project' },
      {
        route: 'affiliate-manager',
        name: 'affiliate-manager',
        moduleId: PLATFORM.moduleName('affiliate-manager/view/aff-manager')
      },
      {
        route: 'affiliate-manager/aff-partner/:email?',
        name: 'aff-partner',
        moduleId: PLATFORM.moduleName('affiliate-manager/view/aff-partner/manage-aff-partner')
      },
      { route: 'crm/office',  moduleId: PLATFORM.moduleName('components/crm1/customerInfoPage/customerInfoPage'), name: 'customerInfoPage' },
      { route: 'crm/clients',  moduleId: PLATFORM.moduleName('components/crm1/clientsView/clientsView'), name: 'clientsView' },
    ]);

    this.router = router;
  }
}
