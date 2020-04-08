import '../containers/guest/affGuest.scss';

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
