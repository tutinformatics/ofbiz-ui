import { inject } from 'aurelia-framework';
import { AgentService } from '../../../service/agent-service';
import { CustomerService } from '../../../service/customer-service';

@inject(AgentService, CustomerService)
export class agentEdit {
    constructor(agentService, customerService) {
      this.customerService = customerService;
      this.agentService = agentService;
    }

    attached() {
      this.agents = this.agentService.getAgents();
      this.customerService.getCustomers().then(
        data => this.customers = data
      );
    }

    activate(params, routeConfig, navigationInstruction) {
      if (params.agent === undefined) {
        this.agent = {
          name: params.name,
          phone: params.phone,
          email: params.email
        };
        this.agentCopy = {
          name: params.name,
          phone: params.phone,
          email: params.email
        };
      } else {
        this.agent = params.agent;
        this.agentId = params.agent.agentId;
      }
    }
    editAgent() {
      if (this.agentCopy !== undefined) {
        for (var i = 0; i < this.agents._value.length; i++){
          if (this.agents._value[i].name === this.agentCopy.name && this.agents._value[i].email === this.agentCopy.email &&
            this.agents._value[i].phone === this.agentCopy.phone) {
            this.agentId = this.agents._value[i].agentId;
          }
        }
      }
      let agent = { name: this.agent.name,telecomNumber: this.agent.telecomNumber, emailAddress: this.agent.emailAddress, agentId: this.agentId };
      this.agentService.editAgent(agent);
      history.back();
    };
    back() {
      history.back();
    }
}
