import { customElement, bindable } from 'aurelia-framework';
import { faCalendarAlt, faListAlt, faAddressBook, faIndustry, faFileInvoice, faPoll, faMagic, faFax, faCalculator } from '@fortawesome/free-solid-svg-icons';

@customElement('button-icon')
export class ButtonIcon {
  @bindable elemName = '';

  assetPath = '/icons/';
  svgFile = '.svg';
  active = '';
  colors = 'gray';
  faIcon;

  constructor(elemName) {
    this.element = {
      active: ''
    };
    this.iconController(elemName);
  }

  mouseOver() {
    this.colors = 'blue';
    this.element.active = '-active';
  }

  mouseOut() {
    this.colors = 'gray';
    this.element.active = '';
  }

  elemNameChanged() {
    this.iconController();
  }

  iconController() {
    switch (this.elemName){
      case "project":
        this.faIcon = faListAlt;
      case "crm":
        this.faIcon = faFax;
      case "accounting":
        this.faIcon = faCalculator;
      case "contacts":
        this.faIcon = faAddressBook;
      case "manufacturing":
        this.faIcon = faIndustry;
      case "sfa":
        this.faIcon = faMagic;
      case "marketing":
        this.faIcon = faPoll;
      case "invoicing":
        this.faIcon = faFileInvoice;
    }
  }
}
