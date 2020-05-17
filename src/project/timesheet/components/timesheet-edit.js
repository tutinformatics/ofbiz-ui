import { inject } from 'aurelia-dependency-injection';
import { TimesheetService } from '../services/timesheet-service.js';
import { Router } from 'aurelia-router';
import { ResourceService } from '../../resource/services/resource-service';

@inject(TimesheetService, Router, ResourceService)
export class Timesheet {
  constructor(timesheetService, router, resourceService) {
    this.router = router;
    this.timesheetService = timesheetService;
    this.resourceService = resourceService;
    this.timesheet = {
      statusId: 'TIMESHEET_IN_PROCESS'
    };
  }

  created() {
    this.datasource = {
      transport: {
        read: (options) => {
          this.resourceService
            .getResourceList({ roleTypeId: 'PROJECT_TEAM' })
            .then((response) => {
              options.success(response);
            });
        }
      }
    };
  }

  attached() {
    const datePicker = document.querySelector('vaadin-date-picker');
    datePicker.addEventListener('change', (event) =>
      (this.timesheet.fromDate = event.target.value)
    );
  }

  addTimesheet() {
    this.timesheetService
      .createTimesheet(this.timesheet)
      .then(() => this.router.navigate('timesheets'));
  }

  handleBack() {
    this.router.navigateBack();
  }
}
