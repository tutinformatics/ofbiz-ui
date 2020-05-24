import {inject} from 'aurelia-dependency-injection';
import { HttpClient, json } from 'aurelia-fetch-client';

@inject(HttpClient)
export class ProjectService {
  // baseUrl = 'https://localhost:8443/api/marketdata';
  baseUrl = 'api/generic/v1';

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getProjectList() {
    return this.httpClient
      .fetch(this.baseUrl)
      .then(res => res.json())
      .then(res => res.projectList)
      .catch(error => {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error);
      }); // TODO: improve error handling
  }

  createProject(project) {
    const body = json(project);
    return this.httpClient
      .fetch(`${this.baseUrl}/new-project`, {
        method: 'post',
        body: body
      })
      .catch(error => {
        /* eslint no-console: ["error", { allow: ["error"] }] */
        console.error(error);
      }); // TODO: improve error handling
  }

  async getMarketdataCompanies() {
    try {
      return await this.httpClient.fetch(`${this.baseUrl}/services/getMarketdataCompanies`,
        {
          method: 'POST',
          body: JSON.stringify(
            console.log(this.state)
     //       {'registryCode': this.state.}
          )
        }
      );
    } catch (e) {
      return null;
    }
  }
}
