import "./allAffiliates.scss"
import { inject } from 'aurelia-framework';
import moment from 'moment';
import { AffManagerService } from "../../../services/affManagerService";
import {SingleAffiliate} from '../../general/af-detailed-modal/singleAffiliate';
import {DialogService} from "aurelia-dialog";

@inject(DialogService, AffManagerService)
export class allAffiliates {

  filteredValues = [];
  allAffiliatePartners = [];
  allAffiliatesOptions;

  constructor(dialogService, affManagerService) {
    this.dialogService = dialogService;
    this.affManagerService = affManagerService;
    this.allAffiliatesOptions = this.getAffiliatesOptions();
    this.fetchAffiliatePartners();
  }

  async fetchAffiliatePartners() {
    const responseData = await this.affManagerService.allAffiliatesRequest();
    if (responseData) {
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
          "status": "ACTIVE"
        },
      );
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
    this.filteredValues =  filteredValues;
  }

  parsePartner(partner) {
    const parsedDate = new Date(partner["createdStamp"]);
    return {
      "firstName": partner['_toOne_Person']['firstName']? partner['_toOne_Person']['firstName']: 'Missing',
      "lastName": partner['_toOne_Person']['lastName']? partner['_toOne_Person']['lastName']: 'Missing',
      "dateTimeCreated": parsedDate? moment(parsedDate).format('MM-D-YYYY'): 'Date is missing',
      "email": partner['_toOne_Person']['firstName']? `${partner['_toOne_Person']['firstName']}@gmail.com`: 'Missing',
      "partyId": partner['partyId']? partner['partyId']: 'Missing',
      "status": partner['status']? partner['status']: 'Missing',
    }
  }

  manageAffiliate(partner) {
    const isAdmin = true;
    this.dialogService.open({
      viewModel: SingleAffiliate
      , model: {partner, isAdmin}
    });
  }
}
