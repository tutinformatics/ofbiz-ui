import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-dependency-injection';
import {json} from "aurelia-fetch-client";
import {Contact} from "../models/contact";
import {HttpClientCRM} from '../../../commons/util/HttpClientCRM';
import {Router} from "aurelia-router";
import {TableEntry} from "../models/tableEntry";

@inject(EventAggregator, HttpClientCRM, Router)
export class Activity {

  constructor(ea, http) {
    this.activity="Notes";
    this.http=http.http;
    this.ea = ea;
    this.data = [];
    this.tableHeaders = []
    this.tableData = [];

    this.ea.subscribe("changeAction", payload => {
      this.activity = payload.name;
      this.tableData.length = 0;
      this.getData(this.activity).then(r =>{console.log("table fetch OK")});
    })
  }

  closeActivity() {
    this.ea.publish("displayActivity", false);
  }
  async getData(activity) {
    // await this.login();
    if (activity === "Notes") {
      await this.fetchNotes();
    } else {
      console.log("else");
      this.data = [];
      this.tableData = []
    }

  }

  test(entry) {
    console.log(this.data[this.tableData.indexOf(entry)]);
  }

  async fetchNotes() {
    this.tableHeaders = ["First", "Last", "Email", "Phone"]
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
      this.data.push(contact);
      let entry = new TableEntry(
        "contact",
        response[i].partyId,
        response[i].firstName,
        response[i].lastName,
        response[i].emailAddress,
        response[i].phoneNumber
      );
      this.tableData.push(entry);
    }
  }
}
