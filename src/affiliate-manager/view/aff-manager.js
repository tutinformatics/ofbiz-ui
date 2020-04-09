import '../containers/guest/affGuest.scss';

export class AffManager {

  isGuest() {
    return false;
  }

  isMember() {
    return false;
  }

  isAdmin() {
    return true;
  }

}
