import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PipelineService } from 'crm/service/pipeline-service';

@inject(EventAggregator, PipelineService)
export class Pipeline {
  name = '';
  description = '';
  price = '';
  stage = '';
  _subscriptions = [];

  constructor(ea, pipelineService) {
    this.new = [];
    this.proposition = [];
    this.won = [];

    this.ea = ea;
    this.pipelineService = pipelineService;

    ea.subscribe('reorderable-group:intention-changed', intention => {
      this.intention = intention;
    });

    // ea.subscribe('newOpportunityCreation',
    //   description => this.eventNewOpportunityCreation(description));
  }

  // eventNewOpportunityCreation(description) {
  // }

  attached() {
    this.pipelineService.getOpportunitiesByStage("new")
      .then(
        data => this.new = data
      );
    this.pipelineService.getOpportunitiesByStage("proposition")
      .then(
        data => this.proposition = data
      );
    this.pipelineService.getOpportunitiesByStage("won")
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
