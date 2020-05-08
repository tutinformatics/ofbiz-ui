import { customElement, bindable } from 'aurelia-framework';
import {
  faCalendarAlt,
  faPoll,
  faFileInvoice,
  faMagic,
  faUsers,
  faCubes,
  faAt,
  faNetworkWired
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
      this.faIcon = faUsers;
      break;
    case 'cms':
      this.faIcon = faCubes;
      break;
    case 'marketdata':
      this.faIcon = faPoll;
      break;
    case 'sfa':
      this.faIcon = faMagic;
      break;
    case 'marketing':
      this.faIcon = faAt;
      break;
    case 'object dist':
      this.faIcon = faNetworkWired;
      break;
    default:
      this.faIcon = faFileInvoice;
    }
  }
}
