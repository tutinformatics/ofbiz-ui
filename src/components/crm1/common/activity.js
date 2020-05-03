import {inject} from "aurelia-dependency-injection";
import {EventAggregator} from "aurelia-event-aggregator";

@inject(EventAggregator)
export class Activity {

  constructor(ea) {
    this.activity="none";
    this.ea = ea;
    this.ea.subscribe("changeAction", payload => {
      this.activity = payload.name;
    })
  }

  closeActivity() {
    this.ea.publish("displayActivity", false);
  }
}
