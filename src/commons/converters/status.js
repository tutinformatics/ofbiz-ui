import { convertStatus } from "../util/status-utils";

export class StatusValueConverter {
  toView(status) {
    return convertStatus(status);
  }
}
