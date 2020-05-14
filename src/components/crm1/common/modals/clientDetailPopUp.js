import {EventAggregator} from 'aurelia-event-aggregator';
import { HttpClient } from 'aurelia-fetch-client';
import {inject} from 'aurelia-dependency-injection';

@inject(EventAggregator, HttpClient)
export class ClientDetailPopUp {
  constructor(ea, http) {
    this.ea = ea;
    this.http = http;
    this.showSaveAndClose = false;
    this.canEdit = false;

    this.value = 'Edit';
    ea.subscribe('currentClient', payload => {
      console.log(payload);
      this.contact = payload;
    });
  }

  edit(contact) {
    console.log(contact);
    if (this.value === 'Edit') {
      this.value = 'Save';
      this.showSaveAndClose = true;
      this.canEdit = true;
    } else  {
      this.value = 'Edit';
      this.showSaveAndClose = false;
    }
  }

  addContactAndClose(contact) {
    console.log('sad');
  }

  resetState() {
    this.canEdit = false;
  }
}


