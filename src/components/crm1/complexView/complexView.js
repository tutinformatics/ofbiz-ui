import {Contact} from '../models/contact';
import {Router} from 'aurelia-router';
import { HttpClient, json } from 'aurelia-fetch-client';

import {inject} from 'aurelia-dependency-injection';
import {EventAggregator} from 'aurelia-event-aggregator';
import {collectClients} from '../utils/collectClients';
import {EntityQueryService} from '../services/entityQueryService';


@inject(EventAggregator, HttpClient, Router, EntityQueryService)
export class ComplexView {
  constructor(ea, http, router, entityQueryService) {
    this.ea = ea;
    this.http = http;
    this.router = router;
    this.contacts = [];
    this.view = 'Card View';
    this.displayActivity = false;
    this.displayClient = false;
    this.entityQueryService = entityQueryService;
  }

  async attached() {
    await this.getAllContacts();
  }

  async getAllContacts() {
    let response = await this.entityQueryService.getAllContacts();
    for (let i = 0; i < response.length; i++) {
      if (
        response[i].roleTypeId !== '_NA_' &&
        response[i].firstName != null &&
        response[i].firstName.length > 2 &&
        response[i].lastName != null &&
        response[i].lastName.length > 2
      ) {
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
    }
    this.ea.publish('partyIds', collectClients(this.contacts));
  }
}
