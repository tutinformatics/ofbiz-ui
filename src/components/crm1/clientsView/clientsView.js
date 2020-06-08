import {EventAggregator} from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';
import {inject} from 'aurelia-dependency-injection';
import {Contact} from '../models/contact';
import {Router} from 'aurelia-router';
import {collectClients} from '../utils/collectClients';
import {computedFrom} from 'aurelia-framework';
import {EntityQueryService} from '../services/entityQueryService';

@inject(EventAggregator, HttpClient, Router, EntityQueryService)
export class ClientsView {
  constructor(ea, http, router, entityQueryService) {
    this.ea = ea;
    this.http = http;
    this.router = router;
    this.entityQueryService = entityQueryService;

    this.contacts = [];
    this.simpleView = true;
    this.view = 'Card View';
    this.categories = [
      {
        'phone': 'Phone',
        'mail': 'Email'
      }
    ];

    this.searchArgument = '';
    this.searchFirstName = true;
    this.searchLastName = true;
    this.searchEmail = true;
    this.searchPhoneNumber = true;
    this.searchCompany = true;
    this.selectedPhone = ['Phone'];
    this.selectedEmail = ['Email'];

    this.ea.subscribe('addClient', payload => {
      this.contacts.push(payload);
    });
  }

  async attached() {
    await this.getAllContacts();
    await this.getAllParties();
  }

  async getAllParties() {
    let response = await this.entityQueryService.getAllParties();
    this.ea.publish('party', response);
  }

  async getAllContacts() {
    let response = await this.entityQueryService.getAllContacts();

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
    this.ea.publish('currentClient', contact);
  }

  @computedFrom('searchArgument')
  get searchArg() {
    return this.searchArgument.trim().toUpperCase();
  }
  @computedFrom('searchArg', 'contacts', 'searchFirstName', 'searchLastName', 'searchEmail', 'searchPhoneNumber', 'searchCompany')
  get filteredContacts() {
    if (this.searchArg === '' || (!this.searchFirstName && !this.searchLastName && !this.searchEmail && !this.searchPhoneNumber && !this.searchCompany)) {
      return this.contacts;
    }
    return this.contacts.filter(
      contact =>
        (this.searchFirstName && contact.firstName && contact.firstName.toUpperCase().startsWith(this.searchArg)) ||
        (this.searchLastName && contact.lastName && contact.lastName.toUpperCase().startsWith(this.searchArg)) ||
        (this.searchEmail && contact.email && contact.email.toUpperCase().startsWith(this.searchArg)) ||
        (this.searchPhoneNumber && contact.phoneNumber && contact.phoneNumber.replace('-', '').startsWith(this.searchArg.replace('-', ''))) ||
        (this.searchCompany && contact.companyName && contact.companyName.toUpperCase().split(' ')
          .map( el => el.startsWith(this.searchArg)).indexOf(true) > -1));
  }

  cardView() {
    this.view = 'Card view';
    this.simpleView = true;
  }
  tableView() {
    this.view = 'Table View';
    this.simpleView = false;
  }
  get isPhone() {
    if (this.selectedPhone.length > 0) {
      return (this.selectedPhone);
    }
    return false;
  }
  get isEmail() {
    if (this.selectedEmail.length > 0) {
      return (this.selectedEmail);
    }
    return false;
  }
}

