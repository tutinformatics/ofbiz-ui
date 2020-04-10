import './affAdmin.scss';
import { bindable } from "aurelia-framework";

export class AffAdmin {
  @bindable currentPage = "Affiliates";
  @bindable isSidebarOpened = false;

}
