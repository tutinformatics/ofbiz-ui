import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { TaskService } from '../task/task-service';

@inject(Router, TaskService)
export class TaskList {
  datasource = {
    transport: {
      read: (options) => {
        this.taskService.getProjectTaskList({ projectId: '9000' }) // TODO: projectId should not be hard-coded
          .then(tasks => options.success(tasks));
      }
    },
    schema: {
      model: {
        fields: {
          orderId: { type: 'number' },
          totalCost: { type: 'number' },
          dateOrdered: { type: 'date' },
          dateArrived: { type: 'date' },
          Details: { type: 'string' },
        }
      }
    }
  };

  constructor(router, taskService) {
    this.router = router;
    this.taskService = taskService;
  }

}
