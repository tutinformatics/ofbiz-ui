import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class AgentService {
  constructor() {
    this.client = new HttpClient;

    const baseUrl = '/api/generic/v1/';

    this.client.configure(config => {
      config.withBaseUrl(baseUrl);
    })
  }

  getAgents() {
    return this.client
      .fetch('entities/agent')
      .then(response => response.json())
      .catch(reason => {
        console.error(reason);
        return [];
      });
  }
}

