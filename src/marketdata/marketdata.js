import {HttpClient} from 'aurelia-fetch-client';

export class Marketdata {
  companies = [];
  pageSize = 10;
  filters = [
    {value: '', keys: ['company', 'code', 'active', 'address']}
  ];

  bind() {
    let client = new HttpClient();

    return client.fetch('data.json')
      .then(response => response.json())
      .then(companies => this.companies = companies);
  }

  submitData() {
    let company = {
      company: this.company,
      code: this.code,
      active: this.active,
      address: this.address,
      city: this.city
    };

    this.companies.unshift(company);
  }
}
