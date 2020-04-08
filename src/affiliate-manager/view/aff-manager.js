import '../assets/scss/affiliate-manager.scss';

export class AffManager {

  isGuest() {
    return true;
  }

  isMember() {
    return false;
  }

  isAdmin() {
    return false;
  }

}
