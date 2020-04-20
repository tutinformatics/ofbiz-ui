import { inject } from 'aurelia-framework';
import moment from "moment";
import { AffManagerService } from "../../../service/affManagerService";

@inject(AffManagerService)
export class partnerApprove {

  pendingPartners = [];
  filteredValues = [];

  constructor(affManagerService) {
    this.affManagerService = affManagerService;
    this.affApproveFilterOptions = this.getAffApproveFilterOptions();
    this.fetchPendingPartners();
  }

  async fetchPendingPartners() {
    const responseData = await this.affManagerService.pendingPartnersRequest();
    responseData.forEach(candidate =>
      this.pendingPartners.push(
        this.parseCandidate(candidate)
      )
    );
    this.filteredValues = this.pendingPartners;
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
      "firstName": candidate['firstName'],
      "lastName": candidate['lastName'],
      "dateTimeCreated": parsedDate? moment(parsedDate).format('MM-D-YYYY'): 'Date is missing',
      "email": `${candidate['firstName']}@gmail.com`,
      "partyId": candidate['partyId'],
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
