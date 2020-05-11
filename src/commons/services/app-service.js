import { inject } from 'aurelia-dependency-injection';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class AppService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getApplications() {
    // TODO: will be replaced with actual API call?
    return this.httpClient
      .fetch('applications.json')
      .then(res => res.json());
  }
}
