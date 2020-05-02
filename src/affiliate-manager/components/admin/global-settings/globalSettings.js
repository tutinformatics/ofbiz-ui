import "./globalSettings.scss"
import { bindable } from 'aurelia-framework';

export class GlobalSettings {

  @bindable paymentFrequency;
  @bindable commissionPercent;
  @bindable multiLevelAff;
  @bindable userGroup;
  @bindable codeInCookieDuration;
  possibleFrequency = ["Each month", "Each week", "Each year", "Each half-year"];
  possibleMultiLevel = ["available", "not available"];
  userGroups = ["affiliate-partners", "legacy-affiliate-partners"];
  globalSettings;
  productCategories = [
    {
      "category": "Smart Devices",
      "currentCommission": 0.5,
    },
    {
      "category": "Services",
      "currentCommission": 1.5,
    },
    {
      "category": "Clothes",
      "currentCommission": 0.3,
    },
  ];


  saveSettings() {
    let newSettings = {
      "paymentFrequency": this.paymentFrequency,
      "commissionPercent": this.commissionPercent,
      "multiLevelAff": this.multiLevelAff === "available",
      "codeInCookieDuration": this.codeInCookieDuration
    };
  }


}
