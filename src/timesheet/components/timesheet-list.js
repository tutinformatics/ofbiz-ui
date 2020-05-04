import { inject } from 'aurelia-dependency-injection';
import { Router } from 'aurelia-router';
import { TimesheetService } from '../services/timesheet-service.js';
import { activationStrategy } from 'aurelia-router';

@inject(Router, TaskService)
export class TimesheetList {
  constructor(router, timesheetService) {
    this.router = router;
    this.timesheetService = timesheetService;
  }

  activate(params, routeConfig) {
    routeConfig.navModel.setTitle(`Timesheet ID: ${params.id}`);

    this.datasource = {
      transport: {
        read: (options) => {
          this.timesheetService
            .getTimesheetList({ timesheetId: params.id })
            .then((tasks) => {
              options.success(tasks);
            });
        }
      },
      schema: {
        model: {
          fields: {
            timesheetId: { type: 'number' },
            statusId: { type: 'string' },
            partyId: { type: 'string' },
            createdStamp: { type: 'date' },
            lastUpdatedStamp: { type: 'date' }
          }
        }
      }
    };
  }

  determineActivationStrategy() {
    return activationStrategy.replace;
  }
}
