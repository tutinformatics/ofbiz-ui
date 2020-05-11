import {EventAggregator} from 'aurelia-event-aggregator';
import { HttpClient, json } from 'aurelia-fetch-client';
import {inject} from 'aurelia-dependency-injection';
import {Router} from 'aurelia-router';

@inject(EventAggregator,HttpClient , Router)

export class Clients {
  constructor(ea, http, router) {
    this.ea = ea;
    this.http = http;
    this.router = router;
    this.contacts = [];
    this.filteredContacts = [];
    this.parties = [];
    this.baseUrl = '/api/generic/v1/';

    ea.subscribe("partyIds", payload => {
      this.contacts = payload;
      console.log(this.contacts);
      this.filteredContacts = this.contacts;

      this.ea.publish("categoryCompany",
        this.contacts.map(contact => contact.companyName).filter(this.unique)
      );

      this.ea.publish("categoryPartiesIds",
        this.contacts.map(contact => contact.partyId).filter(this.unique)
      );

      this.ea.publish("categoryFirstNames",
        this.contacts.map(contact => contact.firstName).filter(this.unique)
      );

      this.ea.publish("categoryLastNames",
        this.contacts.map(contact => contact.lastName).filter(this.unique)
      );
    });

    ea.subscribe("unfilteredCustomers", payload => {
      console.log(this.contacts);
      this.filteredContacts = this.contacts
    });

    ea.subscribe("filterByParty", (party) => {
      this.filteredContacts = this.contacts.filter(
        contact => contact.partyId === party
      )
    })

    ea.subscribe("filterByCompany", (company) => {
      this.filteredContacts = this.contacts.filter(
        contact => contact.companyName === company
      )
    })
    ea.subscribe("filterByName", (name) => {
      this.filteredContacts = this.contacts.filter(
        contact => (contact.firstName === name) ||  (contact.lastName === name)
      )
    })
  }

  async attached() {
    await this.getAllParties();
  }

  unique(value, index, self) {
    return self.indexOf(value) === index;
  }

  chooseContact(contact) {
    this.ea.publish("contactChosen", contact);
    this.ea.publish("displayClient", true);
  }

  async getAllParties() {
    let response = await this.http.fetch(`${this.baseUrl}entityquery/PartyRoleAndPartyDetail`, {
      method: 'post',
      body: json({
        "inputFields":
          {
            "roleTypeId": "ACCOUNT"
          },
        "fieldList": [
          "partyId",
          "roleTypeId",
          "groupName"
        ]
      })
    })
      .then(response => response.json())
      .catch(() => {
        alert('Error fetching clients!');
      });
    this.ea.publish("party", response)
  }
}
