import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { OpportunityService } from '../../../service/opportunity-service';
import { Store } from 'aurelia-store';

@inject(EventAggregator, OpportunityService, Store)
export class Pipeline {
  _subscriptions = [];

  constructor(ea, opportunityService, store) {
    this.store = store;
    this.store.newOpp = [];
    this.store.propositionOpp = [];
    this.store.wonOpp = [];

    this.ea = ea;
    this.opportunityService = opportunityService;

    ea.subscribe('reorderable-group:intention-changed', intention => {
      this.intention = intention;
    });

    // ea.subscribe('newOpportunityCreation',
    //   description => this.eventNewOpportunityCreation(description));
  }

  // eventNewOpportunityCreation(description) {
  // }

  attached(params) {
      this.opportunityService.getOpportunitiesByStage("new")
        .then(
          data => this.store.newOpp = data
        );
      this.opportunityService.getOpportunitiesByStage("proposition")
        .then(
          data => this.store.propositionOpp = data
        );
      this.opportunityService.getOpportunitiesByStage("won")
        .then(
          data => this.store.wonOpp = data
        );
    this.opportunityService.getOpportunities()
      .then(
        data => this.store.opportunitiesCopy = data
      )
  }
  deleteWonOpportunity(id, index) {
    this.store.wonOpp.splice(index, 1);
    this.opportunityService.deleteOpportunityById(id);
  }

  deleteNewOpportunity(index, id) {
    this.store.newOpp.splice(index, 1);
    this.opportunityService.deleteOpportunityById(id);
  }

  deletePropositionOpportunity(index, id) {
    this.store.propositionOpp.splice(index, 1);
    this.opportunityService.deleteOpportunityById(id);
  }

  objArrayReordered(objArray, change) {
    console.log(JSON.stringify(objArray));
    console.log('change', change);
  }

  newOrdered(list, change) {
    if (change.item.stage !== "new" && this.lastChange !== change) {
      this.lastChange = change;
      change.item.stage = "new";
      this.opportunityService.editOpportunity(change.item);
    }
  }

  propositionOrdered(list, change) {
    if (change.item.stage !== "proposition" && this.lastChange !== change) {
      this.lastChange = change;
      change.item.stage = "proposition";
      this.opportunityService.editOpportunity(change.item);
    }
  }

  wonOrdered(list, change) {
    if (change.item.stage !== "won" && this.lastChange !== change) {
      this.lastChange = change;
      change.item.stage = "won";
      this.opportunityService.editOpportunity(change.item);
    }
  }
}
