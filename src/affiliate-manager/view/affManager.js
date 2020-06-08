import { Store } from "aurelia-store";
import { inject } from "aurelia-dependency-injection";
import { AffManagerService } from "../services/affManagerService";
import { observable } from "aurelia-binding";
import { AureliaCookie } from "aurelia-cookie";
import { Router } from 'aurelia-router';


@inject(AffManagerService, Store, Router)
export class AffManager {

  @observable state;
  affiliateStatus = null;
  authorized = null;
  showError = false;

  constructor(affManagerService, store, router) {
    this.router = router;
    this.affManagerService = affManagerService;
    this.view = null;
    this.store = store;
    this.subscription = this.store.state.subscribe(
      (state) => this.state = state
    );

  }

  stateChanged(newState) {
    this.showError = !!newState.error.errorMessage;
  }

  unbind() {
    this.subscription.unsubscribe();
  }

  activate(parameters) {
    this.view = parameters.view;
    this.authorizeMe();
    if (parameters.affCode != null) {
      AureliaCookie.set('affCode', parameters.affCode, {
        expiry: 30240, path: '', domain: '', secure: false
      });
      this.router.navigate('/affiliate-manager');
    }
  }

  async authorizeMe() {
    if (this.state['userLoginId'] === null) {
      this.authorized = 'GUEST';
    } else {
      const partyId = await this.affManagerService.fetchPartyId();
      if (this.state['userLoginId'] === 'admin') {
        this.authorized = 'ADMIN';
      } else {
        const affStatus = await this.affManagerService.getAffiliateStatus(partyId);
        if (affStatus === 'PENDING') {
          this.affiliateStatus = 'PENDING';
          this.authorized = 'PENDING'
        } else if (affStatus === 'ACTIVE') {
          this.authorized = 'MEMBER'
        } else if (affStatus === 'NOT-PARTNER') {
          this.affiliateStatus = 'NOT-PARTNER';
          this.authorized = 'PENDING'
        } else if (affStatus === 'DECLINED') {
          this.affiliateStatus = 'DECLINED';
          this.authorized = 'PENDING'
        }
      }
    }
  }

  // offlineBackdoor() {
  //
  //   if (this.view === 'admin') {
  //     this.authorized = 'ADMIN';
  //     return true;
  //   } else if (this.view === 'member') {
  //     this.authorized = 'MEMBER';
  //     return true;
  //   } else if (this.view === 'pending') {
  //     this.authorized = 'PENDING';
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }


}
