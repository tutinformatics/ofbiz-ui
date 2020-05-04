import { AgentService } from '../../service/agent-service';
import { inject } from 'aurelia-framework';

@inject(AgentService)
export class Agents {
  constructor(agentService) {
    this.agentService = agentService;
  }

  attached() {
    this.agents = this.agentService.getAgents();
  }
}

