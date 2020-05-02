import { inject } from 'aurelia-dependency-injection';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class MenuItemsService {
  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  getMenuItems(product) {
    // TODO: will be replaced with actual API call?
    return this.httpClient
      .fetch('menu-items.json')
      .then(res => res.json())
      .then(res => res[product]);
  }
}
