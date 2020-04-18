import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { PipelineService } from '/Users/siret/code/tarkvaratehnika/ofbiz-ui/src/crm/pipeline/pipeline-service.js';

@inject(EventAggregator)
export class OpportunityModal {
  constructor(ea) {
    this.pipelineService = new PipelineService();
    this.ea = ea;
  }

  newOpportunity() {
    let opportunity = { name: this.name, description: this.description, price: this.price, pipelineId: "SAMPLE_ID1", customerId: "SAMPLE_ID1", contactId: "SAMPLE_ID1", stage: this.stage };
    this.pipelineService.createNewOpportunity(opportunity);
    this.ea.publish('newOpportunityCreation', 'jou');
  };
}
