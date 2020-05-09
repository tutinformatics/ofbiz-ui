import { inject } from 'aurelia-dependency-injection';
import { HttpClient, json } from 'aurelia-fetch-client';
import {SearchUtils} from "../../../commons/util/search-utils";

@inject(HttpClient)
export class ResourceEntities {
  baseUrl = 'api/generic/v1';

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  createResource(resource) {
    const body = json(resource);

    return this.httpClient
      .fetch(`${this.baseUrl}/entities/PartyRoleAndPartyDetail`, {
        method: 'post',
        body: body
      })
      .then((response) => {
        if (!response.ok) {
          // TODO: improve error handling
          throw new Error('An error occured while creating resource');
        }
        return response.json();
      });
  }

  getResourceList(params) {

    return this.httpClient
      .fetch(`${this.baseUrl}/entities/PartyRoleAndPartyDetail?roleTypeId=PROJECT_TEAM`)
      .then((response) => {
        if (!response.ok) {
          // TODO: improve error handling
          throw new Error('An error occured while fetching resources');
        }
        return response.json();
      });
  }
}
