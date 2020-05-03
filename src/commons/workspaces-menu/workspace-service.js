import { inject } from 'aurelia-dependency-injection';
import { HttpClient, json } from 'aurelia-fetch-client';
import { SearchUtils } from '../util/search-utils';

@inject(HttpClient)
export class WorkspaceService {
  baseUrl = 'api/generic/v1/entities';

  constructor(httpClient) {
    this.httpClient = httpClient;
    this.httpClient.configure((config) => {
      config
        .withDefaults({
          headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        });
    });
  }

  getWorkspaceList(params) {
    const query = SearchUtils.appendQueryParams(params);

    return this.httpClient
      .fetch(`${this.baseUrl}/Workspace?${query}`)
      .then((response) => {
        if (!response.ok) {
          // TODO: improve error handling
          throw new Error('An error occured while fetching workspaces');
        }
        return response.json();
      });
  }

  addWorkspace(workspace) {
    const body = json(workspace);
    return this.httpClient
      .fetch('api/v1/workspaces/new-workspace', {
        method: 'post',
        body: body
      })
      .then((response) => {
        if (!response.ok) {
          // TODO: improve error handling
          throw new Error('An error occured while saving workspace');
        }
        return response.json();
      });
  }
}
