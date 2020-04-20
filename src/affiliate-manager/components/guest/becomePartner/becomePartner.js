import "./becomePartner.scss"
import { inject } from 'aurelia-framework';
import { bindable } from "aurelia-templating";
import { AffManagerService } from "../../../service/affManagerService";

@inject(AffManagerService)
export class BecomePartner {

  @bindable affStatus;

  constructor(affManagerService) {
    this.affManagerService = affManagerService;
    this.becomePartnerError = false;
    this.becomePartnerSuccess = false;
  }

  async becomeAffPartner() {
    const response = await this.affManagerService.becomeAffPartner();
    if (response.ok) {
      this.setBecomePartnerSuccess(true)
      this.affStatus = 'PENDING'
    } else {
      this.setBecomePartnerError(true);
    }
  }

  setBecomePartnerError(value) {
    this.becomePartnerError = value;
    console.log(this.becomePartnerError)
  }

  setBecomePartnerSuccess(value) {
    this.becomePartnerSuccess = value;
  }

}
