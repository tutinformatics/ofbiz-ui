import { bindable } from "aurelia-templating";
import { inject } from "aurelia-dependency-injection";
import { Store } from "aurelia-store";
import { AffManagerService } from "../../../../services/affManagerService";

@inject(Store, AffManagerService)
export class StatusPending  {

  @bindable partnerStatus;

  constructor(store, affManagerService) {
    this.store = store;
    this.affManagerService = affManagerService;
    this.subscription = this.store.state.subscribe(
      (state) => {
        this.state = state;
      }
    );
  }

  unbind() {
    this.subscription.unsubscribe();
  }

  async attached() {
    this.partnerStatus = await this.affManagerService.getAffiliateStatus(this.state.partyId)
  }

}
