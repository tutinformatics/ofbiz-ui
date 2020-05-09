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
    { route: '', redirect: 'pipeline' },
    {
      route: 'pipeline',
      moduleId: PLATFORM.moduleName('crm/components/pipeline/pipeline'),
      name: 'pipeline',
      title: 'CRM',
      nav: true
    },
    {
      route: 'listview',
      moduleId: PLATFORM.moduleName('crm/components/listview/listview'),
      name: 'listview'
    },
    {
      route: 'cardview',
      moduleId: PLATFORM.moduleName('crm/components/cardview/cardview'),
      name: 'cardview'
    }
  ],
  crm: [
    { route: '', redirect: 'clients' },
    {
      route: 'clients',
      moduleId: PLATFORM.moduleName('components/crm1/clientsView/clientsView'),
      name: 'clients',
      title: 'clients',
      nav: true
    },
    {
      route: 'clients/complex',
      moduleId: PLATFORM.moduleName('components/crm1/complexView/complexView'),
      name: 'complexview'
    },
    {
      route: 'bills',
      moduleId: PLATFORM.moduleName('components/crm1/billView/billsView'),
      name: 'bills'
    },
    {
      route: 'orders',
      moduleId: PLATFORM.moduleName('components/crm1/orderView/ordersView'),
      name: 'orders'
    },
  ],
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
