import "./allAffiliates.scss"
import { inject } from 'aurelia-framework';
import moment from 'moment';
import { AffManagerService } from "../../../services/affManagerService";
import { SingleAffiliate } from '../../general/af-detailed-modal/singleAffiliate';
import { DialogService } from "aurelia-dialog";
import { safeGet, safeGetExtended } from "../../../../commons/util/utility";

@inject(DialogService, AffManagerService)
export class allAffiliates {

  filteredValues = [];
  allAffiliatePartners = [];
  allAffiliatesOptions;

  constructor(dialogService, affManagerService) {
    this.dialogService = dialogService;
    this.affManagerService = affManagerService;
    this.allAffiliatesOptions = this.getAffiliatesOptions();
  }

  async attached() {
    this.fetchAffiliatePartners();
  }

  async fetchAffiliatePartners() {
    const responseData = await this.affManagerService.allAffiliatesRequest();
    const localAllAffiliatePartners = [];
    if (responseData) {
      responseData.forEach(partner =>
        localAllAffiliatePartners.push(
          this.parsePartner(partner)
        )
      );
      this.allAffiliatePartners = localAllAffiliatePartners;
      this.filteredValues = this.allAffiliatePartners
    }
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
    this.filteredValues = filteredValues;
  }

  parsePartner(partner) {
    const parsedDate = new Date(partner["createdStamp"]);
    return {
      "firstName": safeGet(() => partner['_toOne_Person']['firstName'], 'Missing'),
      "lastName": safeGet(() => partner['_toOne_Person']['lastName'], 'Missing'),
      "dateTimeCreated": safeGetExtended(() => parsedDate, moment(parsedDate).format('MM-D-YYYY'), 'Missing'),
      "email": safeGetExtended(() => partner['_toOne_Person']['firstName'], `${partner['_toOne_Person']['firstName']}@email.com`, 'Missing'),
      "partyId": safeGet(() => partner['partyId'], 'Missing'),
      "status": safeGet(() => partner['status'], 'Missing'),
    }
  }

  manageAffiliate(partner) {
    const isAdmin = true;
    this.dialogService.open({
      viewModel: SingleAffiliate,
      model: {partner, isAdmin},
    }).whenClosed(response => {
      this.allAffiliatePartners = this.allAffiliatePartners.filter(partner => partner['partyId'] !== response.output);
      this.filteredValues = this.filteredValues.filter(partner => partner['partyId'] !== response.output);
    });
  }
}
