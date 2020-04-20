import { connectTo } from "aurelia-store";
import { pluck } from "rxjs/operators";
import { inject } from "aurelia-framework";
import { HttpClient } from "aurelia-fetch-client";
import { Router } from "aurelia-router";
import { setToken, setUserLoginId } from "../../../store/state";

@connectTo({
  target: 'currentState',
  selector: {
    userLoginId: (store) => store.state.pipe(pluck('userLoginId')),
  }
})
@inject(HttpClient, Router)
export class Navbar {

  logOut() {
    this.currentState.dispatch(setUserLoginId, null);
    this.currentState.dispatch(setToken, null);
  }

}
