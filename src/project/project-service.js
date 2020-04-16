import {inject} from 'aurelia-dependency-injection';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(HttpClient)
export class ProjectService {
  baseUrl = 'api/v1/projects';

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getProjectList() {
    return this.httpClient
      .fetch(`${this.baseUrl}/project-list`)
      .then(res => res.json())
      .then(res => res.projectList)
      .catch(error => {
      /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error);
      }); // TODO: improve error handling
  }

  createProject(project) {
    const body = json(project);
    return this.httpClient
      .fetch(`${this.baseUrl}/new-project`, {
        method: 'post',
        body: body
      })
      .catch(error => {
      /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error);
      }); // TODO: improve error handling
  }
}
