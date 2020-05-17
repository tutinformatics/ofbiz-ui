import { bindable } from "aurelia-templating";
import "./alert.scss"

export class Alert {

  @bindable isError;
  @bindable alertType;
  @bindable message;

  setError = (value) => {
    this.isError = value;
  };

  attached() {
    if (this.message) {
      this.message = this.message.substring(0, 20) + "..."
    }
  }

}
