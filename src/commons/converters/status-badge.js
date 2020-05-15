import { getStatusBadge } from "../util/status-utils";

export class StatusBadgeValueConverter {
  toView(status) {
    return getStatusBadge(status);
  }
}
