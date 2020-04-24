import "../member-components.scss"
import moment from "moment";
import { DialogService } from "aurelia-dialog";
import { SingleAffiliate } from "./aff-detailed-view/singleAffiliate"
import { inject } from "aurelia-dependency-injection";
import { AffManagerService } from "../../../service/affManagerService";

@inject(DialogService, AffManagerService)
export class MyAffiliates {

  myAffiliatePartners = [];
  filteredAffiliatePartners = [];

  constructor(dialogService, affManagerService) {
    this.affManagerService = affManagerService;
    this.dialogService = dialogService;
    this.myAffiliatesOption = this.getMyAffiliateOptions();
    this.getMyAffiliatePartners();
  }

  getMyAffiliateOptions() {
    return [
      {
        "key": 'firstName',
        "value": 'First name',
      },
      {
        "key": 'lastName',
        "value": 'Last name',
      },
      {
        "key": 'email',
        "value": 'Email',
      },
      {
        "key": 'dateTimeCreated',
        "value": 'Date',
      },
      {
        "key": 'status',
        "value": 'Status',
      },
    ];
  }

  async getMyAffiliatePartners() {
    // const response = await this.affManagerService.myAffiliatesRequest();
    // if (response.ok) {
    //   response.json().then((response) => {
    //       response['subAffiliates'].forEach(partner => this.myAffiliatePartners.push(
    //         this.parsePartner(partner)
    //         )
    //       )
    //     }
    //   )
    // }
    this.myAffiliatePartners.push({
      "dateTimeCreated": '03.04.2020',
      "firstName": "Alex",
      "lastName": "Groom",
      "email": 'ag@gmail.com',
      "status": 'Active'
    });
    this.filteredAffiliatePartners = this.myAffiliatePartners;
  }

  setFilteredAffiliatePartners(filteredValues) {
    this.filteredAffiliatePartners = filteredValues;
  }

  parsePartner(partner) {
    const parsedDate = new Date(partner["date"]);
    return {
      "dateTimeCreated": moment(parsedDate).format('MM-D-YYYY'),
      "firstName": partner['firstName'],
      "lastName": partner['lastName'],
      "email": partner['email']? partner['email']: 'missing',
      "status": partner['status']
    }
  }


  detailedView(partner) {
    this.dialogService.open({
      viewModel: SingleAffiliate
      , model: partner
    })
  }
}

