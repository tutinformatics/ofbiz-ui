import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { TimesheetService } from '../services/timesheet-service.js';
import { activationStrategy } from 'aurelia-router';
import {
  faPlus
} from '@fortawesome/free-solid-svg-icons';

@inject(Router, TimesheetService)
export class TimesheetList {
  constructor(router, timesheetService) {
    this.router = router;
    this.timesheetService = timesheetService;
    this.button = faPlus;
  }

  activate() {
    // console.log(this.timesheetService
    //   .getTimesheetList({partyId: 'admin'}));
    this.datasource = {
      transport: {
        read: (options) => {
          this.timesheetService
            .getTimesheetList({partyId: 'admin'})
            .then((timesheets) => {
              options.success(timesheets);
            });
        }
      },
      schema: {
        model: {
          fields: {
            timesheetId: { type: 'number' },
            statusId: { type: 'string' },
            partyId: { type: 'string' },
            fromDate: { type: 'date' },
            thruDate: { type: 'date' }
          }
        }
      }
    };
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  handleAddTimesheet() {
    this.router.navigate('new-timesheet');
  }
}
