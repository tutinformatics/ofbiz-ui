import {HttpClient} from 'aurelia-fetch-client';

export class Marketdata {
  users = [];
  companyName = '';
  companyCode = '';
  companyStatus = '';
  companyAddress = '';
  pageSize = 10;
  filters = [
    {value: '', keys: ['company', 'code', 'active', 'address']}
  ];

  bind() {
    let client = new HttpClient();

    return client.fetch('data.json')
      .then(response => response.json())
      .then(users => this.users = users);
  }

  submitData() {
    let company = {
      company: this.company,
      code: this.code,
      active: this.active,
      address: this.address
    };

    this.users.unshift(company);

    // ToDO: Make POST HTTP request when back is ready
  }
}
