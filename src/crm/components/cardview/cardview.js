import { OpportunitiesService } from 'crm/service/opportunities-service';

export class CardView {
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
