import { inject } from 'aurelia-framework';
import { HttpClient, json } from "aurelia-fetch-client";
import moment from "moment";

@inject(HttpClient)
export class affPartnerApprove {

  constructor(httpClient) {
    this.httpClient = httpClient;
    this.affAllCandidates = [];
    this.affApproveFilterOptions = this.getAffApproveFilterOptions();
    this.filteredValues = this.affAllCandidates;
    this.fetchPendingPartners();
  }

  async fetchPendingPartners() {
    // const response = await this.httpClient.fetch("http://localhost:4567/api/parties/unconfirmedAffiliates");
    // const responseData = await response.json();
    // responseData.forEach(candidate =>
    //   this.affCandidates.push(
    //     this.parseCandidate(candidate)
    //   )
    // );
    this.affAllCandidates.push(
      {
        "firstName": "Nikita",
        "lastName": "Ojamae",
        "dateTimeCreated": moment(1584223200000).format('MM-D-YYYY'),
        "email": "122@gmail.com",
      },
      {
        "firstName": "Alexei",
        "lastName": "Tsop",
        "dateTimeCreated": moment(1587330000000).format('MM-D-YYYY'),
        "email": "Alex@gmail.com",
      }
    )
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

  setFilteredValues(filteredValues) {
    this.filteredValues =  filteredValues;
  }

  getAffApproveFilterOptions() {
    return [
      {
        "key": "lastName",
        "value": "Last Name",
      },
      {
        "key": "firstName",
        "value": "First Name",
      },
      {
        "key": "dateTimeCreated",
        "value": "Date",
      },
      {
        "key": "email",
        "value": "Email",
      },
    ]
  }
}
