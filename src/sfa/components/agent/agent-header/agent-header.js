import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AgentService } from '../../../service/agent-service.js';

@inject(EventAggregator, AgentService)
export class AgentHeader {
  constructor(ea, agentService) {
    this.ea = ea;
    this.agentService = agentService;
  }

  newAgent() {
    let agent = { name: this.name, phone: this.phone, email: this.email };
    this.agentService.createNewAgent(agent);
  };
}
