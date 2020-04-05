import { inject } from 'aurelia-dependency-injection';
import { HttpClient } from 'aurelia-fetch-client';
import { SearchUtils } from '../commons/util/search-utils';

@inject(HttpClient)
export class TaskService {
  baseUrl = 'api/task-list';

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getProjectTaskList(params) {
    const query = SearchUtils.appendQueryParams(params);

    return this.httpClient
      .fetch(`${this.baseUrl}?${query}`)
      .then(res => res.json())
      .then(res => {
        res.taskList.map(task => {
          task.estimatedStartDate = !!task.estimatedStartDate ? new Date(task.estimatedStartDate) : undefined;
          task.startDate = !!task.startDate ? new Date(task.startDate) : undefined;
          task.completionDate = !!task.completionDate ? new Date(task.completionDate) : undefined;
          task.estimatedCompletionDate = !!task.estimatedCompletionDate ? new Date(task.estimatedCompletionDate) : undefined;
        });
        return res.taskList;
      });
  }

  createTask(task) {
    return new Promise(resolve => {
      const newTask = Object.assign({}, task);
      this.tasks.push(newTask);
      resolve(newTask);
    });
  }
}

