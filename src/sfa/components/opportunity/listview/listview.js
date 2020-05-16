import { OpportunityService } from '../../../service/opportunity-service';
import { inject } from 'aurelia-framework';
import { Store } from 'aurelia-store';

@inject(OpportunityService, Store)
export class ListView {
  constructor(opportunityService, store) {
    this.opportunityService = opportunityService;
    this.store = store;
  }

  attached() {
    this.opportunityService.getOpportunities()
      .then(
        data => this.store.opportunities = data.slice().reverse()
      );
    this.opportunityService.getOpportunities()
      .then(
        data => this.store.opportunitiesCopy = data
      )
  }

   deleteOpportunity(id, index) {
     this.store.opportunities.splice(index, 1);
     this.opportunityService.deleteOpportunityById(id);
   }
}
