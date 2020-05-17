import { inject } from 'aurelia-dependency-injection';
import { HttpClient, json } from 'aurelia-fetch-client';
import { SearchUtils } from '../util/search-utils';
import { AppRouter } from 'aurelia-router';
import { Store } from 'aurelia-store';
import { setWorkspaces } from '../../store/store';
import * as toastr from 'toastr';

@inject(HttpClient, AppRouter, Store)
export class WorkspaceService {
  baseUrl = 'api/generic/v1';

  constructor(httpClient, router, store) {
    this.httpClient = httpClient;
    this.router = router;
    this.store = store;
    this.store.registerAction('setWorkspaces', setWorkspaces);
    this.subscription = this.store.state.subscribe((state) => {
      this.userLoginId = state.userLoginId;
      this.workspaces = state.workspaces;
    });
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
      })
      .then((response) => {
        const workspaces = response
          .sort((a, b) => a.workspaceId - b.workspaceId)
          .reverse(); // TODO: should be sorted in BE
        this.store.dispatch('setWorkspaces', workspaces);
      })
      .catch((error) => toastr.error(error.message));
  }

  addWorkspace() {
    const url = this.router.currentInstruction.fragment;
    const title = document.title.split('|')[0].trim(); // router cannot access titles of child routes

    if (!url || this.workspaces.some(x => x.url === url)) {
      return;
    }

    const body = json({
      title: title,
      url: url,
      userId: this.userLoginId
    });

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
      })
      .then(() => {
        toastr.success('Workspace successfully saved!');
        this.getWorkspaceList({ userId: this.userLoginId });
      })
      .catch((error) => toastr.error(error.message));
  }

  unbind() {
    this.subscription.unsubscribe();
  }
}
