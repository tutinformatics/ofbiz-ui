import { Store } from "aurelia-store";
import { inject } from "aurelia-dependency-injection";
import { setError, reset } from "../../store/store";
import { Router } from "aurelia-router";

@inject(Store, Router)
export class HttpInterceptor {

  constructor(store, router) {
    this.router = router;
    this.store = store;
    this.store.registerAction('setError', setError);
    this.store.registerAction('reset', reset);
    this.subscription = this.store.state.subscribe(
      (state) => {
        this.token = state.jwtToken;
      }
    );
  }

  unbind() {
    this.subscription.unsubscribe();
  }

  request(request) {
    console.log(`Requesting ${request.method} ${request.url}`);
    request.headers.append('Authorization', `Bearer ${this.token}`);
    return request;
  }

  async response(response) {
    if (!response.ok) {
      if (response.status === 502) {
        this.store.dispatch('setError',
          {
            errorMessage: 'Unable to connect to server',
            statusCode: '502',
            statusDescription: 'Unable to connect to server'
          }
        );
      } else if ([401, 403].includes(response.status)) {
        this.store.dispatch('reset');
        this.router.navigate('/');
      } else {
        const responseClone = response.clone();
        const body = await responseClone.json();
        this.store.dispatch('setError',
          {
            errorMessage: body['errorMessage'],
            statusCode: body['statusCode'],
            statusDescription: body['statusDescription']
          }
        );
      }
    } else  {
      this.store.dispatch('setError',
        {
          errorMessage: null,
          statusCode: null,
          statusDescription: null
        }
      );
    }
    console.log(`Received ${response.status} ${response.url}`);
    return response;
  }

}
