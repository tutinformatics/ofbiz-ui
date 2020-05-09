export class StatusBadgeValueConverter {
  toView(status) {
    switch (status) {
      case 'PRJ_ACTIVE':
      case 'PTS_CREATED_AS':
        return 'badge-success';
      case 'PTS_CREATED':
      case 'TIMESHEET_IN_PROCESS':
        return 'badge-secondary';
      default:
        return 'badge-light';
    }
  }
}
