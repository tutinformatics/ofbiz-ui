import "./becomePartner.scss"
import { inject } from 'aurelia-framework';
import { bindable } from "aurelia-templating";
import { AffManagerService } from "../../../services/affManagerService";

@inject(AffManagerService)
export class BecomePartner {

  @bindable guest;
  becomePartnerSuccess;

  constructor(affManagerService) {
    this.affManagerService = affManagerService;
  }

  async becomeAffPartner() {
    const response = await this.affManagerService.becomeAffPartner();
    if (response && response.ok) {
      this.setBecomePartnerSuccess(true);
    }
  }

  setBecomePartnerSuccess(value) {
    this.becomePartnerSuccess = value;
  }

}
