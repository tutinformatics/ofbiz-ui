import {EventAggregator} from 'aurelia-event-aggregator';
import { HttpClient, json } from 'aurelia-fetch-client';
import {inject} from 'aurelia-dependency-injection';
import {Router} from 'aurelia-router';
import {EntityQueryService} from '../services/entityQueryService';

@inject(EventAggregator, HttpClient, Router, EntityQueryService)

export class Clients {
  constructor(ea, http, router, entityQueryService) {
    this.ea = ea;
    this.http = http;
    this.router = router;
    this.contacts = [];
    this.filteredContacts = [];
    this.parties = [];
    this.baseUrl = '/api/generic/v1/';
    this.entityQueryService = entityQueryService;

    this.ea.subscribe('updateContact', payload => {
      for (let i = 0; i < this.contacts.length; i++) {
        if (this.contacts[i].partyId === payload.partyId) {
          this.contacts[i].firstName = payload.firstName;
          this.contacts[i].lastName = payload.lastName;
        }
      }
    });

    ea.subscribe('partyIds', payload => {
      this.contacts = payload;
      this.filteredContacts = this.contacts;

      this.ea.publish('categoryCompany',
        this.contacts.map(contact => contact.companyName).filter(this.unique)
      );

      this.ea.publish('categoryPartiesIds',
        this.contacts.map(contact => contact.partyId).filter(this.unique)
      );

      this.ea.publish('categoryFirstNames',
        this.contacts.map(contact => contact.firstName).filter(this.unique)
      );

      this.ea.publish('categoryLastNames',
        this.contacts.map(contact => contact.lastName).filter(this.unique)
      );
    });

    ea.subscribe('unfilteredCustomers', payload => {
      this.filteredContacts = this.contacts;
    });

    ea.subscribe('filterByParty', (party) => {
      this.filteredContacts = this.contacts.filter(
        contact => contact.partyId === party
      );
    });

    ea.subscribe('filterByCompany', (company) => {
      this.filteredContacts = this.contacts.filter(
        contact => contact.companyName === company
      );
    });
    ea.subscribe('filterByName', (name) => {
      this.filteredContacts = this.contacts.filter(
        contact => (contact.firstName === name) ||  (contact.lastName === name)
      );
    });
  }

  async attached() {
    await this.getAllParties();
  }

  unique(value, index, self) {
    return self.indexOf(value) === index;
  }


  chooseContact(contact) {
    this.ea.publish('contactChosen', contact);
    this.ea.publish('changeAction', 'refresh');
    this.ea.publish('displayClient', true);
  }

  async getAllParties() {
    let response = await this.entityQueryService.getAllParties();
    this.ea.publish('party', response);
  }
}
