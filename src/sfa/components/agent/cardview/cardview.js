import { inject } from 'aurelia-framework';
import { AgentService } from '../../../service/agent-service';
import { Store } from 'aurelia-store';

@inject(AgentService, Store)
export class CardView {
  constructor(agentService, store) {
    this.agentService = agentService;
    this.store = store;
  }

  attached() {
    this.agentService.getAgents()
      .then(
        data => this.store.agents = data
      );
    this.agentService.getAgents()
      .then(
        data => this.store.agentsCopy = data
      );
  }

  deleteAgent(index, id) {
    this.store.agents.splice(index, 1);
    this.agentService.deleteAgentById(id);
  }
}
