import { OpportunitiesService } from '/Users/siret/code/tarkvaratehnika/ofbiz-ui/src/crm/service/opportunities-service';

export class ListView {
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
