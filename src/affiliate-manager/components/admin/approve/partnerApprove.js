import { inject } from 'aurelia-framework';
import moment from "moment";
import { AffManagerService } from "../../../service/affManagerService";

@inject(AffManagerService)
export class partnerApprove {

  pendingPartners = [];
  filteredValues = [];
  networkError;

  constructor(affManagerService) {
    this.affManagerService = affManagerService;
    this.affApproveFilterOptions = this.getAffApproveFilterOptions();
    this.fetchPendingPartners();
  }

  async fetchPendingPartners() {
    const responseData = await this.affManagerService.pendingPartnersRequest();
    if (responseData) {
      responseData.forEach(candidate =>
        this.pendingPartners.push(
          this.parseCandidate(candidate)
        )
      );
      this.filteredValues = this.pendingPartners;
    } else {
      this.networkError = true;
    }
  }

  async approve(index, partyId) {
    const response = await this.affManagerService.approveRequest(partyId);
    if (response.ok) {
      this.pendingPartners.splice(index, 1);
    }
  }

  async disapprove(index, partyId) {
    const response = await this.affManagerService.disapproveRequest(partyId);
    if (response.ok) {
      this.pendingPartners.splice(index, 1);
    }
  }

  parseCandidate(candidate) {
    const parsedDate = candidate["createdStamp"]? new Date(candidate["createdStamp"]): null;
    return {
      "firstName": candidate['_toOne_Person']['firstName']? candidate['_toOne_Person']['firstName']: 'Missing',
      "lastName": candidate['_toOne_Person']['lastName']? candidate['_toOne_Person']['lastName']: 'Missing',
      "dateTimeCreated": parsedDate? moment(parsedDate).format('MM-D-YYYY'): 'Date is missing',
      "email": candidate['_toOne_Person']['firstName']? `${candidate['_toOne_Person']['firstName']}@gmail.com`: 'Missing',
      "partyId": candidate['partyId']? candidate['partyId']: 'Missing',
    }
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
