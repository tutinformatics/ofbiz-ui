import {inject} from 'aurelia-dependency-injection';
import {HttpClient} from 'aurelia-fetch-client';
import {MarketdataService} from './marketdata-service';

@inject(HttpClient, MarketdataService)
export class Marketdata {
  baseUrl = 'api/generic/v1/entities/MarketdataModel';
  companies = [];
  test = null;
  pageSize = 5;
  statuses = ['Registrisse kantud', 'Pole registris', 'Teadmata'];
  selectedStatuses = [];
  sectors = ['AdTech & Creative Tech', 'Advanced Manufacturing', 'Business software', 'CleanTech'];
  selectedSectors = [];
  models = ['B2B', 'B2B2C', 'B2C', 'B2G'];
  selectedModels = [];
  selectedCompanies = [];
  filters = [
    {
      value: '',
      keys: ['companyName', 'registryCode', 'companyStatus', 'companyAddress', 'companyBusinessModel', 'companySector', 'employeeCount', 'contactEmail']
    },
    {value: this.selectedStatuses, keys: ['companyStatus']}
  ];

  constructor(httpClient, marketdataService) {
    this.httpClient = httpClient;
    this.marketdataService = marketdataService;
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

  async attached() {
    this.data = await this.marketdataService.getMarketdataCompanies();
  }

  handleClick(company, $event) {
    this.selectedCompanyName = company.companyName;
    this.selectedRegistryCode = company.registryCode;
    this.selectedCompanyStatus = company.companyStatus;
    this.selectedCompanyAddress = company.companyAddress;
    this.selectedCompanyBusinessModel = company.companyBusinessModel;
    this.selectedCompanySector = company.companySector;
    this.selectedCompanyEmployeeCount = company.employeeCount;
    this.selectedCompanyContactEmail = company.contactEmail;
    this.rowSelected($event);
  }

  rowSelected(event) {
    console.log($event.detail.row);
  }

  submitData() {
    let company = {
      companyName: this.companyName,
      registryCode: this.registryCode,
      companyStatus: this.companyStatus,
      companyAddress: this.companyAddress,
      companyBusinessModel: this.companyBusinessModel,
      companySector: this.companySector,
      employeeNum: this.employeeCount,
      contactEmail: this.contactEmail
    };

    this.companies.unshift(company);
  }
}
