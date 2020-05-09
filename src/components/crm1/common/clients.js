import {EventAggregator} from 'aurelia-event-aggregator';
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {inject} from 'aurelia-dependency-injection';
import {Router} from 'aurelia-router';

@inject(EventAggregator, HttpClientCRM, Router)

export class Clients {
  constructor(ea, http, router) {
    this.ea = ea;
    this.http = http.http;
    this.contacts = [];
    this.filteredContacts = []
    this.parties = []
    ea.subscribe("party", payload => {
      this.contacts = payload
      this.filteredContacts = this.contacts;
      this.parties = this.contacts.map(contact => contact.partyId).filter(this.unique);
      this.ea.publish("categoryParties", this.parties);
    })
    ea.subscribe("defilterCustomers", () => {
      this.filteredContacts.length = 0;
      this.filteredContacts = this.contacts.filter(
        true
      )
    })

    this.router = router;
  }

  unique(value, index, self) {
    return self.indexOf(value) === index;
  }



  chooseContact(contact) {
    console.log(contact);
    this.ea.publish("contactChosen", contact);
    this.ea.publish("displayClient", true);

  }
}
