import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class OpportunitiesService {
  constructor() {
    this.client = new HttpClient;
    const baseUrl = 'http://82.131.117.193:7463/api/';

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

  createNewOpportunity(opportunity) {
    this.client
      .fetch('opportunity', {
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

