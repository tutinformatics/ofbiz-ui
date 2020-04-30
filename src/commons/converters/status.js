export class StatusValueConverter {
  toView(status) {
    switch (status) {
      case 'PTS_CREATED_AS':
        return 'ASSIGNED';
      case 'PTS_CREATED':
        return 'CREATED';
      default:
        return 'UNKNOWN';
    }
  }
}
