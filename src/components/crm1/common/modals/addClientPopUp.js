import {EventAggregator} from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';
import {inject} from 'aurelia-dependency-injection';
import {Contact} from '../../models/contact';
import {EntityUpdateService} from '../../services/entityUpdateService'
import * as toastr from 'toastr';
import {alertConfig} from '../../config/alertConf';
import $ from 'jquery';

@inject(EventAggregator, HttpClient, EntityUpdateService)
export class AddClientPopUp {
  constructor(ea, http, entityUpdateService) {
    this.ea = ea;
    this.http = http;
    this.entityUpdateService = entityUpdateService;

    ea.subscribe('party', payload => {
      this.parties = payload;
    });
  }

  async addContact(contact) {
    let contactId = await this.entityUpdateService.addContact(contact);
    if (contactId !== null)  {
      this.ea.publish('addClient', new Contact(
        contact.firstName,
        contact.lastName,
        contact.email,
        contact.phoneNumber,
        contact.companyName.split(':')[1],
        contact.roleTypeId,
        contact.address,
        contact.city,
        contact.postalCode,
        contactId
      )
      );
      toastr.success('Client successfully saved!', '', alertConfig);
      return 'success';
    }
    return 'error';
  }

  async addContactAndClose(contact) {
    let response = await this.addContact(contact);
    if (response === 'success') {
      console.log(response)
      $('#create-modal').modal('hide');
    }
  }
}


