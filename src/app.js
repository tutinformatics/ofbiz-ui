import { PLATFORM } from 'aurelia-pal';
import { inject } from "aurelia-dependency-injection";
import { Store } from "aurelia-store";
import { observable } from "aurelia-binding";

@inject(Store)
export class App {

  @observable state;
  showError;

  constructor(store) {
    this.store = store;
    this.subscription = this.store.state.subscribe(
      (state) => {
        this.state = state;
      }
    );
  }

  stateChanged(newState) {
    this.showError = !!newState.error.errorMessage;
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
        route: 'object-dist/publisher',
        moduleId: PLATFORM.moduleName('objektide_levi/publisher/publisher'),
        name: 'publisher'
      },
      {
        route: 'object-dist',
        moduleId: PLATFORM.moduleName('objektide_levi/object-dist/object-dist'),
        name: 'object-dist'
      },
      {
        route: 'crm/agents',
        moduleId: PLATFORM.moduleName('crm/agents/agents'),
        name: 'agents'
      },
      {
        route: 'crm/pipeline',
        moduleId: PLATFORM.moduleName('./crm/pipeline/pipeline'),
        name: 'pipeline'
      },
      {
        route: 'crm/opportunities',
        moduleId: PLATFORM.moduleName('./crm/opportunities/opportunities'),
        name: 'opportunities'
      },
      {
        route: 'project',
        moduleId: PLATFORM.moduleName('project/project'),
        name: 'project',
        title: 'Projects'
      },
      {
        route: 'affiliate-manager',
        name: 'affiliate-manager',
        moduleId: PLATFORM.moduleName('affiliate-manager/view/affManager'),
      },
      {
        route: 'sign-up',
        name: 'sign-up page',
        moduleId: PLATFORM.moduleName('commons/sign-up/signUp')
      },
    ]);
    this.router = router;
  }
}
