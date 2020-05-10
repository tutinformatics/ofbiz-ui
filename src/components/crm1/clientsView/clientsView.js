import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {json} from 'aurelia-fetch-client';

import {inject} from 'aurelia-dependency-injection';
import {Contact} from '../models/contact';
import {Router} from 'aurelia-router';
import {collectClients} from '../utils/collectClients'

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
  taskName = ''

  constructor(ea, http, router) {
    this.ea = ea;
    this.http = http.http;
    this.router = router;
    this.contacts = [];
    this.simpleView = true;
    this.view = "Card View";

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

    console.log(response)
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


  search(){
    if(this.taskName === ''){
      this.getAllContacts();
      this.contacts = []
    }
    for (let i = 0; i <= this.contacts.length; i++) {
        if(this.contacts[i].firstName.toLowerCase().indexOf(this.taskName.toLowerCase()) !== -1){
          let person = new Contact(
            this.contacts[i].firstName ,
            this.contacts[i].lastName,
            this.contacts[i].email,
            this.contacts[i].phoneNumber,
            this.contacts[i].companyName,
            this.contacts[i].position,
            this.contacts[i].companyAddress,
            this.contacts[i].postalCode,
            this.contacts[i].partyId
          );
          this.taskName = ''
          this.contacts = []
          this.contacts.push(person)
        }
    }
  }
}

