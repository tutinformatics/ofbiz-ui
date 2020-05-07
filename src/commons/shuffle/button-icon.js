import { customElement, bindable } from 'aurelia-framework';
import {
  faCalendarAlt,
  faListAlt,
  faAddressBook,
  faIndustry,
  faFileInvoice,
  faPoll,
  faMagic,
  faFax,
  faCalculator
} from '@fortawesome/free-solid-svg-icons';

@customElement('button-icon')
export class ButtonIcon {
  @bindable elemName = '';

  assetPath = '/icons/';
  svgFile = '.svg';
  active = '';
  colors = 'gray';
  bgColors = 'white';
  faIcon;

  constructor() {
    // this.element = {
    //   active: ''
    // };
  }

  mouseOver() {
    this.colors = '#1555bd';
    this.bgColors = '#c7d7f2';
    // this.element.active = '-active';
  }

  mouseOut() {
    this.colors = 'gray';
    this.bgColors = 'white';
    // this.element.active = '';
  }

  elemNameChanged() {
    this.iconController();
  }

  iconController() {
    switch (this.elemName) {
    case 'project':
      this.faIcon = faListAlt;
      break;
    case 'crm':
      this.faIcon = faFax;
      break;
    case 'accounting':
      this.faIcon = faCalculator;
      break;
    case 'contacts':
      this.faIcon = faAddressBook;
      break;
    case 'manufacturing':
      this.faIcon = faIndustry;
      break;
    case 'sfa':
      this.faIcon = faMagic;
      break;
    case 'marketing':
      this.faIcon = faPoll;
      break;
    case 'invoicing':
      this.faIcon = faFileInvoice;
      break;
    }
  }
}
