import * as _ from 'lodash';

const routes = {
  project: [
    {
      route: '',
      moduleId: PLATFORM.moduleName('project/components/project-list'),
      name: 'project',
      nav: true,
      title: 'Projects'
    },
    {
      route: 'new-task',
      moduleId: PLATFORM.moduleName('project/task/components/task-edit'),
      name: 'new-task',
      nav: true,
      title: 'My Tasks'
    },
    {
      route: 'project/:id',
      moduleId: PLATFORM.moduleName('project/task/components/task-list'),
      name: 'project-view'
    },
    {
      route: 'new-project',
      moduleId: PLATFORM.moduleName('project/components/project-edit'),
      name: 'new-project',
      title: 'Create Project'
    }
  ],
  sfa: [
    { route: '', redirect: 'opportunities' },
    {
      route: 'opportunities',
      moduleId: PLATFORM.moduleName('sfa/view/opportunities/opportunities'),
      name: 'opportunities',
      title: 'Opportunities',
      nav: true
    },
    {
      route: 'quotes',
      moduleId: PLATFORM.moduleName('sfa/view/quotes/quotes'),
      name: 'quotes',
      title: 'Quotes',
      nav: true
    },
    {
      route: 'agents',
      moduleId: PLATFORM.moduleName('sfa/view/agents/agents'),
      nav: true,
      title: 'Agents',
      name: 'agents'
    },
    {
      route: 'orders',
      moduleId: PLATFORM.moduleName('sfa/view/orders/orders'),
      nav: true,
      title: 'Orders',
      name: 'orders'
    },
  ],
  crm: [], // TODO: add crm child routes here
  cms: [], // TODO: add cms child routes here
  marketdata: [], // TODO: add marketdata child routes here
  objectdist: [] // TODO: add objectdist child routes here
};

export class NavigationService {
  getRoutes(app) {
    return new Promise((resolve) => {
      resolve(_.cloneDeep(routes[app]));
    });
  }
}
