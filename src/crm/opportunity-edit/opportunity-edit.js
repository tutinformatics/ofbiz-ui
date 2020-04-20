import { RouteConfig, NavigationInstruction} from 'aurelia-router';
import { OpportunitiesService } from '../service/opportunities-service';


export class OpportunityEdit {
    constructor() {
      this.opportunitiesService = new OpportunitiesService();
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
