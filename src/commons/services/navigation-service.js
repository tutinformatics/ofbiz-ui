import * as _ from 'lodash';
import {PLATFORM} from 'aurelia-pal';

const routes = {
  'project': [
    {
      route: '',
      moduleId: PLATFORM.moduleName('project/components/project-list'),
      name: 'project',
      nav: true,
      title: 'Projects'
    },
    {
      route: 'my-tasks',
      moduleId: PLATFORM.moduleName('project/task/components/task-list'),
      name: 'my-tasks',
      nav: true,
      title: 'My Tasks'
    },
    {
      route: 'new-task',
      moduleId: PLATFORM.moduleName('project/task/components/task-edit'),
      name: 'new-task',
      title: 'Create Task'
    },
    {
      route: 'project/:id',
      moduleId: PLATFORM.moduleName('project/components/project-view'),
      name: 'project-view'
    },
    {
      route: 'new-project',
      moduleId: PLATFORM.moduleName('project/components/project-edit'),
      name: 'new-project',
      title: 'Create Project'
    },
    {
      route: 'resources',
      moduleId: PLATFORM.moduleName(
        'project/resource/components/resource-list'
      ),
      name: 'resource',
      title: 'Resources',
      nav: true
    },
    {
      route: 'new-resource',
      moduleId: PLATFORM.moduleName(
        'project/resource/components/resource-edit'
      ),
      name: 'new-resource'
    },
    {
      route: 'timesheets',
      moduleId: PLATFORM.moduleName(
        'project/timesheet/components/timesheet-list'
      ),
      title: 'Timesheets',
      name: 'timesheets',
      nav: true
    },
    {
      route: 'timesheet',
      moduleId: PLATFORM.moduleName(
        'project/timesheet/components/timesheet-view'
      ),
      title: 'My Time',
      name: 'my-timesheet',
      nav: true
    },
    {
      route: 'timesheet/:id',
      moduleId: PLATFORM.moduleName(
        'project/timesheet/components/timesheet-view'
      ),
      name: 'timesheet-view'
    },
    {
      route: 'new-timesheet',
      moduleId: PLATFORM.moduleName(
        'project/timesheet/components/timesheet-edit'
      ),
      title: 'Create timesheet',
      name: 'new-timesheet'
    },
    {
      route: 'new-time',
      moduleId: PLATFORM.moduleName(
        'project/timesheet/components/my-task-time'
      ),
      title: 'My Task Time',
      name: 'new-time'
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
  crm: [
    { route: '', redirect: 'complex' },
    {
      route: 'complex',
      moduleId: PLATFORM.moduleName('components/crm1/complexView/complexView'),
      name: 'complexview',
      title: 'Complex View',
      nav: true
    },
    {
      route: 'clients',
      moduleId: PLATFORM.moduleName('components/crm1/clientsView/clientsView'),
      name: 'clients',
      title: 'Clients',
      nav: true
    },

    {
      route: 'bills',
      moduleId: PLATFORM.moduleName('components/crm1/billView/billsView'),
      name: 'bills',
      title: 'Bills',
      nav: true
    },
    {
      route: 'orders',
      moduleId: PLATFORM.moduleName('components/crm1/orderView/ordersView'),
      name: 'orders',
      title: 'Orders',
      nav: true
    },
  ],
  marketdata: [
    { route: '', redirect: 'companies' },
    {
      route: 'companies',
      moduleId: PLATFORM.moduleName('marketdata/view/companies'),
      name: 'companies',
      title: 'Companies',
      nav: true
    },
    {
      route: 'detailed-view/:id',
      moduleId: PLATFORM.moduleName('marketdata/components/detailed-view/detailed-view'),
      name: 'Detailed-view'
    },
  ],
  cms: [], // TODO: add cms child routes here
  objectdist: [] // TODO: add objectdist child routes here
};

export class NavigationService {
  getRoutes(app) {
    return new Promise((resolve) => {
      resolve(_.cloneDeep(routes[app]));
    });
  }
}
