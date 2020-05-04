import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class AgentService {
  baseUrl = 'https://sometotallyrandomapplicationonarandomurl.com:8443/api/generic/v1/';

  constructor(httpClient) {
    this.client = httpClient;
  }

  getAgents() {
    return this.client
      .fetch(`${this.baseUrl}entities/agent`)
      .then(response => response.json())
      .catch(reason => {
        console.error(reason);
        return [];
      });
  }

  createNewAgent(agent) {
    this.client
      .fetch(`${this.baseUrl}entities/agent`, {
        method: 'post',
        body: json(agent)
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(reason => {
        // do something useful here
        console.error(reason);
      });
  }
}

