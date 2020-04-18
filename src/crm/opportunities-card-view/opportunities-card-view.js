import { OpportunitiesService } from '/Users/siret/code/tarkvaratehnika/ofbiz-ui/src/crm/opportunities/opportunities-service.js';

export class OpportunitiesCardView {
  constructor() {
    this.opportunitiesService = new OpportunitiesService();
  }

  attached() {
    this.opportunitiesService.getOpportunities()
      .then(
        data => this.opportunities = data
      );
  }
}
