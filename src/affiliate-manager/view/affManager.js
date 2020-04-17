export class AffManager {

  constructor() {
    this.view = null;
  }

  activate(params) {
    this.view = params.view;
  }

  isGuest() {
    return this.view === 'guest';
  }

  isMember() {
    return this.view === 'member';
  }

  isAdmin() {
    return this.view === 'admin';
  }

  isPendingMember() {
    return this.view === 'pending'
  }

}
