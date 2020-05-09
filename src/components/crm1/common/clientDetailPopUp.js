import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {inject} from 'aurelia-dependency-injection';
import {json} from 'aurelia-fetch-client';

@inject(EventAggregator, HttpClientCRM)
export class ClientDetailPopUp {

  constructor(ea, http) {
    this.ea = ea;
    this.http = http.http;
    ea.subscribe("currentClient", payload => {
      console.log(payload)
      this.contact = payload
    })
  }
}



