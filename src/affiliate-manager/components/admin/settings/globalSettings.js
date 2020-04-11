import "./globalSettings.scss"
import { bindable } from 'aurelia-framework';

export class globalSettings {

  @bindable paymentFrequency;
  @bindable commissionPercent;
  @bindable multiLevelAff;
  @bindable codeInCookieDuration;
  possibleFrequency = ["Each month", "Each week", "Each year", "Each half-year"];
  possibleMultiLevel = ["available", "not available"]






}
