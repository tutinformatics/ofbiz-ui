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

  deleteWonOpportunity(index) {
    this.won.splice(index, 1);
  }

  deleteNewOpportunity(index) {
    this.new.splice(index, 1);
  }

  deletePropositionOpportunity(index) {
    this.proposition.splice(index, 1);
  }

  objArrayReordered(objArray, change) {
    /* eslint no-console: 0 */
    console.log(JSON.stringify(objArray));
    console.log('change', change);
  }

  fruitsOrdered(list, change) {
    console.log('newFruits: ' + list);
    console.log('change', change);
  }

  animalsOrdered(list, change) {
    console.log('animals: ' + list);
    console.log('change', change);
  }

  insectsOrdered(list, change) {
    console.log('insects: ' + list);
    console.log('change', change);
  }
}
