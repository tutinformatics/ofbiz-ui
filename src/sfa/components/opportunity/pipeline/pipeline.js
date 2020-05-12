import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { OpportunityService } from '../../../service/opportunity-service';

@inject(EventAggregator, OpportunityService)
export class Pipeline {
  name = '';
  description = '';
  price = '';
  stage = '';
  _subscriptions = [];

  constructor(ea, opportunityService) {
    this.new = [];
    this.proposition = [];
    this.won = [];

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

  attached() {
    this.opportunityService.getOpportunitiesByStage("new")
      .then(
        data => this.new = data
      );
    this.opportunityService.getOpportunitiesByStage("proposition")
      .then(
        data => this.proposition = data
      );
    this.opportunityService.getOpportunitiesByStage("won")
      .then(
        data => this.won = data
      );
  }

  deleteWonOpportunity(id, index) {
    this.won.splice(index, 1);
    this.opportunityService.deleteOpportunityById(id);
  }

  deleteNewOpportunity(index, id) {
    this.new.splice(index, 1);
    this.opportunityService.deleteOpportunityById(id);
  }

  deletePropositionOpportunity(index, id) {
    this.proposition.splice(index, 1);
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
