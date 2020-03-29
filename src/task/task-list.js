import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { TaskService } from './task-service';

@inject(Router, TaskService)
export class TaskList {
    datasource = {
      transport: {
        read: (options) => {
          options.success(this.tasks);
        }
      }
    };

    constructor(router, taskService) {
      this.router = router;
      this.taskService = taskService;
      this.tasks = [];
    }

    created() {
      this.loadTasks();
    }

    loadTasks() {
      this.taskService.getTasks()
        .then(tasks => this.tasks = tasks);
    }

    handleAddTask() {
      this.router.navigate('/new-task');
    }
}
