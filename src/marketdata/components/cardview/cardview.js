import { inject } from 'aurelia-framework';
import {HttpClient} from 'aurelia-fetch-client';
import {MarketdataService} from '../../service/marketdata-service';

@inject(HttpClient, MarketdataService)
export class Cardview {
  baseUrl = 'api/generic/v1/entities/MarketdataModel';

  constructor(httpClient, marketdataService) {
    this.httpClient = httpClient;
    this.marketdataService = marketdataService;
  }

  bind() {
    let client = new HttpClient();

    return client.fetch('data.json')
      .then(response => response.json())
      .then(companies => this.companies = companies);
  }
}
