import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class OpportunitiesService {
  constructor() {
    this.client = new HttpClient;
    const baseUrl = 'http://localhost:7463/api/';

    this.client.configure(config => {
      config.withBaseUrl(baseUrl);
    })
  }

  async getOpportunities() {
    try {
      const response = await this.client.fetch('opportunities');
      return response.json();
    } catch (e) {
      console.log("getOpportunities:", e);
    }
  }
}

