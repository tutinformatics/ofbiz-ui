import { OpportunitiesService } from './opportunities-service';

export class OpportunitiesList {
  constructor() {
    this.opportunitiesService = new OpportunitiesService();
  }
  
  async attached() {
    this.opportunities = await this.opportunitiesService.getOpportunities();
  }
}

