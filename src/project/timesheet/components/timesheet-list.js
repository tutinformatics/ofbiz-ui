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
    this.button = faPlus;
  }

  created() {
    this.datasource = {
      transport: {
        read: (options) => {
          this.timesheetService
            .getTimesheetList()
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

  handleAddTimesheet() {
    this.router.navigate('new-timesheet');
  }
}
