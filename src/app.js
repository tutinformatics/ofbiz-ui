import { PLATFORM } from 'aurelia-pal';

export class App {
  configureRouter(config, router) {
    config.title = 'Ofbiz UI';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      {
        route: '',
        moduleId: PLATFORM.moduleName('no-selection'),
        title: 'Select'
      },
      {
        route: 'kanban',
        moduleId: PLATFORM.moduleName('commons/kanban/kanban'),
        name: 'kanban'
      },
      {
        route: 'object-dist/publisher',
        moduleId: PLATFORM.moduleName('objektide_levi/publisher/publisher'),
        name: 'publisher'
      },
      {
        route: 'object-dist',
        moduleId: PLATFORM.moduleName('objektide_levi/object-dist/object-dist'),
        name: 'object-dist'
      },
      {
        route: 'crm/agents',
        moduleId: PLATFORM.moduleName('crm/agents/agents'),
        name: 'agents'
      },
      {
        route: 'crm/pipeline',
        moduleId: PLATFORM.moduleName('./crm/pipeline/pipeline'),
        name: 'pipeline'
      },
      {
        route: 'crm/opportunities',
        moduleId: PLATFORM.moduleName('./crm/opportunities/opportunities'),
        name: 'opportunities'
      },
      {
        route: 'project',
        moduleId: PLATFORM.moduleName('project/project'),
        name: 'project',
        title: 'Projects'
      },
      {
        route: 'affiliate-manager',
        name: 'affiliate-manager',
        moduleId: PLATFORM.moduleName('affiliate-manager/view/aff-manager')
      },
      {
        route: 'affiliate-manager/aff-partner/:email?',
        name: 'aff-partner',
        moduleId: PLATFORM.moduleName(
          'affiliate-manager/view/aff-partner/manage-aff-partner'
        )
      }
    ]);
    this.router = router;
  }
}
