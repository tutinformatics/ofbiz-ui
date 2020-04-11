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
          productName: { type: 'string' },
          quantity: { type: 'number' },
          itemPrice: { type: 'number' },
          totalPrice: { type: 'number' },
          details: { type: 'string' },
        }
      }
    }
  };

  constructor(router, taskService) {
    this.router = router;
    this.taskService = taskService;
  }

}
