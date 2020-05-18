import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import {AureliaCookie} from "aurelia-cookie";

@inject(HttpClient)
export class ContactService {
  baseUrl = 'api/generic/v1/';

  constructor(httpClient) {
    this.client = httpClient;
  }

  getContacts() {
    return this.client
      .fetch(`${this.baseUrl}entities/Person`)
      .then(response => response.json())
      .catch(reason => {
        console.error(reason);
        return [];
      });
  }

  getContact(id) {
    return this.client
      .fetch(`${this.baseUrl}entities/contact`)
        .then(response => response.json())
     }
}

