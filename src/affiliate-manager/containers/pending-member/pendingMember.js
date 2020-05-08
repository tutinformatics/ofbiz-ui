import '../general/affGeneral.scss';
import { inject } from "aurelia-dependency-injection";
import { Store } from "aurelia-store";
import { AffManagerService } from "../../services/affManagerService";

@inject(Store, AffManagerService)
export class PendingMember {

  partnerStatus;

  constructor(store, affManagerService) {
    this.currentPage = 'Become-Partner';
    this.opened = false;
    this.store = store;
    this.affManagerService = affManagerService;
    this.subscription = this.store.state.subscribe(
      (state) => {
        this.state = state;
      }
    );
  }

  async attached() {
    await this.checkStatus();
  }

  unbind() {
    this.subscription.unsubscribe();
  }

  async checkStatus() {
    this.partnerStatus= await this.affManagerService.getAffiliateStatus(this.state.partyId)
  }

}
