export class StatusValueConverter {
  toView(status) {
    switch (status) {
    case 'PTS_CREATED_AS':
      return 'Assigned';
    case 'PTS_CREATED':
      return 'Created';
    default:
      return 'Unknown';
    }
  }
}
