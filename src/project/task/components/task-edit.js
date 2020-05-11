import { inject } from 'aurelia-dependency-injection';
import { TaskService } from '../services/task-service';
import { Router } from 'aurelia-router';

@inject(Router, TaskService)
export class Task {
  constructor(router, taskService) {
    this.router = router;
    this.taskService = taskService;
    this.task = {
      statusId: 'PAS_ASSIGNED',
      partyId: 'admin', // should not be hard-coded
      workEffortParentId: '9001',
      currentStatusId: 'PTS_CREATED',
      roleTypeId: 'PROVIDER_MANAGER',
      workEffortTypeId: 'TASK'
    };
    this.parentPhaseList = [{
      text: 'Demo Project Cust1 --phase1',
      value: '9001'
    }];
    this.roleTypeList = [{
      text: 'Provider Manager',
      value: 'PROVIDER_MANAGER'
    }];
  }

  get canSave() {
    return !!this.task.workEffortName;
  }

  addTask() {
    this.taskService.createTask(this.task)
      .then(() => this.router.navigate('/projects'));
  }

  handleBack() {
    this.router.navigateBack();
  }
}
