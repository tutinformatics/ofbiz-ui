import {Category} from '../models/category';
import {Contact} from '../models/contact';
import {Router} from 'aurelia-router';
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {json} from 'aurelia-fetch-client';
import {inject} from "aurelia-dependency-injection";
import {EventAggregator} from "aurelia-event-aggregator";


@inject(EventAggregator, HttpClientCRM, Router)
export class ComplexView {

  constructor(ea, http, router) {
    this.ea = ea;
    this.http = http.http;
    this.router = router;
    this.contacts = [];
    this.view = "Card View"
    this.displayActivity = false;
    this.displayClient = false;




  }

  async attached() {
    await this.getAllContacts()
  }


  async getAllContacts() {
    let response = await this.http.fetch('/entityquery/PartyExport', {
    method: 'post',
      body: json({
        "fieldList": [
          "lastName",
          "firstName",
          "emailAddress",
          "phoneNumber",
          "companyName",
          "roleTypeId",
          "address",
          "postalCode",
          "partyId"
        ]
      })
    })
    .then(response => response.json())
    .catch(() => {
      alert('Error fetching clients!');
    });
    for (let i = 0; i < response.length; i++) {
      if (response[i].roleTypeId !== "_NA_") {
        let contact = new Contact(
          response[i].firstName,
          response[i].lastName,
          response[i].emailAddress,
          response[i].phoneNumber,
          response[i].companyName,
          response[i].roleTypeId,
          response[i].address,
          response[i].postalCode,
          response[i].partyId
        );
        this.contacts.push(contact);
      }
    }
    this.ea.publish("party", this.contacts);
  }

}
