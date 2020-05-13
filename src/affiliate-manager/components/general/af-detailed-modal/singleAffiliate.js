import {DialogController} from 'aurelia-dialog';
import {inject} from 'aurelia-framework';
import './singleAffiliate.scss';
import '../../../assets/scss/modal.scss';
import {AffManagerService} from "../../../services/affManagerService";

@inject(DialogController, AffManagerService)
export class SingleAffiliate {

  partner;
  isAdmin;

  constructor(dialogController, affManagerService) {
    this.controller = dialogController;
    this.affManagerService = affManagerService;
  }


  activate(data) {
    this.isAdmin = data['isAdmin'];
    this.partner = data['partner'];
    this.getMoreInf(this.partner);
  }

  getMoreInf(partner) {
    partner['commission'] = 24;
    partner['date'] = '22/03/2020';
    partner['affiliate_codes'] = 2;
    partner['sub_affiliates'] = 5;
  }

  async disableAffiliate(partyId) {
    const response = await this.affManagerService.disableAffiliate(partyId);
    if (response.ok) {
      this.controller.ok(partyId);
    }
  }
}
