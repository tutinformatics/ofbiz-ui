import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { TimesheetService } from '../services/timesheet-service.js';
import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';

@inject(Router, TimesheetService)
export class TimesheetList {
  constructor(router, timesheetService) {
    this.router = router;
    this.timesheetService = timesheetService;
    this.faPlus = faPlus;
  }

  attached() {
    const grid = document.querySelector('vaadin-grid');
    this.timesheetService
      .getTimesheetList()
      .then((response) => {
          response.map(
            sheet => {
              sheet.statusId = !!sheet.statusId ? sheet.statusId : 'UNKNOWN'; //TODO: change this workaround
            }
          );
          grid.items = response;
        }
      );
  }

  handleAddTimesheet() {
    this.router.navigate('new-timesheet');
  }
}
