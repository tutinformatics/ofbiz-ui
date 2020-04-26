import "../assets/scss/general-login.scss"
import { inject } from "aurelia-framework";
import { LoginService } from "../login/loginService";
import "./login.scss"
import { Router } from "aurelia-router";

@inject(LoginService, Router)
export class SignUp {

  userLoginId = '';
  password = '';
  repeatPassword = '';
  formError = false;

  constructor(loginService, router) {
    this.loginService = loginService;
    this.router = router;
  }

  async signUp() {
    if (this.password !== '' && this.password === this.repeatPassword && this.userLoginId !== '') {
      const response = await this.loginService.signUpRequest(this.userLoginId, this.password, this.repeatPassword);
      if (response) {
        this.router.navigate("#/login")
      } else {
        this.formError = true
      }
    } else {
      this.formError = true;
    }
  }

}
