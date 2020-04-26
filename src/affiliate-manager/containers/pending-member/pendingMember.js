import '../general/affGeneral.scss';
import { bindable, inject } from 'aurelia-framework';
import { AffManagerService } from "../../service/affManagerService";

@inject(AffManagerService)
export class PendingMember {

  @bindable partnerStatus;

  constructor(affManagerService) {
    this.affManagerService = affManagerService;
    this.currentPage = 'Become-Partner';
    this.opened = false;
    this.getStatus()
  }

  async getStatus() {
    const response = await this.affManagerService.getStatusRequest();
    if (response.ok) {
      response.json().then((response) => {
          const unconfirmed = response.filter(
            partner => partner['partyId'] === "admin"
          );
          if (unconfirmed.length > 0) {
            this.partnerStatus = 'PENDING'
          }
        }
      )
    }
  }

}
