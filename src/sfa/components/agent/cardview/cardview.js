import { inject } from 'aurelia-framework';
import { AgentService } from '../../../service/agent-service';

@inject(AgentService)
export class CardView {
  constructor(agentService) {
    this.agentService = agentService;
  }

  attached() {
    this.agentService.getAgents()
      .then(
        data => this.agents = data
      );
  }

  deleteAgent(index, id) {
    this.agents.splice(index, 1);
    this.agentService.deleteAgentById(id);
  }
}
