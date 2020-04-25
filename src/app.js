import {PLATFORM} from 'aurelia-pal';

export class App {

  configureRouter(config, router) {
    config.title = 'Workspace';
    config.map([
      { route: '', redirect: 'projects' },
      { route: 'kanban', moduleId: PLATFORM.moduleName('commons/kanban/kanban'), name: 'kanban' },
      { route: 'crm/office',  moduleId: PLATFORM.moduleName('components/crm1/customerInfoPage/customerInfoPage'), name: 'customerInfoPage' },
      { route: 'crm/clients',  moduleId: PLATFORM.moduleName('components/crm1/clientsView/clientsView'), name: 'clientsView' },
      { route: 'crm/clients/complex',  moduleId: PLATFORM.moduleName('components/crm1/complexView/complexView'), name: 'complexiew' },
    ]);

    this.router = router;
  }
}
