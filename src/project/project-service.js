import {inject} from "aurelia-dependency-injection";
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(HttpClient)
export class ProjectService {
  baseUrl = 'api/project';

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getProjectList() {
    return this.httpClient
      .fetch(`${this.baseUrl}/project-list`)
      .then(res => res.json())
      .then(res => res.projectList)
      .catch(error => console.log(error)); // TODO: improve error handling
  }

  createProject(project) {
    const body = json(project);
    return this.httpClient
      .fetch(`${this.baseUrl}/new-project`, {
        method: 'post',
        body: body
      })
      .catch(error => console.log(error)); // TODO: improve error handling
  }
}
