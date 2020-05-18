import { inject } from "aurelia-dependency-injection";
import { Router } from "aurelia-router";
import { TimesheetService } from "../services/timesheet-service";
import { Store } from "aurelia-store";

@inject(Router, TimesheetService, Store)
export class MyTaskTime {

  constructor(router, timesheetService, store) {
    this.router = router;
    this.timesheetService = timesheetService;
    this.store = store;
    this.tasks = {};
    this.task = {};
    this.store.state.subscribe(
      (state) => (this.state = state)
    );
  }

  created() {
    this.datasourceTasks = {
      transport: {
        read: (options) => {
          this.timesheetService
            .getMyTime({ partyId: this.state.userLoginId })
            .then((response) => {
              options.success(response);
            });
        }
      }
    };

    this.datasourceRates = {
      transport: {
        read: (options) => {
          this.timesheetService
            .getRateTypes()
            .then((response) => {
              options.success(response);
            });
        }
      }
    };
  }

  updateTaskTime(task) {
    this.timesheetService
      .updateTask(task)
      .then(() => this.router.navigate('timesheet'));
  }

  handleBack() {
    this.router.navigateBack();
  }

  get canSave() {
    return !!this.task.workEffortId;
  }

}
