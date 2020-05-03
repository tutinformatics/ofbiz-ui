import { RouteConfig, NavigationInstruction} from 'aurelia-router';
import { OpportunitiesService } from '../service/opportunities-service';
import { inject } from 'aurelia-framework';

@inject(OpportunitiesService)
export class OpportunityEdit {
    constructor(opportunitiesService) {
      this.opportunitiesService = opportunitiesService;
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
