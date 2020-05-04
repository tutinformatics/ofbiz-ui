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
        data => this.opportunities = data
      );
  }

  // deleteOpportunity(id) {
  //   this.opportunities.filter(function(obj) {
  //     return obj.id !== id;
  //   });
  // }
}
