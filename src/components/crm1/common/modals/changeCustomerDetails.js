import {inject} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import { HttpClient, json } from 'aurelia-fetch-client';
import {readErrorMsg} from '../../utils/alertHandling';
import * as toastr from 'toastr';
import {alertConfig} from '../../config/alertConf';
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
      this.positionType = this.chosenContact.position;
      this.partyId = this.chosenContact.partyId;
    });
  }

  async updatePerson(firstName, lastName) {
    let response = this.entityUpdateService.updatePerson(firstName, lastName, this.partyId)
  }
}

