import { inject } from 'aurelia-dependency-injection';
import { TaskService } from '../services/task-service';
import { Store } from 'aurelia-store';

@inject(TaskService, Store)
export class TaskList {
  constructor(taskService, store) {
    this.taskService = taskService;
    this.store = store;
    this.subscription = this.store.state.subscribe(
      (state) => (this.state = state)
    );
  }

  created() {
    this.taskService
      .getTasks({
        partyId: this.state.userLoginId,
        statusId: 'PAS_ASSIGNED'
      })
      .then((response) => (this.tasks = response));
  }
}
