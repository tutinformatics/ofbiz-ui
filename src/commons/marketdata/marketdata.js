import {HttpClient} from 'aurelia-fetch-client';

export class Marketdata {
  users = [];

  bind() {
    let client = new HttpClient();

    return client.fetch('data.json')
      .then(response => response.json())
      .then(users => this.users = users);
  }

  rowSelected($event) {
    console.log($event.detail.row);
  }
}
