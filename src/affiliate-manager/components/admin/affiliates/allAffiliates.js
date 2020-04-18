import "./allAffiliates.scss"
import { inject } from 'aurelia-framework';
import { HttpClient } from "aurelia-fetch-client";
import moment from 'moment';

@inject(HttpClient)
export class allAffiliates {

  filteredValues;
  allAffiliatePartners;
  allAffiliatesOptions;

  constructor(httpClient) {
    this.httpClient = httpClient;
    this.allAffiliatePartners = [];
    this.allAffiliatesOptions = this.getAffiliatesOptions();
    this.fetchAffiliatePartners();
    this.filteredValues = this.allAffiliatePartners;
  }

  async fetchAffiliatePartners() {
    const response = await this.httpClient
      .fetch("https://localhost:8443/api/parties/affiliates");
    const responseData = await response.json();
    responseData.forEach(partner =>
      this.allAffiliatePartners.push(
        this.parsePartner(partner)
      )
    );
    this.allAffiliatePartners.push(
      {
        "firstName": "Nikita",
        "lastName": "Ojamae",
        "dateTimeCreated": moment(1584223200000).format('MM-D-YYYY'),
        "email": "122@gmail.com",
        "status": "Active"
      },
    );
  }

  getAffiliatesOptions() {
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
      {
        "key": "status",
        "value": "Status",
      },
    ];
  }

  setFilteredValues(filteredValues) {
    this.filteredValues =  filteredValues;
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
