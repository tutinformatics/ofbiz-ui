import {inject} from 'aurelia-dependency-injection';
import {HttpClient} from 'aurelia-fetch-client';
import { autoinject } from 'aurelia-framework';
import { Router } from 'aurelia-router';
import {MarketdataService} from '../../service/marketdata-service';

@autoinject
@inject(HttpClient, MarketdataService, Router)
export class Listview {
  baseUrl = 'api/generic/v1/entities/MarketdataModel';
  pageSize = 5;
  companies = [];

  constructor(httpClient, marketdataService, router) {
    this.httpClient = httpClient;
    this.marketdataService = marketdataService;
    this.router = router;
  }

  bind() {
    let client = new HttpClient();

    return client.fetch('data.json')
      .then(response => response.json())
      .then(companies => this.companies = companies);
  }

  onSelectCompany(onClick, company) {
    this.router.navigateToRoute('Detailed-view', {id: company.companyName});
  }
}
