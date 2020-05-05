import {inject} from 'aurelia-dependency-injection';
import { HttpClient } from 'aurelia-fetch-client';

@inject(HttpClient)
export class Marketdata {
  baseUrl = 'api/generic/v1/entities/MarketdataModel';
  companies = [];
  test = null;
  pageSize = 10;
  statuses = ['Registrisse kantud', 'Pole registris', 'Teadmata'];
  selectedStatuses = [];
  sectors = ['AdTech & Creative Tech', 'Advanced Manufacturing', 'Business software', 'CleanTech'];
  selectedSectors = [];
  models = ['B2B', 'B2B2C', 'B2C', 'B2G'];
  selectedModels = [];
  filters = [
    {value: '', keys: ['companyName', 'registryCode', 'companyStatus', 'companyAddress']},
    {value: '', keys: ['companyStatus']}
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

  rowSelected($event){
    console.log($event.detail.row);
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

  filterStatuses() {
    this.eyeColors.push('');
    for (let next of this.companies) {
      let nextStatus = next.companyStatus;

      if (this.companyStatuses.indexOf(nextStatus) === -1) {
        this.companyStatuses.push(nextStatus);
      }
    }
  }
}
