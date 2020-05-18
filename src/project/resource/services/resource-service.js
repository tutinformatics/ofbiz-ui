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

  getFilteredResource(name, type, value) {
    const data = {
    "roleTypeId_fld0_op": 'equals',
    };
    data["roleTypeId_fld0_value"] = 'PROJECT_TEAM';
    data[name + '_fld1_op'] = type;
    data[name + '_fld1_value'] = value;
    console.log(data);

    return this.httpClient
      .fetch(`${this.baseUrl}/services/performFindList`, {
        method: 'post',
        body: json({
          "entityName": "PartyRoleAndPartyDetail",
          "noConditionFind": "Y",
          "inputFields": data
        })
      })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        return safeGet(() => res.list, []).map((resource) => {
          (resource.name = `${resource.firstName} ${resource.lastName}`);
          return resource;
        });
      })
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
