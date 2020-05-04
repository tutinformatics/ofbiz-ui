import { PLATFORM } from 'aurelia-pal';

export class Timesheet {
  configureRouter(config) {
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      {
        route: '',
        moduleId: PLATFORM.moduleName('timesheet/components/timesheet-list'),
        name: 'timesheet'
      }
    ]);
  }
}
