import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class PipelineService {
  baseUrl = '/api/generic/v1/';

  constructor(httpClient) {
    this.client = httpClient;
  }

  getOpportunitiesByStage(stage) {
    return this.client
      .fetch(`${this.baseUrl}/entities/opportunity/?stage=` + stage)
      .then(response => response.json())
      .catch(reason => {
        console.error(reason);
        return [];
      });
  }
}

