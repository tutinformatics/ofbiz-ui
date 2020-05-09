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
    ea.subscribe("party", payload => {
      this.contacts = payload
      this.filteredContacts = this.contacts;

      this.ea.publish("categoryParties",
        this.contacts.map(contact => contact.partyId).filter(this.unique)
      );

      this.ea.publish("categoryFirstNames",
        this.contacts.map(contact => contact.firstName).filter(this.unique)
      );

      this.ea.publish("categoryLastNames",
        this.contacts.map(contact => contact.lastName).filter(this.unique)
      );
    })
    ea.subscribe("unfilteredCustomers", payload => {
      console.log(this.contacts)
      this.filteredContacts = this.contacts
    })
    ea.subscribe("filterByParty", (party) => {
      this.filteredContacts = this.contacts.filter(
        contact => contact.partyId === party
      )
    })

    ea.subscribe("filterByName", (name) => {
      this.filteredContacts = this.contacts.filter(
        contact => (contact.firstName === name) ||  (contact.lastName === name)
      )
    })

    this.router = router;
  }

  unique(value, index, self) {
    return self.indexOf(value) === index;
  }

  chooseContact(contact) {
    this.ea.publish("contactChosen", contact);
    this.ea.publish("displayClient", true);

  }
}
