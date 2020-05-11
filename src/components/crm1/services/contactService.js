import {HttpClient, json} from "aurelia-fetch-client";
import {inject} from 'aurelia-dependency-injection';

@inject(HttpClient)
export class ClientService {
  baseUrl = 'api/generic/v1';

  constructor(httpClient) {
    this.httpClient = httpClient;
    this.body = json({
      "inputFields":
        {
          "roleTypeId": "ACCOUNT"
        },
      "fieldList": [
        "partyId",
        "roleTypeId",
        "groupName"
      ]
    })
  }

  getContacts() {
    return this.httpClient
      .fetch(`/entityquery/PartyRoleAndPartyDetail`, {
        method: 'post',
        body: this.body
      })
      .catch((error) => {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error);
      }); // TODO: improve error handling
  }
}
