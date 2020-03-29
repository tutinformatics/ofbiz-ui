import { inject } from 'aurelia-dependency-injection';
import { TaskService } from './task-service';
import { Router } from 'aurelia-router';

@inject(Router, TaskService)
export class Task {
  constructor(router, taskService) {
    this.router = router;
    this.taskService = taskService;
    this.task = {};
  }

  get canSave() {
    return !!this.task.taskName && !!this.task.projectName && !!this.task.priority;
  }

  addTask() {
    this.taskService.createTask(this.task)
      .then(() => this.router.navigate('/'));
  }
}
