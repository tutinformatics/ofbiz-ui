import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class AgentService {
  baseUrl = '/api/generic/v1/';

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
}

