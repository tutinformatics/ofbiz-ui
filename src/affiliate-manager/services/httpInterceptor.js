import {Store} from "aurelia-store";
import {inject} from "aurelia-dependency-injection";
import {setError} from "../../store/store";

@inject(Store)
export class HttpInterceptor {

  constructor(store) {
    this.store = store;
    this.store.registerAction('setError', setError);
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
      } else {
        console.log(response);
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
    }
    return response;
  }

}
