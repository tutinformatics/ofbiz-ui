import { inject } from 'aurelia-framework';
import { OpportunityService } from '../../../service/opportunity-service';

@inject(OpportunityService)
export class OpportunityEdit {
    constructor(opportunityService) {
      this.opportunityService = opportunityService;
    }

    attached() {
    }

    activate(params, routeConfig, navigationInstruction) {
        console.log(params);

        if (params.id && typeof(params.id) === 'string') {
            // this.opportunitiesService.getOpportunity(params.id)
            //     .then(data => this.opportunity = data);
            this.opportunity = params.opportunity;
        }
    }
}
