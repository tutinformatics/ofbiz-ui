import "../member-components.scss"
import moment from "moment";
import { DialogService } from "aurelia-dialog";
import { SingleAffiliate } from '../../general/af-detailed-modal/singleAffiliate';
import { inject } from "aurelia-dependency-injection";
import { AffManagerService } from "../../../services/affManagerService";

@inject(DialogService, AffManagerService)
export class MyAffiliates {

  myAffiliatePartners = [];
  filteredAffiliatePartners = [];

  constructor(dialogService, affManagerService) {
    this.affManagerService = affManagerService;
    this.dialogService = dialogService;
    this.myAffiliatesOption = this.getMyAffiliateOptions();
  }

  async attached() {
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
    const response = await this.affManagerService.myAffiliatesRequest();
    const localMyAffiliatePartners = [];
    if (response.ok) {
      response.json().then((response) => {
          if (response['_toOne_Affiliate']) {
            response['_toOne_Affiliate'].forEach(partner => localMyAffiliatePartners.push(
              this.parsePartner(partner)
              )
            )
          }
        }
      )
    }
    this.myAffiliatePartners = localMyAffiliatePartners;
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
    const isAdmin = false;
    this.dialogService.open({
      viewModel: SingleAffiliate
      , model: {partner, isAdmin}
    });
  }
}

