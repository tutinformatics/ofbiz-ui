import "./globalSettings.scss"
import { bindable, inject } from 'aurelia-framework';
import { AffManagerService } from "../../../services/affManagerService";

@inject(AffManagerService)
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
  productCategories;


  constructor(affManagerService) {
    this.affManagerService = affManagerService;
  }

  async attached() {
    console.log("here")
    this.fetchCategories()
  }

  async fetchCategories() {
    const responseData = await this.affManagerService.fetchAllProductCategories();
    const localProductCategories = [];
    if (responseData) {
      responseData
        .filter(category => category['categoryName'] !== null)
        .forEach(category => localProductCategories.push(
        {
          'categoryName': category['categoryName'],
          'commission': (Math.random() / 2).toFixed(2)
        }
        )
      );
    }
    this.productCategories = localProductCategories;
  }

  saveSettings() {
    let newSettings = {
      "paymentFrequency": this.paymentFrequency,
      "commissionPercent": this.commissionPercent,
      "multiLevelAff": this.multiLevelAff === "available",
      "codeInCookieDuration": this.codeInCookieDuration
    };
  }


}
