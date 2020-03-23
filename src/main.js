// regenerator-runtime is to support async/await syntax in ESNext.
// If you don't use async/await, you can remove regenerator-runtime.
import 'regenerator-runtime/runtime';
import * as environment from '../config/environment.json';
import {PLATFORM} from 'aurelia-pal';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.css';
import 'font-awesome/css/font-awesome.css';


export function configure(aurelia) {


  aurelia.use
    .standardConfiguration()
    .plugin(PLATFORM.moduleName('aurelia-fontawesome'))
    .feature(PLATFORM.moduleName('resources/index'));

  aurelia.use.developmentLogging(environment.debug ? 'debug' : 'warn');

  aurelia.use.plugin(PLATFORM.moduleName('bcx-aurelia-reorderable-repeat'));

  if (environment.testing) {
    aurelia.use.plugin(PLATFORM.moduleName('aurelia-testing'));

  }

  aurelia.start().then(() => aurelia.setRoot(PLATFORM.moduleName('app')));
}
