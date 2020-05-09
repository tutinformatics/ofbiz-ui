import { inject } from 'aurelia-dependency-injection';
import { HttpClient, json } from 'aurelia-fetch-client';
import { SearchUtils } from '../../commons/util/search-utils';

@inject(HttpClient)
export class ProjectService {
  baseUrl = 'api/generic/v1';

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getProject(params) {
    const query = SearchUtils.appendQueryParams(params);

    return this.httpClient
      .fetch(`${this.baseUrl}/entities/WorkEffort?${query}`)
      .then((response) => {
        if (!response.ok) {
          // TODO: improve error handling
          throw new Error('An error occured while fetching project');
        }
        return response.json();
      });
  }

  getProjectList() {
    return this.httpClient
      .fetch(`${this.baseUrl}/services/getAllProjectList`, {
        method: 'post',
        body: json({})
      })
      .then((res) => res.json())
      .then((res) => res.projectList)
      .catch((error) => {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error);
      }); // TODO: improve error handling
  }

  createProject(project) {
    const body = json(project);

    return this.httpClient
      .fetch(`${this.baseUrl}/services/createProject`, {
        method: 'post',
        body: body
      })
      .catch((error) => {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error);
      }); // TODO: improve error handling
  }

  getProjectPhaseList(params) {
    const query = SearchUtils.appendQueryParams(params);

    return this.httpClient
      .fetch(`${this.baseUrl}/entities/ProjectPartyAndPhase?${query}`)
      .then((response) => {
        if (!response.ok) {
          // TODO: improve error handling
          throw new Error('An error occured while fetching project phases');
        }
        return response.json();
      });
  }
}
