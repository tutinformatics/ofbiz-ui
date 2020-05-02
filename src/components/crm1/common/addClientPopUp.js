import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {inject} from 'aurelia-dependency-injection';
import {json} from 'aurelia-fetch-client';

@inject(EventAggregator, HttpClientCRM)
export class AddClientPopUp {

  constructor(ea, http) {
    this.ea = ea;
    this.http = http.http;
    ea.subscribe("party", payload => {
      this.parties = payload
    })
  }

  async addContact(contact) {
    let response = await this.http.fetch('/services/createContact', {
      method: 'post',
      body: json({
        "firstName": contact.firstName,
        "lastName": contact.lastName,
        "emailAddress": contact.email,
        "phoneNumber": contact.phoneNumber,
        "address": contact.address,
        "postalCode": contact.postalCode,
        "login.username": "admin",
        "login.password": "ofbiz"
      })
    })
      .then(response => response.json())
      .catch(() => {
        alert('Error fetching clients!');
      });
  }
}



