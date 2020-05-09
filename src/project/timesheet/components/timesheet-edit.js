import { inject } from 'aurelia-dependency-injection';
import { TimesheetService } from '../services/timesheet-service.js';
import { activationStrategy } from 'aurelia-router';
import { Router } from 'aurelia-router';

@inject(TimesheetService, Router)
export class Timesheet {

  constructor(timesheetService, router) {
    this.router = router;
    this.timesheetService = timesheetService;
    this.timesheet = {
      statusId: "TIMESHEET_IN_PROCESS"
    };
  }

  activate() {

    this.datasource = {
      transport: {
        read: (options) => {
          this.timesheetService
            .getProjectParty()
            .then((party) => {
              options.success(party);
            });
        }
      },
      schema: {
        model: {
          fields: {
            partyId: { type: 'string' },
            firstName: { type: 'string' },
            lastName: { type: 'string' },
            name: { type: 'string' }
          }
        }
      }
    };
  }
  determineActivationStrategy() {
    return activationStrategy.replace;
  }

  addTimesheet() {
    this.timesheetService.createTimesheet(this.timesheet)
      .then(() => this.router.navigate('/project/timesheets'));
  }

  handleBack() {
    this.router.navigateBack();
  }
}
