import { OpportunitiesService } from '../service/opportunities-service';

export class OpportunitiesList {
  constructor() {
    this.opportunitiesService = new OpportunitiesService();
  }

  attached() {
    this.opportunitiesService.getOpportunities()
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

