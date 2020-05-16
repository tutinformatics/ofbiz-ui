import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { OpportunityService } from '../../../service/opportunity-service.js';
import { Store } from 'aurelia-store';

@inject(EventAggregator, OpportunityService, Store)
export class OpportunityHeader {
  constructor(ea, opportunityService, store) {
    this.ea = ea;
    this.opportunityService = opportunityService;
    this.priceToggle = "equal";
    this.dateToggle = "greater";
    this.store = store;
  }

  newOpportunity() {
    let opportunity = { name: this.name, description: this.description, price: this.price, pipelineId: "SAMPLE_ID1", customerId: "SAMPLE_ID1", contactId: "SAMPLE_ID1", stage: this.stage };
    if (opportunity.stage === undefined) {
      opportunity.stage = "new";
    }
    this.opportunityService.createNewOpportunity(opportunity);
  };
  toggleClickPrice() {
    if (this.priceToggle === "equal") {
      this.priceToggle = "greater";
    } else if (this.priceToggle === "greater") {
      this.priceToggle = "lower";
    } else {
      this.priceToggle = "equal";
    }
  }
  toggleClickDate() {
    if (this.dateToggle === "greater") {
      this.dateToggle = "lower";
    } else {
      this.dateToggle = "greater";
    }
  }
  async applyFilter() {
    var body = [];
    if (this.filter.date !== "") {
      body.push({
        "fieldName": "createdStamp",
        "operation": this.dateToggle === "lower" ? "lessThan": "greaterThan",
        "value": Date.parse(this.filter.date)
      })
    }
    if (this.filter.price !== "") {
      body.push({
        "fieldName": "price",
        "operation": this.priceToggle === "lower" ? "lessThan": this.priceToggle === "greater" ? "greaterThan" : "equals",
        "value": this.filter.price
      })
    }
    if (this.filter.stage !== "") {
      body.push({
        "fieldName": "stage",
        "operation": "equals",
        "value": this.filter.stage
      })
    }
    var newData = [];
    var filteredData = await this.opportunityService.filter(body);
    filteredData["result"].forEach(function (opportunity) {
        newData.push(opportunity);
    });
    this.store.opportunities = newData;

    var newOpportunities = [];
    var wonOpportunities = [];
    var propositionOpportunities = [];
    newData.forEach(function (opportunity) {
      if (opportunity.stage === "new") {
        newOpportunities.push(opportunity);
      } else if (opportunity.stage === "won") {
        wonOpportunities.push(opportunity);
      } else if (opportunity.stage === "proposition"){
        propositionOpportunities.push(opportunity);
      }
    });
    this.store.newOpp = newOpportunities;
    this.store.wonOpp = wonOpportunities;
    this.store.propositionOpp = propositionOpportunities;
  }
}
function toggleClick() {
  console.log("me");
}
