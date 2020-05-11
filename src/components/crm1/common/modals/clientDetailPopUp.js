import {EventAggregator} from 'aurelia-event-aggregator';
import { HttpClient, json } from 'aurelia-fetch-client';
import {inject} from 'aurelia-dependency-injection';

@inject(EventAggregator, HttpClient)
export class ClientDetailPopUp {

  constructor(ea, http) {
    this.ea = ea;
    this.http = http;
    ea.subscribe("currentClient", payload => {
      console.log(payload)
      this.contact = payload
    })
  }
}



