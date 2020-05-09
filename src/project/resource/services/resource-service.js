import { inject } from 'aurelia-dependency-injection';
import { HttpClient, json } from 'aurelia-fetch-client';
import {SearchUtils} from "../../../commons/util/search-utils";
import { safeGet } from '../../../commons/util/utility';

@inject(HttpClient)
export class ResourceService {
  baseUrl = 'api/generic/v1';

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getRolesList(params) {
    const query = SearchUtils.appendQueryParams(params);

    return this.httpClient
      .fetch(`${this.baseUrl}/entities/RoleType?${query}`, {
        method: 'get'
      })
      .then((res) => res.json())
      .catch((error) => {
        console.error(error);
      }); // TODO: improve error handling

  }

  getResourceList(params) {
    const query = SearchUtils.appendQueryParams(params);

    return this.httpClient
      .fetch(`${this.baseUrl}/entities/PartyRoleAndPartyDetail?${query}`, {
        method: 'get'
      })
      .then((res) => res.json())
      .then((res) => {
        return safeGet(() => res, []).map((resource) => {
          (resource.name = `${resource.firstName} ${resource.lastName}`);
          return resource;
        });
      })
      .catch((error) => {
        console.error(error);
      }); // TODO: improve error handling
  }
}
