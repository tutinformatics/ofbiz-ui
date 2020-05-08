import { PLATFORM } from 'aurelia-pal';

export class Resource {
  configureRouter(config) {
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      {
        route: '',
        moduleId: PLATFORM.moduleName('resource/components/resource-list'),
        name: 'resource'
      },
      {
        route: 'new-resource',
        moduleId: PLATFORM.moduleName('resource/components/resource-edit'),
        name: 'new-resource'
      }
    ]);
  }
}
