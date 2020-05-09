import {CategoryElement} from "./categoryElement";
import {EventAggregator} from 'aurelia-event-aggregator';
import {inject} from 'aurelia-dependency-injection';
import {HttpClientCRM} from "../../../commons/util/HttpClientCRM";
import {Router} from "aurelia-router";

@inject(EventAggregator)

export class Categories {
  constructor(ea) {
    this.ea = ea;
    this.partySearchInput = ""
    this.nameSearchInput = ""
    this.categories = [new CategoryElement("asdasdasd"),
      new CategoryElement("fdg"),
      new CategoryElement("dfg")]
    ;
    this.parties = []
    this.firstNames = []
    this.lastNames = []
    ea.subscribe("categoryParties", payload => {
      this.parties = payload;
      console.log(this.parties)
    })
    ea.subscribe("categoryFirstNames", payload => {
      this.firstNames = payload;
    })
    ea.subscribe("categoryLastNames", payload => {
      this.lastNames = payload;
    })
  }

  get filteredParties() {
    if (this.partySearchInput.trim() === "") {
      return this.parties;
    }
    return this.parties.filter(
      party => party.toUpperCase().startsWith(this.partySearchInput.toUpperCase())
    )
  }

  get names() {
    return this.firstNames.concat(this.lastNames)
  }

  unfilteredCustomers() {
      this.ea.publish("unfilteredCustomers", true);
  }

  filterByParty(party) {
    this.ea.publish("filterByParty", party);
  }

  filterByName(name) {
    this.ea.publish("filterByName", name);
  }

  capitalizeFirstLetter(string) {
    if (string != null) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
    return "null";
  }





}
