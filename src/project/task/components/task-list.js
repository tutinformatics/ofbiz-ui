import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { TaskService } from '../services/task-service';

@inject(Router, TaskService)
export class TaskList {
  constructor(router, taskService) {
    this.router = router;
    this.taskService = taskService;
  }

  activate(params, routeConfig) {
    routeConfig.navModel.setTitle(`Project ID: ${params.id}`);

    this.datasource = {
      transport: {
        read: (options) => {
          this.taskService.getProjectTaskList({ projectId: params.id })
            .then(tasks => options.success(tasks));
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

  handleAddTask() {
    this.router.navigate('new-task');
  }
}
