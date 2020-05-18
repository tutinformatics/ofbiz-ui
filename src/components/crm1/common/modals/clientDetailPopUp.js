import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClient} from 'aurelia-fetch-client';
import {inject} from 'aurelia-dependency-injection';
import $ from 'jquery';
import {EntityUpdateService} from '../../services/entityUpdateService';

@inject(EventAggregator, HttpClient, EntityUpdateService)
export class ClientDetailPopUp {
  constructor(ea, http, entityUpdateService) {
    this.ea = ea;
    this.http = http;
    this.entityUpdateService = entityUpdateService;
    this.showSaveAndClose = false;
    this.canEdit = false;

    this.value = 'Edit';
    ea.subscribe('currentClient', payload => {
      this.contact = payload;
    });
  }

  openEdit(contact) {
    console.log(contact);
    if (this.value === 'Edit') {
      this.value = 'Close editing';
      this.showSaveAndClose = true;
      this.canEdit = true;
    } else  {
      this.resetState()
    }
  }

  async updateContactAndClose(contact) {
    let response = await this.updatePerson(contact);
    if(response.responseMessage === 'success') {
      this.resetState()
      $('#client-detail-modal').modal('hide');
      this.ea.publish('editContact', {
        firstName,
        lastName,
        "partyId": this.contact.partyId
      });
    }
  }

  async updatePerson(contact) {
    return await this.entityUpdateService.updatePerson(contact.firstName, contact.lastName, this.contact.partyId)
  }

  resetState() {
    this.value = 'Edit';
    this.canEdit = false;
    this.showSaveAndClose = false;
  }
}


