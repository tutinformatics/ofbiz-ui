# `Aurelia Store`

Official documentation is not as good, as it could be, but it is better that nothing:
https://aurelia.io/docs/plugins/store#introduction

All the configuration is done by affiliate-marketing team, so you can just start using.

### Background:
We decided to add a global store in order to have a central place to store data that could be useful (or even mandatory) for more than couple components. As a result, you will never fall into the hell of props propagation (parent-children-...-children)

For example, we store userLoginId that is fetched from backend in case of successful authentication. You can access it from your components as well :)

### How to use:

1. Inject and register
    ```
    import { Store } from "aurelia-store";

    @inject(Store)
    export class MyComponent {

          constructor(router, store) {
            this.store = store;
          }

    }
    ```

2. subscribe to state and add life cycle hook (unsubscribe)
    ```
    constructor(store) {
        this.subscription = this.store.state.subscribe(
          (state) => this.state = state
        );
    }
    unbind() {
      this.subscription.unsubscribe();
    }
    ```

3. use this.state
    ```
    For example, we already have one defined store. You can find it in store/store.js.
    There you can find userLoginId. Therefore, you have acces to this property in your custom component as well.

    this.state.userLoginId

    ```

4. how to make a mutation?
    ```
    In store/store.js you can find function setUserLoginId(state, userLoginId).

    You need to register this mutation in your custom component as:

    @inject(Store)
    export class AnotherComponent {

      constructor(store) {
        this.store = store;
        this.store.registerAction('setUserLoginId', setUserLoginId);
      }

    now you can mutate userLoginId via setUserLoginId mutation

    this.store.dispatch('setUserLoginId', 'new value');

    ```

### Redux devtools (strongly advised):

This is already configured.
You only need to download redux devtools plugin for your browser.

Redux devtools allow to visualize state and mutations - can be useful for debug.

chrome:
https://chrome.google.com/webstore/detail/redux-devtools/lmhkpmbekcpmknklioeibfkpmmfibljd?hl=en

firefox:
https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/

