import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { OpportunityService } from '../../../service/opportunity-service.js';

@inject(EventAggregator, OpportunityService)
export class OpportunityHeader {
  constructor(ea, opportunityService) {
    this.ea = ea;
    this.opportunityService = opportunityService;
  }

  newOpportunity() {
    let opportunity = { name: this.name, description: this.description, price: this.price, pipelineId: "SAMPLE_ID1", customerId: "SAMPLE_ID1", contactId: "SAMPLE_ID1", stage: this.stage };
    this.opportunityService.createNewOpportunity(opportunity);
    // this.ea.publish('newOpportunityCreation', 'jou');
  };
}
