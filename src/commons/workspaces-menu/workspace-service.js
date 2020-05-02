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

  getAlreadyInMenu(url) {
    // for (var i = 0; i < this.stringArray.length; i++) {
    //   if(this.stringArray[i].links == url) {
    //     return true;
    //   }
    // }
    return false;
  }

  getWorkspaceList(params) {
    const query = SearchUtils.appendQueryParams(params);

    return this.httpClient
      .fetch(`${this.baseUrl}/Workspace?${query}`)
      .then((res) => res.json())
      .catch((error) => {
        /* eslint no-console: ["error", { allow: ["error"] }]*/
        console.error(error);
      }); // TODO: improve error handling
  }

  addWorkspace(workspace) {
    const body = json(workspace);
    return this.httpClient
      .fetch('api/v1/workspaces/new-workspace', {
        method: 'post',
        body: body
      })
      .catch((error) => {
        /* eslint no-console: ["error", { allow: ["error"] }]*/
        console.error(error);
      }); // TODO: improve error handling
  }

  removeWorkspace(workspace) {
    /*const body = json(workspace);
    return this.httpClient
      .fetch(`${this.baseUrl}/remove-workspace`, {
        method: 'post',
        body: body
      })
      .catch(error => {
      /* eslint no-console: ["error", { allow: ["error"] }]
        console.error(error);
      }); // TODO: improve error handling*/
  }
}
