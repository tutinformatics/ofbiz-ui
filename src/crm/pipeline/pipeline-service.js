import { HttpClient } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class PipelineService {
  constructor() {
    this.client = new HttpClient;
    const baseUrl = 'http://localhost:7463/api/';

    this.client.configure(config => {
      config.withBaseUrl(baseUrl);
    })
  }

  async getNewOpportunities() {
    try {
      const response = await this.client.fetch('opportunity/1/new');
      return response.json();
    } catch (e) {
      console.log("getagents:", e);
    }
  }

  async getPropositionOpportunities() {
    try {
      const response = await this.client.fetch('opportunity/1/proposition');
      return response.json();
    } catch (e) {
      console.log("getagents:", e);
    }
  }

  async getWonOpportunities() {
    try {
      const response = await this.client.fetch('opportunity/1/won');
      return response.json();
    } catch (e) {
      console.log("getagents:", e);
    }
  }
}

