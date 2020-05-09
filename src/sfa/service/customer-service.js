import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import {AureliaCookie} from "aurelia-cookie";

@inject(HttpClient)
export class CustomerService {
  baseUrl = 'https://82.131.87.143:8443/api/generic/v1/';

  constructor(httpClient) {
    this.client = httpClient;
  }

  getCustomers() {
    return this.client
      .fetch(`${this.baseUrl}entities/customer`)
      .then(response => response.json())
      .catch(reason => {
        console.error(reason);
        return [];
      });
  }

  getCustomer(id) {
    return this.client
      .fetch(`${this.baseUrl}entities/customer`)
      .then(response => response.json())
  }
}

