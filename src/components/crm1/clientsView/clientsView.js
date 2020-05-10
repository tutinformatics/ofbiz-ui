import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {json} from 'aurelia-fetch-client';

import {inject} from 'aurelia-dependency-injection';
import {Contact} from '../models/contact';
import {Router} from 'aurelia-router';
import {collectClients} from '../utils/collectClients'
import {computedFrom} from 'aurelia-framework';

@inject(EventAggregator, HttpClientCRM, Router)
export class ClientsView {

  categories = [
    {
      "phone": 'Phone',
      "mail" : 'Email'
    }
  ]
  selectedPhone = [];
  selectedEmail = [];

  constructor(ea, http, router) {
    this.ea = ea;
    this.http = http.http;
    this.router = router;
    this.contacts = [];
    this.simpleView = true;
    this.view = "Card View";
    this.searchArgument = "";
    this.sortedContacts = []
    this.searchFirstName = true
    this.searchLastName = true
    this.searchEmail = true
    this.searchPhoneNumber = true

    this.ea.subscribe("addClient", payload => {
      this.contacts.push(payload);
    })
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
            "telContactNumber",
            "companyName",
            "roleTypeId",
            "address1",
            "city",
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
          response[i].telContactNumber,
          response[i].companyName,
          response[i].roleTypeId,
          response[i].address1,
          response[i].city,
          response[i].postalCode,
          response[i].partyId
        );
        this.contacts.push(contact);
    }
    this.contacts = collectClients(this.contacts);
  }

  getClientInformation(contact) {
    this.ea.publish("currentClient", contact)
  }


  cardView(){
    this.view = "Card view"
    this.simpleView = true;
  }
  tableView(){
    this.view = "Table View"
    this.simpleView = false;
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
  @computedFrom('searchArgument')
  get searchArg() {
    return this.searchArgument.trim().toUpperCase()
  }
  @computedFrom('searchArg','contacts','searchFirstName','searchLastName','searchEmail','searchPhoneNumber')
  get filteredContacts() {
    if (this.searchArg === "" || (!this.searchFirstName && !this.searchLastName && !this.searchEmail && !this.searchPhoneNumber)) {
      return this.contacts;
    }
    return this.contacts.filter(
      contact =>
        (this.searchFirstName && contact.firstName.toUpperCase().startsWith(this.searchArg)) ||
        (this.searchLastName && contact.lastName.toUpperCase().startsWith(this.searchArg)) ||
        (this.searchEmail && contact.email.toUpperCase().startsWith(this.searchArg)) ||
        (this.searchPhoneNumber && contact.phoneNumber != null && contact.phoneNumber.replace('-','').startsWith(this.searchArg.replace('-','')))
    )
  }
}

