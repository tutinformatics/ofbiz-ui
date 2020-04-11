import 'regenerator-runtime/runtime';
import * as environment from '../config/environment.json';
import { PLATFORM } from 'aurelia-pal';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';
import '@progress/kendo-ui/js/kendo.all';
import '@progress/kendo-ui/css/web/kendo.common.min.css';
import '@progress/kendo-ui/css/web/kendo.bootstrap.min.css';


export function configure(aurelia) {
  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-fontawesome'));

  // aurelia.use
  //   .standardConfiguration()
  //   .developmentLogging()
  //   .plugin('au-table');

  aurelia.use
    .developmentLogging(environment.debug ? 'debug' : 'warn');

  aurelia.use
    .plugin(PLATFORM.moduleName('bcx-aurelia-reorderable-repeat'));

  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-kendoui-bridge'))
    .developmentLogging();



  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));

  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
