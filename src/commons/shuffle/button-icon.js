import { customElement, bindable } from 'aurelia-framework';
import {
  faCalendarAlt,
  faIndustry,
  faFileInvoice,
  faMagic,
  faFax,
  faCalculator,
  faAt,
  faIdCard
} from '@fortawesome/free-solid-svg-icons';

@customElement('button-icon')
export class ButtonIcon {
  @bindable elemName = '';

  colors = 'gray';
  bgColors = 'white';
  faIcon;

  mouseOver() {
    this.colors = '#1555bd';
    this.bgColors = '#c7d7f2';
  }

  mouseOut() {
    this.colors = 'gray';
    this.bgColors = 'white';
  }

  elemNameChanged() {
    this.iconController();
  }

  iconController() {
    switch (this.elemName) {
    case 'project':
      this.faIcon = faCalendarAlt;
      break;
    case 'crm':
      this.faIcon = faFax;
      break;
    case 'accounting':
      this.faIcon = faCalculator;
      break;
    case 'contacts':
      this.faIcon = faIdCard;
      break;
    case 'manufacturing':
      this.faIcon = faIndustry;
      break;
    case 'sfa':
      this.faIcon = faMagic;
      break;
    case 'marketing':
      this.faIcon = faAt;
      break;
    case 'invoicing':
      this.faIcon = faFileInvoice;
      break;
    default:
      undefined;
    }
  }
}
