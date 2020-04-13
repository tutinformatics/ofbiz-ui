import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PipelineService } from './pipeline-service';

@inject(EventAggregator)
export class Pipeline {
  constructor(ea) {
    this.new = [];
    this.proposition = [];
    this.won = [];

    this.pipelineService = new PipelineService();

    ea.subscribe('reorderable-group:intention-changed', intention => {
      this.intention = intention;
    });
  }

  async attached() {
    this.new = await this.pipelineService.getNewOpportunities();
    this.proposition = await this.pipelineService.getPropositionOpportunities();
    this.won = await this.pipelineService.getWonOpportunities();
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
