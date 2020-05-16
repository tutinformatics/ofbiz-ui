import { OpportunityService } from '../../../service/opportunity-service';
import { inject } from 'aurelia-framework';
import { Store } from 'aurelia-store';

@inject(OpportunityService, Store)
export class CardView {
  constructor(opportunityService, store) {
    this.store = store;
    this.opportunityService = opportunityService;
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

  deleteOpportunity(index, id) {
    this.store.opportunities.splice(index, 1);
    this.opportunityService.deleteOpportunityById(id);
  }
}
