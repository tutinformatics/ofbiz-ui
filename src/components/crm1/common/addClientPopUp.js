import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {inject} from 'aurelia-dependency-injection';

@inject(EventAggregator, HttpClientCRM)
export class AddClientPopUp {
  // test = 'THIS MESSAGE IS HERE FOR TESTING PURPOSES';

  constructor(ea, http) {
    this.ea = ea;
    this.http = http.http;
  }

  addContact(contact) {
    console.info(contact)
  }
}



