import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {inject} from 'aurelia-dependency-injection';
import {Contact} from '../models/contact';
import {Router} from 'aurelia-router';

@inject(EventAggregator, HttpClientCRM, Router)
export class ClientsView {
  constructor(ea, http, router) {
    this.ea = ea;
    this.http = http.http;
    this.router = router;
    this.contacts = [];
  }

  async attached() {
    await this.getAllContacts()
  }

  async getAllContacts() {
    let response = await this.http.createRequest('contact')
      .asGet()
      .send()
      .then(response => {
          let resJson = JSON.parse(response.response);
          for (let i = 0; i < 6; i++) {
            let contact = new Contact(
              resJson[i].firstName,
              resJson[i].lastName,
              resJson[i].emailAddress,
              resJson[i].phoneNumber,
              resJson[i].companyName,
              resJson[i].roleTypeId,
              resJson[i].address,
              resJson[i].postalCode,
              resJson[i].partyId);
            this.contacts.push(contact)
          }
        }
      );
  }

  getClientInformation(contact) {
    this.router.navigateToRoute('customerInfoPage', {id: contact.partyId})
  }

  async addContact(contact) {
    if (contact != null) {
      let response = await this.http.createRequest('contact')
        .asPost()
        .withContent(JSON.stringify(contact))
        .send()
        .then(response => console.log(response))
        .catch(error => console.log(error));
    }
    console.log(contact)
  }
}

