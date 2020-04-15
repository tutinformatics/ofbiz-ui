import "./affGlobalSettings.scss"
import { bindable } from 'aurelia-framework';

export class affGlobalSettings {

  @bindable paymentFrequency;
  @bindable commissionPercent;
  @bindable multiLevelAff;
  @bindable codeInCookieDuration;
  possibleFrequency = ["Each month", "Each week", "Each year", "Each half-year"];
  possibleMultiLevel = ["available", "not available"];
  userGroups = ["affiliate-partners", "legacy-affiliate-partners"];
  globalSettings;


  saveSettings() {
    let newSettings = {
      "paymentFrequency": this.paymentFrequency,
      "commissionPercent": this.commissionPercent,
      "multiLevelAff": this.multiLevelAff === "available",
      "codeInCookieDuration": this.codeInCookieDuration
    };
  }


}
