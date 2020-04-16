import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class PipelineService {
  constructor() {
    this.client = new HttpClient;
    const baseUrl = 'http://localhost:7463/api/';

    this.client.configure(config => {
      config
        .withBaseUrl(baseUrl)
        .withDefaults({
          mode: 'cors',
          headers: {
            'Accept': 'application/json'
          }
        });
      // .withDefaults({
      //   credentials: 'cross-origin',
      //   headers: {
      //     'X-Requested-With': 'Fetch'
      //   }
      // });
    });

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

  async createNewOpportunity(opportunity) {
    try {
      const response = this.client
        .fetch('opportunity', {
          method: 'post',
          body: json(opportunity)
        });

      return response.json();
    } catch (e) {
      console.log("getagents:", e);
    }
  }
}

