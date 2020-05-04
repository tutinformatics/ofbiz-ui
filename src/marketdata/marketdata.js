import {inject} from 'aurelia-dependency-injection';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class Marketdata {
  baseUrl = 'api/generic/v1/entities/MarketdataModel';
  companies = [];
  test = null;
  pageSize = 10;
  filters = [
    {value: '', keys: ['companyName', 'registryCode', 'companyStatus', 'companyAddress']}
  ];

  constructor(httpClient) {
    this.httpClient = httpClient;
  }

  bind() {
    console.log('Getting data ...');
    return this.httpClient
      .fetch(`${this.baseUrl}`)
      .then(res => res.json())
      .then(companies => this.companies = companies)
      .catch(error => {
        console.error(error);
      });
  }

  submitData() {
    let company = {
      companyName: this.companyName,
      registryCode: this.registryCode,
      companyStatus: this.companyStatus,
      companyAddress: this.companyAddress,
      city: this.city
    };

    this.companies.unshift(company);
  }
}
