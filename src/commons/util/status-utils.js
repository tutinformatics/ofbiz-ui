export function convertStatus(status) {
    switch (status) {
      case 'PTS_CREATED_AS':
        return 'ASSIGNED';
      case 'PTS_CREATED':
        return 'CREATED';
      case 'TIMESHEET_IN_PROCESS':
        return 'IN PROGRESS';
      case 'PRJ_ACTIVE':
        return 'ACTIVE';
      case 'PAS_ASSIGNED':
        return 'ASSIGNED';
      case 'PTS_COMPLETED':
        return 'COMPLETED';
      default:
        return 'UNKNOWN';
    }
}

export function getStatusBadge(status) {
    switch (status) {
      case 'PRJ_ACTIVE':
      case 'PAS_ASSIGNED':
      case 'PTS_CREATED_AS':
        return 'badge-success';
      case 'PTS_CREATED':
        return 'badge-info';
      case 'TIMESHEET_IN_PROCESS':
        return 'badge-secondary';
      case 'PTS_COMPLETED':
        return 'badge-dark';
      default:
        return 'badge-light';
    }
}