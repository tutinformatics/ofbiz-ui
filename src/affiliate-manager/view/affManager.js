import { Store } from "aurelia-store";
import { inject } from "aurelia-dependency-injection";
import { AffManagerService } from "../service/affManagerService";

@inject(AffManagerService, Store)
export class AffManager {

  affiliateStatus = null;
  authorized = null;

  constructor(affManagerService, store) {
    this.affManagerService = affManagerService;
    this.view = null;
    this.store = store;
    this.subscription = this.store.state.subscribe(
      (state) => this.state = state
    );
    this.authorizeMe();
  }

  unbind() {
    this.subscription.unsubscribe();
  }

  activate(parameters) {
    this.view = parameters.view
  }

  async authorizeMe() {
    await this.affManagerService.getPartyId();
    if (this.view === 'admin' || this.state['userLoginId'] === 'admin') {
      this.authorized = 'ADMIN';
    } else if (this.view === 'member') {
      this.authorized = 'MEMBER';
    } else if (this.view === 'pending') {
      this.authorized = 'PENDING';
    } else if (this.state.userLoginId === 'null') {
      this.authorized = 'GUEST';
    } else {
      let pending = await this.affManagerService.pendingPartnersRequest();
      if (!pending) {
        pending = []
      }
      const isPending = pending.filter(partner => partner.partyId === this.state.partyId);
      if (isPending.length > 0) {
        this.affiliateStatus = 'PENDING';
        this.authorized = 'PENDING'
      } else {
        const all = await this.affManagerService.allAffiliatesRequest();
        const isMember = all.filter(partner => partner.partyId === this.state.partyId);
        if (isMember.length > 0) {
          this.authorized = 'MEMBER'
        } else {
          this.affiliateStatus = 'NONE';
          this.authorized = 'PENDING'
        }
      }
    }
  }

}
