import {inject} from 'aurelia-dependency-injection';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(HttpClient)
export class WorkspaceService {
  stringArray = [
      { id: '1', name: 'My Workspace', styles: 'bg-1', favorite: true, links: ''},
      { id: '2', name: 'Workspace 1', styles: 'bg-3', favorite: true, links: ''},
      { id: '3', name: 'Workspace 2', styles: 'bg-2', favorite: true, links: ''},
      { id: '4', name: 'Space', styles: 'bg-3', favorite: true, links: ''},
      { id: '5', name: 'HMMMMMM', styles: 'bg-2', favorite: true, links: ''},
      { id: '6', name: 'Workspace 3', styles: 'bg-1', favorite: true, links: ''}
  ];

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getWorkspaceList() {
    /*return this.httpClient
      .fetch(`${this.baseUrl}/workspace-list`)
      .then(res => res.json())
      .then(res => res.projectList)
      .catch(error => {
      /* eslint no-console: ["error", { allow: ["error"] }]
        console.error(error);
      }); // TODO: improve error handling*/
  }

  addWorkspace(workspace) {
    /*const body = json(workspace);
    return this.httpClient
      .fetch(`${this.baseUrl}/new-workspace`, {
        method: 'post',
        body: body
      })
      .catch(error => {
      /* eslint no-console: ["error", { allow: ["error"] }]
        console.error(error);
      }); // TODO: improve error handling*/
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
      console.log(workspace);
  }

}
