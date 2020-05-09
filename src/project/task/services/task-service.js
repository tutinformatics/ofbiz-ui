import { inject } from 'aurelia-dependency-injection';
import { HttpClient, json } from 'aurelia-fetch-client';
import { safeGet } from '../../../commons/util/utility';

@inject(HttpClient)
export class TaskService {
  baseUrl = 'api/generic/v1/services';

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  createTask(task) {
    const body = json(task);

    return this.httpClient
      .fetch(`${this.baseUrl}/createProjectTask`, {
        method: 'post',
        body: body
      })
      .catch((error) => {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error);
      }); // TODO: improve error handling
  }
  getProjectTaskList(params) {
    const body = json(params);

    return this.httpClient
      .fetch(`${this.baseUrl}/getProjectTaskList`, {
        method: 'post',
        body: body
      })
      .then((res) => res.json())
      .then((res) => {
        return safeGet(() => res.taskList, []).map((task) => {
          task.estimatedStartDate = !!task.estimatedStartDate
            ? new Date(task.estimatedStartDate)
            : undefined;
          task.startDate = !!task.startDate
            ? new Date(task.startDate)
            : undefined;
          task.completionDate = !!task.completionDate
            ? new Date(task.completionDate)
            : undefined;
          task.estimatedCompletionDate = !!task.estimatedCompletionDate
            ? new Date(task.estimatedCompletionDate)
            : undefined;
          return task;
        });
      })
      .catch((error) => {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error);
      }); // TODO: improve error handling
  }
}

