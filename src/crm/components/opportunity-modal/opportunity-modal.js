import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { OpportunitiesService } from '../../service/opportunities-service.js';

@inject(EventAggregator)
export class OpportunityModal {
  constructor(ea) {
    this.opportunitiesService = new OpportunitiesService();
    this.ea = ea;
  }

  newOpportunity() {
    let opportunity = { name: this.name, description: this.description, price: this.price, pipelineId: "SAMPLE_ID1", customerId: "SAMPLE_ID1", contactId: "SAMPLE_ID1", stage: this.stage };
    this.opportunitiesService.createNewOpportunity(opportunity);
    // this.ea.publish('newOpportunityCreation', 'jou');
  };
}
