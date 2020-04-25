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
    this.simpleView = true;
    this.view = "Card View"
  }

  async attached() {
    await this.getAllContacts()
  }

  async getAllContacts() {
    let response = await this.http.createRequest('Person')
      .asGet()
      .send()
      .then(response => {
        console.log('get all clients response')
          let resJson = JSON.parse(response.response);
          for (let i = 0; i < resJson.length; i++) {
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
    // if (contact != null) {
    //   let response = await this.http.createRequest('contact')
    //     .asPost()
    //     .withContent(JSON.stringify(contact))
    //     .send()
    //     .then(() => this.contacts.push(contact))
    //     .catch(error => console.log(error));
    // }
    console.log(contact)
    let person = new Contact(
      contact.firstName,
      contact.lastName,
      contact.email,
      contact.phoneNumber,
      contact.companyName,
      contact.position,
      contact.companyAddress,
      contact.postalCode,
      contact.partyId
    );

    this.contacts.push(person) // for testing
  }

  toggleView() {
    if (this.simpleView) {
      this.view = "Table View"
    } else {
      this.view = "Card view"
    }
    this.simpleView = !this.simpleView;
  }
}

