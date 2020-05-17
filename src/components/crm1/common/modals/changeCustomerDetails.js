import {inject} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import { HttpClient } from 'aurelia-fetch-client';
import {EntityUpdateService} from '../../services/entityUpdateService';

@inject(EventAggregator, HttpClient, Router, EntityUpdateService)
export class ChangeCustomerDetails {
  constructor(ea, http, router, entityUpdateService) {
    this.http = http;
    this.ea = ea;
    this.entityUpdateService = entityUpdateService;

    ea.subscribe('contactChosen', payload => {
      this.chosenContact = payload;
      this.firstName = this.chosenContact.firstName;
      this.lastName = this.chosenContact.lastName;
      this.companyName = this.chosenContact.companyName;
      this.email = this.chosenContact.email;
      this.phoneNumber = this.chosenContact.phoneNumber;
      this.positionType = this.chosenContact.position;
      this.partyId = this.chosenContact.partyId;
    });
  }

  async updatePerson(firstName, lastName) {
    let response = await this.entityUpdateService.updatePerson(firstName, lastName, this.partyId);
    if(response.responseMessage === 'success') {
      this.ea.publish('updateContact', {
        firstName,
        lastName,
        "partyId": this.partyId
      })
    }
  }
}

