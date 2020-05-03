import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {json} from 'aurelia-fetch-client';

import {inject} from 'aurelia-dependency-injection';
import {Contact} from '../models/contact';
import {Router} from 'aurelia-router';

@inject(EventAggregator, HttpClientCRM, Router)

export class Clients {
  constructor(ea, http, router) {
    this.ea = ea;
    this.http = http.http;
    ea.subscribe("party", payload => {
      this.contacts = payload
    })
    this.router = router;
    this.simpleView = true;
    this.view = "Card View"
  }


  chooseContact(contact) {
    console.log(contact);
    this.ea.publish("contactChosen", contact);
    this.ea.publish("displayClient", true);
  }

  toggleView() {
    if (this.simpleView) {
      this.view = "Table View"
    } else {
      this.view = "Card view"
    }
    this.simpleView = !this.simpleView;
  }
}
