import { inject } from 'aurelia-dependency-injection';
import { TaskService } from '../services/task-service';
import { Router } from 'aurelia-router';
import { ProjectService } from '../../services/project-service';
import { Store } from 'aurelia-store';

@inject(Router, TaskService, ProjectService, Store)
export class Task {
  constructor(router, taskService, projectService, store) {
    this.router = router;
    this.taskService = taskService;
    this.projectService = projectService;
    this.store = store;
    this.subscription = this.store.state.subscribe(
      (state) => (this.state = state)
    );
    this.datasource = {
      transport: {
        read: (options) => {
          this.projectService
            .getProjectPhaseList({ partyId: this.state.userLoginId })
            .then((response) => {
              response.map(
                (phase) =>
                  (phase.projectPhaseName = `${phase.projectName}--${phase.phaseName}`)
              );
              options.success(response);
            });
        }
      }
    };
    this.task = {
      statusId: 'PAS_ASSIGNED',
      partyId: this.state.userLoginId,
      workEffortParentId: '9001',
      currentStatusId: 'PTS_CREATED',
      roleTypeId: 'PROVIDER_MANAGER',
      workEffortTypeId: 'TASK'
    };
    this.roleTypeList = [
      {
        text: 'Provider Manager',
        value: 'PROVIDER_MANAGER'
      }
    ];
  }

  get canSave() {
    return !!this.task.workEffortName;
  }

  attached() {
    const estStartDate = document.querySelector('#estStartDate');
    const estComplDate = document.querySelector('#estComplDate');

    estStartDate.addEventListener('change',
      (event) => (this.task.estimatedStartDate = event.target.value)
    );

    estComplDate.addEventListener('change',
      (event) => (this.task.estimatedCompletionDate = event.target.value)
    );
  }

  addTask() {
    this.taskService
      .createTask(this.task)
      .then(() => this.router.navigate('my-tasks'));
  }

  handleBack() {
    this.router.navigateBack();
  }
}
