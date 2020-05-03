import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {json} from 'aurelia-fetch-client';

import {inject} from 'aurelia-dependency-injection';
import {Contact} from '../models/contact';
import {Router} from 'aurelia-router';
import {search} from '../search/search';

@inject(EventAggregator, HttpClientCRM, Router)
export class ClientsView {

  phone = [ 'Phone'];
  mail = [ 'Email'];

  selectedPhone = [];
  selectedEmail = [];
  taskName = ''



  constructor(ea, http, router) {
    this.ea = ea;
    this.http = http.http;
    this.router = router;
    this.contacts = [];
    this.simpleView = true;
    this.view = "Card View"
  }

  async attached() {
    await this.getAllContacts();
    await this.getAllParties();
  }

  async getAllParties() {
    let response = await this.http.fetch('/entityquery/PartyRoleAndPartyDetail', {
      method: 'post',
      body: json({
        "inputFields":
          {
            "roleTypeId": "ACCOUNT"
          },
        "fieldList": [
          "partyId",
          "roleTypeId",
          "groupName"
        ]
      })
    })
      .then(response => response.json())
      .catch(() => {
        alert('Error fetching clients!');
      });
    this.ea.publish("party", response)
  }

  async getAllContacts() {
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
  get isPhone() {
    if(this.selectedPhone.length>0){
      return (this.selectedPhone);
    }
   return false;
  }
  get isEmail() {
    if(this.selectedEmail.length>0){
      return (this.selectedEmail);
    }
    return false;
  }

  queries = [];

  doSearch(contacts) {
    this.queries.splice(0, 0, contacts);
  }

  search(){

    for (let i = 0; i < this.contacts.length; i++) {
        if(this.contacts[i].firstName.toLowerCase().indexOf(this.taskName.toLowerCase()) !== -1){
          this.taskName = "We have found " + " " + this.contacts[i].firstName + " " + this.contacts[i].lastName;
      }
    }



  }

}

