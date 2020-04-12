import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {inject} from 'aurelia-dependency-injection';
import {Person} from '../models/person';

@inject(EventAggregator, HttpClientCRM)
export class ClientsView {
  constructor(ea, http) {
    this.ea = ea;
    this.http = http.http;
    this.contacts = []
  }

  attached() {
    this.getAllContacts()
  }

  async getAllContacts() {
    let response = await this.http.createRequest('contact')
      .asGet()
      .send()
      .then(response => {
          let resJson = JSON.parse(response.response);
          for (let i = 0; i < resJson.length; i++) {
            let person = new Person(
              resJson[i].firstName,
              resJson[i].lastName,
              resJson[i].emailAddress,
              resJson[i].phoneNumber,
              resJson[i].companyName,
              resJson[i].roleTypeId,
              resJson[i].address2,
              resJson[i].postalCode);
            this.contacts.push(person)
          }
        }
      );
  }
}

