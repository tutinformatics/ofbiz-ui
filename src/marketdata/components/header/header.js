import {HttpClient} from "aurelia-fetch-client";
import {MarketdataService} from '../../service/marketdata-service';

export class header {
  filters = [
    {
      value: '',
      keys: ['companyName', 'registryCode', 'companyStatus', 'companyAddress', 'companyBusinessModel', 'companySector', 'employeeCount', 'contactEmail']
    },
  ];

  constructor(httpClient, marketdataService) {
    this.httpClient = httpClient;
    this.marketdataService = marketdataService;
  }

}
