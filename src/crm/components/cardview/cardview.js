import { OpportunitiesService } from 'crm/service/opportunities-service';
import { inject } from 'aurelia-framework';

@inject(OpportunitiesService)
export class CardView {
  constructor(opportunitiesService) {
    this.opportunitiesService = opportunitiesService;
  }

  attached() {
    this.opportunitiesService.getOpportunities()
      .then(
        data => this.opportunities = data
      );
  }
}
