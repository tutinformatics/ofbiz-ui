import './styles/scss/affiliate-manager.scss';

export class AffiliateManager {
  constructor(ea) {
    this.sidebarIsOpen = false;
    this.navigatedTo = "About";
  }

  toggleSideBar() {
    this.sidebarIsOpen = !this.sidebarIsOpen;
  }

  navigateTo(navigateNext) {
    console.log(navigateNext);
    this.navigatedTo = navigateNext;
  }

}
