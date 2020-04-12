import { inject } from 'aurelia-dependency-injection';
import { HttpClient, json } from 'aurelia-fetch-client';
import { SearchUtils } from '../../commons/util/search-utils';

@inject(HttpClient)
export class TaskService {
  baseUrl = 'api/project'; // TODO: should be configurable

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  createTask(task) {
    const body = json(task);
    return this.httpClient
      .fetch(`${this.baseUrl}/new-task`, {
        method: 'post',
        body: body
      })
      .catch(error => console.log(error)); // TODO: improve error handling
  }
  getProjectTaskList(params) {
    const query = SearchUtils.appendQueryParams(params);

    return this.httpClient
      .fetch(`${this.baseUrl}/task-list?${query}`)
      .then(res => res.json())
      .then(res => {
        res.taskList.map(task => {
          task.estimatedStartDate = !!task.estimatedStartDate ? new Date(task.estimatedStartDate) : undefined;
          task.startDate = !!task.startDate ? new Date(task.startDate) : undefined;
          task.completionDate = !!task.completionDate ? new Date(task.completionDate) : undefined;
          task.estimatedCompletionDate = !!task.estimatedCompletionDate ? new Date(task.estimatedCompletionDate) : undefined;
        });
        return res.taskList;
      })
      .catch(error => console.log(error)); // TODO: improve error handling
  }
}

