import { inject } from 'aurelia-framework';
import { OpportunityService } from '../../../service/opportunity-service';
import { CustomerService } from '../../../service/customer-service';

@inject(OpportunityService, CustomerService)
export class Formview {
    constructor(opportunityService, customerService) {
      this.customerService = customerService;
      this.opportunityService = opportunityService;
    }

    attached() {
      this.date = new Date().toLocaleDateString();
      this.price = parseFloat(this.opportunity.price).toFixed(2);
      this.totalPrice = parseFloat(this.opportunity.price) + parseFloat(this.opportunity.price * 0.2);

      this.opportunities = this.opportunityService.getOpportunities();
      this.customerService.getCustomers().then(
        data => this.customers = data
      );
    }

    activate(params, routeConfig, navigationInstruction) {
      if (params.opportunity === undefined) {
        this.opportunity = {
          name: params.name,
          description: params.description,
          price: params.price,
          stage: params.stage,
        };
        this.opportunityCopy = {
          name: params.name,
          description: params.description,
          price: params.price,
          stage: params.stage,
        };
      } else {
        this.opportunity = params.opportunity;
        this.opportunityId = params.opportunity.opportunityId;
      }
    }
    editOpportunity() {
      if (this.opportunityCopy !== undefined) {
        for (var i = 0; i < this.opportunities._value.length; i++){
          if (this.opportunities._value[i].stage === this.opportunityCopy.stage && this.opportunities._value[i].description === this.opportunityCopy.description &&
            parseInt(this.opportunities._value[i].price) === parseInt(this.opportunityCopy.price) && this.opportunities._value[i].name === this.opportunityCopy.name) {
            this.opportunityId = this.opportunities._value[i].opportunityId;
          }
        }
      }
      let opportunity = { name: this.opportunity.name, description: this.opportunity.description, price: this.opportunity.price, pipelineId: "SAMPLE_ID1", contactId: "SAMPLE_ID1", customerId: this.opportunity.customerId, stage: this.opportunity.stage, opportunityId: this.opportunityId };
      this.opportunityService.editOpportunity(opportunity);
      history.back();
    };
    back() {
      history.back();
    }
}
