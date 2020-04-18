import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class OpportunitiesService {
  constructor() {
    this.client = new HttpClient;
    const baseUrl = '/api/';

    this.client.configure(config => {
      config.withBaseUrl(baseUrl);
    })
  }

  getOpportunities() {
    return this.client
      .fetch('opportunities')
      .then(response => response.json())
      .catch(reason => {
        console.error(reason);
        return [];
      });
  }

  getOpportunity(id) {
    return this.client
      .fetch('opportunities')
      .then(response => response.json())
      .catch(reason => {
        console.error(reason);
        return [];
      });
  }
}

