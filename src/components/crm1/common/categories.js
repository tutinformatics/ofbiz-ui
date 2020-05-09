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
    this.categories = [new CategoryElement("asdasdasd"),
      new CategoryElement("fdg"),
      new CategoryElement("dfg")]
    ;
    this.parties = []
    ea.subscribe("categoryParties", payload => {
      this.parties = payload;
      console.log(this.parties)
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

  unfilteredCustomers() {
      this.ea.publish("defilterCustomers");
  }

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }




}
