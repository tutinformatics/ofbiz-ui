import { OpportunityService } from '../../../service/opportunity-service';
import { inject } from 'aurelia-framework';

@inject(OpportunityService)
export class ListView {
  constructor(opportunityService) {
    this.opportunityService = opportunityService;
  }

  attached() {
    this.opportunityService.getOpportunities()
      .then(
        data => this.opportunities = data.slice().reverse()
      );

  }

   deleteOpportunity(id, index) {
     this.opportunities.splice(index, 1);
     this.opportunityService.deleteOpportunityById(id);
   }
}
