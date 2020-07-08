import {HttpClient} from "aurelia-fetch-client";
import {inject} from "aurelia-dependency-injection";
import {MarketdataService} from "../../service/marketdata-service";
import {Router} from "aurelia-router";

@inject(HttpClient, MarketdataService, Router)
export class DetailedView {
  baseUrl = 'api/generic/v1/entities/MarketdataModel';

  constructor(httpClient, marketdataService, router) {
    this.httpClient = httpClient;
    this.marketdataService = marketdataService;
    this.router = router;
  }

  activate(params) {
    console.log(params.id);
    this.company = params.id;
  }

  bind() {
    let client = new HttpClient();

    return client.fetch('data.json')
      .then(response => response.json())
      .then(companies => this.companies = companies);
  }
}
