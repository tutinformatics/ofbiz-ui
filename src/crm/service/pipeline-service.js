import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class PipelineService {
  constructor() {
    this.client = new HttpClient;
    const baseUrl = 'http://82.131.117.193:7463/api/';

    this.client.configure(config => {
      config
        .withBaseUrl(baseUrl)
    });
  }

  getNewOpportunities() {
    return this.client
      .fetch('opportunity/1/new')
      .then(response => response.json())
      .catch(reason => {
        console.error(reason);
        return [];
      });
  }

  getPropositionOpportunities() {
    return this.client
      .fetch('opportunity/1/proposition')
      .then(response => response.json())
      .catch(reason => {
        console.error(reason);
        return [];
      });
  }

  getWonOpportunities() {
    return this.client
      .fetch('opportunity/1/won')
      .then(response => response.json())
      .catch(reason => {
        console.error(reason);
        return [];
      });
  }
}

