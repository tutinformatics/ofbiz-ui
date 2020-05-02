import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {json} from 'aurelia-fetch-client';

import {inject} from 'aurelia-dependency-injection';
import {Contact} from '../models/contact';
import {Router} from 'aurelia-router';

@inject(EventAggregator, HttpClientCRM, Router)

export class Clients {
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
    console.log('here');
    // await this.login();
    let response = await this.http.fetch('/entityquery/PartyExport', {
      method: 'post',
      body: json({
        "fieldList": [
          "lastName",
          "firstName",
          "emailAddress",
          "phoneNumber",
          "companyName",
          "roleTypeId",
          "address",
          "postalCode",
          "partyId"
        ]
      })
    })
      .then(response => response.json())
      .catch(() => {
        alert('Error fetching clients!');
      });

    for (let i = 0; i < response.length; i++) {
      let contact = new Contact(
        response[i].firstName,
        response[i].lastName,
        response[i].emailAddress,
        response[i].phoneNumber,
        response[i].companyName,
        response[i].roleTypeId,
        response[i].address,
        response[i].postalCode,
        response[i].partyId
      );
      this.contacts.push(contact);
    }
  }

  getClientInformation(contact) {
    this.router.navigateToRoute('customerInfoPage', {id: contact.partyId})
  }

  async addContact(contact) {
    let response = await this.http.fetch('/services/createContact', {
      method: 'post',
      body: json({
        "userLoginId": "admin",
        "firstName": contact.firstName,
        "lastName": contact.lastName,
        "emailAddress": contact.email,
        "contactNumber": contact.phoneNumber,
        "address1": contact.companyAddress,
        "city": contact.companyAddress,
        "postalCode": contact.postalCode,
      })
    })
      .then(response => response.json())
      .catch(() => {
        alert('Error fetching clients!');
      });
    console.log(response)
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
