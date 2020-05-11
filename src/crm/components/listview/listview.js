import { OpportunitiesService } from 'crm/service/opportunities-service';
import { inject } from 'aurelia-framework';

@inject(OpportunitiesService)
export class ListView {
  constructor(opportunitiesService) {
    this.opportunitiesService = opportunitiesService;
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
