import { inject } from 'aurelia-dependency-injection';
import { HttpClient, json } from 'aurelia-fetch-client';
import { SearchUtils } from '../util/search-utils';

@inject(HttpClient)
export class WorkspaceService {
  baseUrl = 'api/generic/v1';

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getWorkspaceList(params) {
    const query = SearchUtils.appendQueryParams(params);

    return this.httpClient
      .fetch(`${this.baseUrl}/entities/Workspace?${query}`)
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
      .fetch(`${this.baseUrl}/services/createWorkspaceByJavaService`, {
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
