import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {inject} from 'aurelia-dependency-injection';
import {json} from 'aurelia-fetch-client';
import {Contact} from '../models/contact';
import * as toastr from 'toastr';
import {alertConfig} from '../config/alertConf'
import {readErrorMsg} from '../utils/alertHandling'
import $ from 'jquery';

@inject(EventAggregator, HttpClientCRM)
export class AddClientPopUp {

  constructor(ea, http) {
    this.ea = ea;
    this.http = http.http;
    ea.subscribe("party", payload => {
      console.log(payload)
      this.parties = payload
    });
  }

  async addContact(contact) {
    let contactId = await this.createContact(contact);
    if (contactId !== null && contact.partyIdGroupName.toLowerCase() !== "none") {
      let partyId = contact.partyIdGroupName.split(":")[0];
      let response = await this.createPartyContactRelationship(contactId, partyId);
    }
    if (contactId !== null)  {
      this.ea.publish("addClient", new Contact(
        contact.firstName,
        contact.lastName,
        contact.email,
        contact.phoneNumber,
        contact.partyIdGroupName.split(":")[1],
        contact.roleTypeId,
        contact.address,
        contact.city,
        contact.postalCode,
        contactId
        )
      );
      toastr.success("Client successfully saved!", "", alertConfig);
      return "success"
    }
    return "error"
  }

  async addContactAndClose(contact) {
    let response = await this.addContact(contact)
    if (response === "success") {
      $('#create-modal').modal('hide');
    }
  }

  async createContact(contact) {
    console.log(contact)
    let response = await this.http.fetch('/services/createContact', {
        method: 'post',
        body: json({
          "firstName": contact.firstName,
          "lastName": contact.lastName,
          "emailAddress": contact.email,
          "contactNumber": contact.phoneNumber,
          "address1": contact.address,
          "city": contact.city,
          "postalCode": contact.postalCode,
          "login.username": "admin",
          "login.password": "ofbiz"
        })
      })
      .then(response => response.json())

    if (response.responseMessage === "error") {
      let errMsg = readErrorMsg(response);
      toastr.error(errMsg, "", alertConfig);
      return null;
    }
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
    if (response.responseMessage === "error") {
      let errMsg = readErrorMsg(response);
      toastr.error(errMsg, "", alertConfig);
      return null;
    }
    return response
  }
}



