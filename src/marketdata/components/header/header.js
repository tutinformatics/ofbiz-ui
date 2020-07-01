import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {MarketdataService} from '../../service/marketdata-service.js';
import {HttpClient} from 'aurelia-fetch-client';

@inject(EventAggregator, MarketdataService)
export class Header {
  baseUrl = 'api/generic/v1/entities/MarketdataModel';
  companies = [];
  test = null;

  constructor(httpClient, marketdataService, navigationService) {
    this.httpClient = httpClient;
    this.marketdataService = marketdataService;
  }

  bind() {
    let client = new HttpClient();

    return client.fetch('data.json')
      .then(response => response.json())
      .then(companies => this.companies = companies);
  }

  async attached() {
    this.data = await this.marketdataService.getMarketdataCompanies();
  }

  submitData() {
    let company = {
      companyName: this.companyName,
      registryCode: this.registryCode,
      companyStatus: this.companyStatus,
      companyAddress: this.companyAddress,
      city: this.city,
      companyBusinessModel: this.companyBusinessModel,
      companySector: this.companySector,
      employeeNum: this.employeeCount,
      contactEmail: this.contactEmail
    };

    this.companies.unshift(company);
  }
}
