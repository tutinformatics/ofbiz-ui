import { PLATFORM } from 'aurelia-pal';

export class ProjectMainComponent {
  configureRouter(config) {
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      {
        route: '',
        moduleId: PLATFORM.moduleName('project/components/project-list'),
        name: 'project'
      },
      {
        route: 'new-task',
        moduleId: PLATFORM.moduleName('project/task/components/task-edit'),
        name: 'new-task'
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
    ]);
  }
}
