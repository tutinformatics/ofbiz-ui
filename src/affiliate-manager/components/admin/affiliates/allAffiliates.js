import "./allAffiliates.scss"
import { inject } from 'aurelia-framework';
import moment from 'moment';
import { AffManagerService } from "../../../service/affManagerService";

@inject(AffManagerService)
export class allAffiliates {

  filteredValues = [];
  allAffiliatePartners = [];
  allAffiliatesOptions;

  constructor(affManagerService) {
    this.affManagerService = affManagerService;
    this.allAffiliatesOptions = this.getAffiliatesOptions();
    this.fetchAffiliatePartners();
  }

  async fetchAffiliatePartners() {
    const responseData = await this.affManagerService.allAffiliatesRequest();
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
    this.filteredValues = this.allAffiliatePartners
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
