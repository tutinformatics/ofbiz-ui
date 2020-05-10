import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { TaskService } from '../services/task-service';
import { activationStrategy } from 'aurelia-router';
import { ProjectService } from '../../services/project-service';

@inject(Router, TaskService, ProjectService)
export class TaskList {
  constructor(router, taskService, projectService) {
    this.router = router;
    this.taskService = taskService;
    this.projectService = projectService;
    this.project = {};
  }

  activate(params, routeConfig) {
    routeConfig.navModel.setTitle(`Project ID: ${params.id}`);

    this.projectService
      .getProject({ workEffortId: params.id })
      .then((response) => (this.project = response[0]));

    this.datasource = {
      transport: {
        read: (options) => {
          this.taskService
            .getProjectTaskList({ projectId: params.id })
            .then((tasks) => {
              options.success(tasks);
            });
        }
      },
      schema: {
        model: {
          fields: {
            workEffortId: { type: 'number' },
            workEffortName: { type: 'string' },
            phaseName: { type: 'string' },
            currentStatusId: { type: 'string' },
            priority: { type: 'number' },
            estimatedStartDate: { type: 'date' },
            startDate: { type: 'date' },
            estimatedCompletionDate: { type: 'date' },
            completionDate: { type: 'date' },
            plannedHours: { type: 'number' }
          }
        }
      }
    };
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }
}
