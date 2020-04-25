import {inject} from 'aurelia-dependency-injection';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(HttpClient)
export class WorkspaceService {
  stringArray = [
      { wsId: '1', name: 'My Workspace', styles: 'bg-1', favorite: true, links: ''},
      { wsId: '2', name: 'Workspace 1', styles: 'bg-3', favorite: true, links: ''},
      { wsId: '3', name: 'Workspace 2', styles: 'bg-2', favorite: true, links: ''},
      { wsId: '4', name: 'Space', styles: 'bg-3', favorite: true, links: ''},
      { wsId: '5', name: 'HMMMMMM', styles: 'bg-2', favorite: true, links: ''},
      { wsId: '6', name: 'Workspace 3', styles: 'bg-1', favorite: true, links: ''}
  ];
  lastNumber = 6;

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getAlreadyInMenu(url) {
    for (var i = 0; i < this.stringArray.length; i++) {
      if(this.stringArray[i].links == url) {
        return true;
      }
    }
    return false;
  }

  getWorkspaceList(userId) {
    /*return this.httpClient
      .fetch(`${this.baseUrl}/workspace-list`)
      .then(res => res.json())
      .then(res => res.projectList)
      .catch(error => {
      /* eslint no-console: ["error", { allow: ["error"] }]
        console.error(error);
      }); // TODO: improve error handling*/
      return this.stringArray;
  }

  addWorkspace(name, url) {
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

      var bg = 'bg-' + (Math.floor(Math.random() * 2) + 1);
      this.lastNumber = this.lastNumber + 1;
      var workspace = {wsId: this.lastNumber, name: name, styles: bg, favorite: true, links: url};
      this.stringArray.push(workspace);
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
      for (var i = 0; i < this.stringArray.length; i++) {
        if (this.stringArray[i].wsId == workspace) {
          this.stringArray.splice(i, 1);
        }
      }
      console.log(workspace + '<= removed with this id');
  }

}
