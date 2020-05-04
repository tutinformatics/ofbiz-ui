import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class OpportunityService {
  baseUrl = 'http://35.228.129.189/api/generic/v1/';

  constructor(httpClient) {
    this.client = httpClient;
  }

  getOpportunities() {
    return this.client
      .fetch(`${this.baseUrl}entities/opportunity`)
      .then(response => response.json())
      .catch(reason => {
        console.error(reason);
        return [];
      });
  }

  getOpportunitiesByStage(stage) {
    return this.client
      .fetch(`${this.baseUrl}entities/opportunity/?stage=` + stage)
      .then(response => response.json())
      .catch(reason => {
        console.error(reason);
        return [];
      });
  }

  // getOpportunity(id) {
  //   return this.client
  //     .fetch('opportunities')
  //     .then(response => response.json())
  //     .catch(reason => {
  //       console.error(reason);
  //       return [];
  //     });
  // }

  createNewOpportunity(opportunity) {
    this.client
      .fetch(`${this.baseUrl}entities/opportunity`, {
        method: 'post',
        body: json(opportunity)
      })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(reason => {
        // do something useful here
        console.error(reason);
      });
  }
}

