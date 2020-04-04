import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';

@inject(HttpClient)
export class AgentService {
  constructor() {
    this.client = new HttpClient;

    const baseUrl = 'http://localhost:7463/api/';

    this.client.configure(config => {
      config.withBaseUrl(baseUrl);
    })
  }

  async getAgents() {
    try {
      const response = await this.client.fetch('agents');
      return response.json();
    } catch (e) {
      console.log("getagents:", e);
    }
  }
}

