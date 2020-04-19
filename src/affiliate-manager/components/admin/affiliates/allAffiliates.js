import "./allAffiliates.scss"
import { bindable, inject } from 'aurelia-framework';
import { HttpClient } from "aurelia-fetch-client";
import moment from 'moment';

@inject(HttpClient)
export class allAffiliates {

  @bindable selectedFilter;
  @bindable modifyUser;
  filteredValues = [];
  affiliatePartners;
  allKeys;

  constructor(httpClient) {
    this.httpClient = httpClient;
    this.affiliatePartners = [];
    this.allKeys = this.getKeys();
    this.filteredValues = this.affiliatePartners.slice();
    this.fetchAffiliatePartners();
  }

  async fetchAffiliatePartners() {
    const response = await this.httpClient.fetch("http://localhost:4567/api/parties/unconfirmedAffiliates");
    const responseData = await response.json();
    responseData.forEach(partner =>
      this.affiliatePartners.push(
        this.parsePartner(partner)
      )
    );
    this.affiliatePartners.push(
      {
        "firstName": "Nikita",
        "lastName": "Ojamae",
        "dateTimeCreated": "15-03-2020",
        "email": "122@gmail.com",
        "status": "active"
      },
      {
        "firstName": "Alexei",
        "lastName": "Tsop",
        "dateTimeCreated": "04-04-2020",
        "email": "Alex@gmail.com",
        "status": "active"
      }
    );
  }

  getKeys() {
    return this.affiliatePartners.length > 0 ? Object.keys(this.affiliatePartners[0]) : [];
  }

  getFilteredValues(filterInput) {
    this.filteredValues = this.selectedFilter == null || filterInput === "" ?
      this.affiliatePartners.slice() : this.filteredValues.filter(partner => String(partner[this.selectedFilter]).toLowerCase().startsWith(filterInput.toLowerCase()));
  }

  managePartner(userEmail) {
    this.router.navigateToRoute('aff-partner', {"email": userEmail})
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
