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
  }

  activate(parameters) {
    this.view = parameters.view
  }

  bind() {
    this.subscription = this.store.state.subscribe(
      (state) => this.state = state
    );
    this.authorizeMe();
  }


  unbind() {
    this.subscription.unsubscribe();
  }

  async authorizeMe() {
    if (this.view === 'admin') {
      this.authorized = 'ADMIN';
    } else if (this.view === 'member') {
      this.authorized = 'MEMBER';
    } else if (this.view === 'pending') {
      this.authorized = 'PENDING';
    } else if (this.state.userLoginId === 'null') {
      this.authorized = 'GUEST';
    } else {
      const pending = await this.affManagerService.pendingPartnersRequest();
      if (pending.includes(this.state.userLoginId)) {
        this.affiliateStatus = 'PENDING';
        this.authorized = 'PENDING'
      } else {
        const all = await this.affManagerService.allAffiliatesRequest();
        if (all.includes(this.state.userLoginId)) {
          this.authorized = 'MEMBER'
        } else {
          this.affiliateStatus = 'NONE';
          this.authorized = 'MEMBER'
        }
      }
    }
  }

}
