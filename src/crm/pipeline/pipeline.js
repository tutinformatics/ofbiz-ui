import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PipelineService } from './pipeline-service';

@inject(EventAggregator)
export class Pipeline {
  name = '';
  description = '';
  price = '';
  stage = '';

  constructor(ea) {
    this.new = [];
    this.proposition = [];
    this.won = [];

    this.pipelineService = new PipelineService();

    ea.subscribe('reorderable-group:intention-changed', intention => {
      this.intention = intention;
    });
  }

  attached() {
    this.pipelineService.getNewOpportunities()
      .then(
        data => this.new = data
      );
    this.pipelineService.getPropositionOpportunities()
      .then(
        data => this.proposition = data
      );
    this.pipelineService.getWonOpportunities()
      .then(
        data => this.won = data
      );
  }

  async newOpportunity() {
    let opportunity = { name: this.name, description: this.description, price: this.price, pipelineId: "SAMPLE_ID1", customerId: "SAMPLE_ID1", contactId: "SAMPLE_ID1", stage: this.stage };
    // this.new.push(opportunity);
    // switch (this.stage) {
    //   case "new":
    //     this.new.push(opportunity);
    //     break;
    //   case "proposition":
    //     this.proposition.push(opportunity);
    //     break;
    //   case "won":
    //     this.won.push(opportunity);
    //     break;
    // }

    // this is very bad
    // const el = document.getElementById("opportunityModal");
    // const modal = Object.getOwnPropertyNames(el)
    //   .filter(n => n.startsWith("jQuery"))
    //   .map(n => e[n]["bs.modal"])
    //   .find(j => j !== undefined);

    // modal.hide();
    await this.pipelineService.createNewOpportunity(opportunity);
  };

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
