import { HttpClient } from 'aurelia-fetch-client';
import { AgentService } from './agent-service';

export class Agents {
  constructor() {
    this.agentService = new AgentService();
  }
  
  async attached() {
    this.agents = await this.agentService.getAgents();
    console.log(typeof this.agents);
  }
}

