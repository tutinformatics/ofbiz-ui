import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class PipelineService {
  constructor() {
    this.client = new HttpClient;
    const baseUrl = '/api/generic/v1/';

    this.client.configure(config => {
      config
        .withBaseUrl(baseUrl)
    });
  }

  getOpportunitiesByStage(stage) {
    return this.client
      .fetch('entities/opportunity/?stage=' + stage)
      .then(response => response.json())
      .catch(reason => {
        console.error(reason);
        return [];
      });
  }

  // getNewOpportunities() {
  //   return this.client
  //     .fetch('entities/opportunity/?stage=new')
  //     .then(response => response.json())
  //     .catch(reason => {
  //       console.error(reason);
  //       return [];
  //     });
  // }

  // getPropositionOpportunities() {
  //   return this.client
  //     .fetch('entities/opportunity/1/proposition')
  //     .then(response => response.json())
  //     .catch(reason => {
  //       console.error(reason);
  //       return [];
  //     });
  // }

  // getWonOpportunities() {
  //   return this.client
  //     .fetch('entities/opportunity/1/won')
  //     .then(response => response.json())
  //     .catch(reason => {
  //       console.error(reason);
  //       return [];
  //     });
  // }
}

