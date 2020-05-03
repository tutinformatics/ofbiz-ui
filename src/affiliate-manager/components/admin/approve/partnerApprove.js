import { inject } from 'aurelia-framework';
import moment from "moment";
import { AffManagerService } from "../../../services/affManagerService";
import { safeGet, safeGetExtended } from "../../../../commons/util/utility";

@inject(AffManagerService)
export class partnerApprove {

  pendingPartners = [];
  filteredValues = [];

  constructor(affManagerService) {
    this.affManagerService = affManagerService;
    this.affApproveFilterOptions = this.getAffApproveFilterOptions();
  }

  async attached() {
    this.fetchPendingPartners();
  }

  async fetchPendingPartners() {
    const responseData = await this.affManagerService.pendingPartnersRequest();
    const localPendingPartners = [];
    if (responseData) {
      responseData.forEach(candidate =>
        localPendingPartners.push(
          this.parseCandidate(candidate)
        )
      );
      this.pendingPartners = localPendingPartners;
      this.filteredValues = this.pendingPartners;
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
      "firstName": safeGet(() => candidate['_toOne_Person']['firstName'], 'Missing'),
      "lastName": safeGet(() => candidate['_toOne_Person']['lastName'], 'Missing'),
      "dateTimeCreated": safeGetExtended(() => parsedDate, moment(parsedDate).format('MM-D-YYYY'), 'Missing'),
      "email": safeGet(() => candidate['_toOne_Person']['firstName'], `${candidate['_toOne_Person']['firstName']}@email.com`, 'Missing'),
      "partyId": safeGet(() => candidate['partyId'], 'Missing'),
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
