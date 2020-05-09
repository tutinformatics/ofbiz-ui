import { HttpClient, json } from 'aurelia-fetch-client';
import { inject } from 'aurelia-framework';
import {AureliaCookie} from "aurelia-cookie";

@inject(HttpClient)
export class OpportunityService {
  baseUrl = 'https://sometotallyrandomapplicationonarandomurl.com:8443/api/generic/v1/';

  constructor(httpClient) {
    this.client = httpClient;
  }

  getOpportunities() {
    return this.client
      .fetch(`${this.baseUrl}entities/opportunity`)
      .then(response => response.json())
      .catch(reason => {
        console.error(reason);
        return [];
      });
  }

  getOpportunitiesByStage(stage) {
    return this.client
      .fetch(`${this.baseUrl}entities/opportunity/?stage=` + stage)
      .then(response => response.json())
      .catch(reason => {
        console.error(reason);
        return [];
      });
  }

  // getOpportunity(id) {
  //   return this.client
  //     .fetch('opportunities')
  //     .then(response => response.json())
  //     .catch(reason => {
  //       console.error(reason);
  //       return [];
  //     });
  // }
   deleteOpportunityById(id) {
     return this.client
       .fetch(
         `${this.baseUrl}entities/opportunity/?opportunityId=` + id,
         {
           method: "DELETE"
         }
       );
   }
   editOpportunity(opportunity) {
     this.client
       .fetch(`${this.baseUrl}entities/opportunity`, {
         method: 'PUT',
         body: json(opportunity)
       })
   }

  createNewOpportunity(opportunity) {
    console.log("neeee");
    return this.client
      .fetch(`${this.baseUrl}entities/opportunity/`, {
        method: 'POST',
        body: json(opportunity)
      })
  }
}

