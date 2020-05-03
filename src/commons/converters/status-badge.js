export class StatusBadgeValueConverter {
  toView(status) {
    switch (status) {
      case 'PTS_CREATED_AS':
        return 'badge-success';
      case 'PTS_CREATED':
        return 'badge-secondary';
      default:
        return 'badge-light';
    }
  }
}
