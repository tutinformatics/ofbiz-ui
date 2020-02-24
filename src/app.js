  import {PLATFORM} from 'aurelia-pal';

export class App {

    configureRouter(config, router){
      config.title = 'Ofbiz-frontend';
      config.map([
        { route: '',              moduleId: PLATFORM.moduleName('no-selection'),   title: 'Select' },
        { route: 'contacts/:navbar',  moduleId: PLATFORM.moduleName('navbar-searchbar'), name:'navbar' }
      ]);

      this.router = router;
    }
  }
