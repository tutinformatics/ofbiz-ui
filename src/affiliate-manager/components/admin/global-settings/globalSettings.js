import "./globalSettings.scss"
import {bindable, inject} from 'aurelia-framework';
import {AffManagerService} from "../../../services/affManagerService";

@inject(AffManagerService)
export class GlobalSettings {

  @bindable paymentFrequency;
  @bindable multiLevelAff;
  @bindable codeInCookieDuration;
  @bindable alert;
  possibleFrequency = ["Each month", "Each week", "Each year", "Each half-year"];
  possibleFrequencyDays = {"Each month": 30, "Each week": 7, "Each year": 365, "Each half-year": 180};
  possibleMultiLevel = ["available", "not available"];
  globalSettings;
  productCategories;
  discounts;


  constructor(affManagerService) {
    this.affManagerService = affManagerService;
  }

  async attached() {
    await this.fetchDiscounts();
    this.fetchCategories();
  }

  async saveDiscounts(partyId, newDiscount) {
    if (newDiscount && newDiscount >= 0 && newDiscount < 100) {
      await this.affManagerService.setAffiliateDiscount(partyId, newDiscount)
    }
  }

  async saveCommission(partyId, newCommission) {
    if (newCommission > 0 && newCommission < 100) {
      await this.affManagerService.setCommission(newCommission, partyId)
    }
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
            'productCategoryId': category['productCategoryId'],
            'commission': category['affiliateCommission'],
            'discount': this.discounts.find(d => d['productCategoryId'] === category['productCategoryId'])['discount'],
          }
          )
        );
    }
    this.productCategories = localProductCategories;
  }

  async saveGlobalSettings() {
    let newSettings = {
      "settingsType": "general",
      "commissionFrequency": this.possibleFrequencyDays[this.paymentFrequency],
      "multiLevelAffiliation": this.multiLevelAff === "available" ? "Y" : "N",
      "codeCookieDuration": this.codeInCookieDuration
    };
    const response = await this.affManagerService.setGlobalSettings(newSettings);
    if (response && response.ok) {
      this.alert = true;
    }
  }

  async fetchDiscounts() {
    const response = await this.affManagerService.getAffiliateDiscounts();
    const localDiscounts = [];
    if (response.ok) {
      const jsonData = await response.json();
      jsonData['discounts'].forEach(d => localDiscounts.push(d))
    }
    this.discounts = localDiscounts;
  }

}
