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
    this.tableHeaders = ["A", "B", "C", "D"]
    this.notesHeaders = ["First name", "Last name", "status", "email", "phone"]
    this.tableData = [];
    //Predefined table headers for each category

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
      this.tableHeaders = this.notesHeaders;
      await this.fetch("notes");
    } else {
      console.log("else");
      this.data = [];
      this.tableData = []
    }
  }

  test(entry) {
    console.log(this.data[this.tableData.indexOf(entry)].emailAddress);
  }
  resolveBody(entity) {
    switch (entity) {
      case "notes":
        return json({
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
      default:
        return "none";
    }
  }

  async fetch() {
    let response = await this.http.fetch('/entityquery/PartyExport', {
      method: 'post',
      body: this.resolveBody("notes")
    })
      .then(response => response.json())
      .catch(() => {
        alert('Error fetching!');
      });


    for (let i = 0; i < response.length; i++) {
      //Hard copied in case we make any other requests
      this.data.push(Object.create(response[i]));

      let entry = new TableEntry(this.defineDataFor("notes", response[i]));
      this.tableData.push(entry);
    }
  }

  defineDataFor(entityName, responseEntry) {
    switch (entityName) {
      case "notes":
        return [
          responseEntry.partyId,
          responseEntry.firstName,
          responseEntry.lastName,
          responseEntry.emailAddress,
          responseEntry.phoneNumber
      ]
      default: return undefined;
    }

  }
}
