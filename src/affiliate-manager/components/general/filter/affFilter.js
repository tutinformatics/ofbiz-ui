import { bindable } from "aurelia-templating";

export class AffFilter {

  @bindable options = [
    {
      "key": 'first-name',
      "value": 'By first name',
    },
    {
      "key": 'last-name',
      "value": 'By last name',
    },
    {
      "key": 'email',
      "value": 'By email',
    },
    {
      "key": 'date',
      "value": 'By date',
    },
    {
      "key": 'status',
      "value": 'By status',
    },
    {
      "key": null,
      "value": 'Choose how to filter partners',
    },
  ];
  @bindable id;
  @bindable prependText;
  @bindable selected;

}
