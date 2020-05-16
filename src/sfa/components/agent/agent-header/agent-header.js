import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';
import { AgentService } from '../../../service/agent-service.js';
import { Store } from 'aurelia-store';

@inject(EventAggregator, AgentService, Store)
export class AgentHeader {
  constructor(ea, agentService, store) {
    this.ea = ea;
    this.agentService = agentService;
    this.store = store;
  }

  newAgent() {
    let agent = { name: this.name, telecomNumber: this.phone, emailAddress: this.email };
    this.agentService.createNewAgent(agent);
  };
  search() {
    var agents = [];
    var searchInput = this.searchInput;
    this.store.agentsCopy.forEach(function (agent) {
      if (agent.agentId.toLowerCase().includes(searchInput.toLowerCase())
        || agent.name.toLowerCase().includes(searchInput.toLowerCase())) {
        agents.push(agent);
      }
    });
    this.store.agents = agents;
  }
}
