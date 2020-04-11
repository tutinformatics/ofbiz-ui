import './affAdmin.scss';
import { bindable } from "aurelia-framework";

export class AffAdmin {
  @bindable currentPage = "Global-settings";
  @bindable isSidebarOpened = false;

}
