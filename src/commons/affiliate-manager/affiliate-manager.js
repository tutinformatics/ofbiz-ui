export class AffiliateManager {
  constructor(ea) {
    this.sidebarIsOpen = false;
    this.navigatedTo = "About";
  }

  toggleSideBar() {
    this.sidebarIsOpen = !this.sidebarIsOpen;
  }

  navigateTo = (navigateNext) => {
    this.navigatedTo = navigateNext;
  }

}
