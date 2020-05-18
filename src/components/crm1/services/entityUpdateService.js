import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import {Contact} from '../models/contact';
import * as toastr from 'toastr';
import {alertConfig} from '../config/alertConf';
import $ from 'jquery';
import {readErrorMsg} from '../utils/alertHandling';

@inject(HttpClient)
export class EntityUpdateService {
  constructor(httpClient) {
    this.http = httpClient;
    //this.baseUrl = 'https://35.228.134.15:8443/api/generic/v1/services/';
    this.baseUrl = '/api/generic/v1/services/';
  }

  async useService(service, body) {
    console.log(service)
    return await this.http.fetch(this.baseUrl + service, {
      method: 'post',
      body: body
      })
      .then(response => response.json())
  }

  async addContact(contact) {
    let contactId = await this.createContact(contact);

    if (contactId !== null && contact.companyName.toLowerCase() !== 'none') {
      let partyId = contact.companyName.split(':')[0];
      let response = await this.createPartyContactRelationship(contactId, partyId);
    }
    return contactId;
  }

  async createContact(contact) {
    let body = json({
      'firstName': contact.firstName,
      'lastName': contact.lastName,
      'emailAddress': contact.email,
      'contactNumber': contact.phoneNumber,
      'address1': contact.address,
      'city': contact.city,
      'postalCode': contact.postalCode,
      'login.username': 'admin',
      'login.password': 'ofbiz'
    });
    let response = await this.useService("createContact", body);
    if (response.responseMessage === 'error') {
      let errMsg = readErrorMsg(response);
      toastr.error(errMsg, '', alertConfig);
      return null;
    }
    return response.partyId;
  }

  async createPartyContactRelationship(contactId, partyId) {
    let body =  json({
      'accountPartyId': partyId,
      'contactPartyId': contactId,
      'login.username': 'admin',
      'login.password': 'ofbiz'
    });
    let response = await this.useService("createPartyRelationshipContactAccount", body);
    if (response.responseMessage === 'error') {
      let errMsg = readErrorMsg(response);
      toastr.error(errMsg, '', alertConfig);
      return null;
    }
    return response;
  }

  async updatePerson(firstName, lastName, partyId) {
    let body = json({
      'firstName': firstName,
      'lastName': lastName,
      'partyId': partyId,
      'login.username': 'admin',
      'login.password': 'ofbiz'
    });
    let response = await this.useService("updatePerson", body)
    if (response.responseMessage === 'error') {
      let errMsg = readErrorMsg(response);
      toastr.error(errMsg, '', alertConfig);
      return response;
    } else if(response.responseMessage === 'success') {
      toastr.success('Contact Successfully Updated', '', alertConfig);
      return response;
    }
  }
}

