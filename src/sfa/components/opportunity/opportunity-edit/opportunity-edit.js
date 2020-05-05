import { inject } from 'aurelia-framework';
import { OpportunityService } from '../../../service/opportunity-service';

@inject(OpportunityService)
export class OpportunityEdit {
    constructor(opportunityService, router) {
      this.router = router;
      this.opportunityService = opportunityService;
    }

    attached() {
    }

    activate(params, routeConfig, navigationInstruction) {
        if (params.opportunity.opportunityId && typeof(params.opportunity.opportunityId) === 'string') {
            this.opportunity = params.opportunity;
            console.log(this.opportunity);
            this.opportunityId = params.opportunity.opportunityId;
        }
    }
    editOpportunity() {
      let opportunity = { name: this.opportunity.name, description: this.opportunity.description, price: this.opportunity.price, pipelineId: "SAMPLE_ID1", customerId: "SAMPLE_ID1", contactId: "SAMPLE_ID1", stage: this.stage, opportunityId: this.opportunityId };
      this.opportunityService.editOpportunity(opportunity);
      this.goBack();
    };
    goBack() {
      history.back();
    }
}
