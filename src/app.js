import { PLATFORM } from 'aurelia-pal';
import { inject } from 'aurelia-dependency-injection';
import { Store } from 'aurelia-store';
import { observable } from 'aurelia-binding';
import { HttpService } from './commons/services/httpService';

@inject(Store, HttpService)
export class App {
  @observable error;
  showError;

  constructor(store) {
    this.store = store;
    this.subscription = this.store.state.subscribe(
      (state) => {
        this.error = state.error;
      }
    );
  }

  errorChanged(newErrorState) {
    this.showError = !!newErrorState.errorMessage;
  }

  unbind() {
    this.subscription.unsubscribe();
  }

  configureRouter(config, router) {
    config.title = 'Ofbiz UI';
    config.options.pushState = true;
    config.options.root = '/';
    config.map([
      {
        route: '',
        name: 'login-page',
        moduleId: PLATFORM.moduleName('commons/login/login')
      },
      {
        route: 'select',
        moduleId: PLATFORM.moduleName('no-selection'),
        title: 'Select'
      },
      {
        route: 'kanban',
        moduleId: PLATFORM.moduleName('commons/kanban/kanban'),
        name: 'kanban'
      },
      {
        route: 'object-dist',
        moduleId: PLATFORM.moduleName('objektide_levi/object-dist/object-dist'),
        name: 'object-dist',
        title: 'Object Distribution'
      },
      {
        route: 'sfa',
        moduleId: PLATFORM.moduleName('sfa/sfa'),
        name: 'sfa',
        title: 'Salesforce Automation'
      },
      {
        route: 'project',
        moduleId: PLATFORM.moduleName('project/project'),
        name: 'project',
        title: 'Project Management'
      },
      {
        route: 'affiliate-manager',
        name: 'affiliate-manager',
        moduleId: PLATFORM.moduleName('affiliate-manager/view/affManager'),
        title: 'Affiliate Marketing'
      },
      {
        route: 'sign-up',
        name: 'sign-up page',
        moduleId: PLATFORM.moduleName('commons/sign-up/signUp')
      },
      {
        route: 'crm',
        moduleId: PLATFORM.moduleName('./components/crm1/baseui/baseui'),
        name: 'crm',
        title: 'Customer Relations'
      },
      {
        route: 'marketdata',
        moduleId: PLATFORM.moduleName('marketdata/marketdata'),
        name: 'marketdata',
        title: 'Marketdata'
      }
    ]);
    this.router = router;
  }
}
