import { OpportunityService } from '../../../service/opportunity-service';
import { inject } from 'aurelia-framework';

@inject(OpportunityService)
export class CardView {
  constructor(opportunityService) {
    this.opportunityService = opportunityService;
  }

  attached() {
    this.opportunityService.getOpportunities()
      .then(
        data => this.opportunities = data
      );
  }
}
