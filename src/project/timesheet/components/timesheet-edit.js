import { inject } from 'aurelia-dependency-injection';
import { TimesheetService } from '../services/timesheet-service.js';
import { activationStrategy } from 'aurelia-router';

@inject(TimesheetService)
export class Timesheet {

  constructor(timesheetService) {
    this.timesheetService = timesheetService;
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
}
