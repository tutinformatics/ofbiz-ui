import { inject } from 'aurelia-dependency-injection';
import { HttpClient, json } from 'aurelia-fetch-client';
import { safeGet } from '../../../commons/util/utility';
import { ResourceEntities } from '../../resource/entities/resource-entities';

@inject(HttpClient, ResourceEntities)
export class TimesheetService {
  baseUrl = 'api/generic/v1';

  constructor(httpClient, resourceEntities) {
    this.httpClient = httpClient;
    this.resourceEntities = resourceEntities;

  }

  createTimesheet(timesheet) {
    const body = json(timesheet);

    return this.httpClient
      .fetch(`${this.baseUrl}/entities/Timesheet`, {
        method: 'post',
        body: body
      })
      .then((response) => {
        if (!response.ok) {
          // TODO: improve error handling
          throw new Error('An error occured while creating timesheet');
        }
        return response.json();
      });
  }

  getTimesheetList() {

    return this.httpClient
      .fetch(`${this.baseUrl}/entities/Timesheet`, {
        method: 'get'
      })
      .then((res) => res.json())
      .then((res) => {
        return safeGet(() => res, []).map((timesheet) => {
          timesheet.fromDate = !!timesheet.fromDate
            ? new Date(timesheet.fromDate)
            : undefined;
          timesheet.thruDate = !!timesheet.thruDate
            ? new Date(timesheet.thruDate)
            : undefined;

          return timesheet;
        });
      })
      .catch((error) => {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error);
      }); // TODO: improve error handling
  }

  getProjectParty() {
    console.log(this.resourceEntities.getResourceList(' '));
    return this.resourceEntities.getResourceList(' ');
  }
}
