import "../member-components.scss"
import { inject } from "aurelia-dependency-injection";
import { HttpClient } from "aurelia-fetch-client";
import moment from "moment";

@inject(HttpClient)
export class MyAffiliates {

  constructor(httpClient) {
    this.httpClient = httpClient;
    this.myAffiliatesOption = this.getMyAffiliateOptions();
    this.myAffiliatePartners = this.getMyAffiliatePartners();
    this.filteredAffiliatePartners = [];
  }

  getMyAffiliateOptions() {
    return [
      {
        "key": 'first-name',
        "value": 'First name',
      },
      {
        "key": 'last-name',
        "value": 'Last name',
      },
      {
        "key": 'email',
        "value": 'Email',
      },
      {
        "key": 'date',
        "value": 'Date',
      },
      {
        "key": 'status',
        "value": 'Status',
      },
    ];
  }

  async getMyAffiliatePartners() {
    const myPartners = [];
    const response = await this.httpClient
      .fetch("https://localhost:8443/api/parties/affiliates");
    const responseData = await response.json();
    responseData.forEach(partner =>
      myPartners.push(
        this.parsePartner(partner)
      )
    );
    this.filteredAffiliatePartners = myPartners;
    return myPartners;
  }

  setFilteredAffiliatePartners(filteredValues) {
    this.filteredAffiliatePartners = filteredValues;
  }

  parsePartner(partner) {
    const parsedDate = new Date(partner["createdStamp"]);
    return {
      "dateTimeCreated": moment(parsedDate).format('MM-D-YYYY'),
      "firstName": partner['firstName'],
      "lastName": partner['lastName'],
      "email": `${partner['firstName']}@gmail.com`,
      "status": 'active'
    }
  }
}
