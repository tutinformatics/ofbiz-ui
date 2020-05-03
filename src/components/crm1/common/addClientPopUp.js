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
    let contactId = await this.createContact(contact);
    if (contactId !== null && contact.partyIdGroupName.toLowerCase() !== "none") {
      let partyId = contact.partyIdGroupName.split(":")[0];
      let response = await this.createPartyContactRelationship(contactId, partyId);
    }
  }

  async createContact(contact) {
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
      .catch((error) => {
        alert(error);
      });
    if (response.responseMessage === "error") {
      alert('please check your data');
      return null;
    }
    console.log(response)
    return response.partyId;
  }

  async createPartyContactRelationship(contactId, partyId) {
    let response = await this.http.fetch('/services/createPartyRelationshipContactAccount', {
        method: 'post',
        body: json({
          "accountPartyId": partyId,
          "contactPartyId": contactId,
          "login.username": "admin",
          "login.password": "ofbiz"
        })
      })
      .then(response => response.json())
      .catch((error) => {
        alert(error);
      });
    return response
  }
}



