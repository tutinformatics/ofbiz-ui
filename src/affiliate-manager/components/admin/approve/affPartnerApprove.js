import './affPartnerApprove.scss';
import { bindable } from 'aurelia-framework';
import { HttpClient, json } from "aurelia-fetch-client";
import moment from "moment";

export class affPartnerApprove {

  @bindable selectedFilter;
  @bindable modifyUser;

  affCandidates;
  httpClient = new HttpClient();

  constructor() {
    this.affCandidates = [];
    this.fetchPendingPartners();
  }

  async fetchPendingPartners() {
    const response = await this.httpClient.fetch("http://localhost:4567/api/parties/unconfirmedAffiliates");
    const responseData = await response.json();
    responseData.forEach(candidate =>
      this.affCandidates.push(
        this.parseCandidate(candidate)
      )
    );
  }

  parseCandidate(candidate) {
    const parsedDate = new Date(candidate["createdStamp"]);
    return {
      "firstName": candidate['firstName'],
      "lastName": candidate['lastName'],
      "dateTimeCreated": moment(parsedDate).format('MM-D-YYYY'),
      "email": `${candidate['firstName']}@gmail.com`,
      "partyId": candidate['partyId'],
    }
  }

  async approve(partyId) {
    const response = await this.httpClient
      .fetch("http://localhost:4567/api/parties/affiliate/approve",
        {
          method: "get",
          body: json({
            "partyId": partyId
          })
        });
    const responseData = await response.json();
    console.log(responseData);
  }

  async disapprove(partyId) {
    const response = await this.httpClient
      .fetch("http://localhost:4567/api/parties/affiliate/approve",
        {
          method: "PUT",
          body: {
            "partyId": partyId
          }
        });
    const responseData = await response.json();
    console.log(responseData);
  }
}
