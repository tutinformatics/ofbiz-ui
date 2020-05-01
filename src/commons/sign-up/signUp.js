import "../assets/scss/general-login.scss"
import { inject } from "aurelia-framework";
import { AuthService } from "../services/authService";
import "./signUp.scss"
import { Router } from "aurelia-router";

@inject(AuthService, Router)
export class SignUp {

  userLoginId = '';
  password = '';
  repeatPassword = '';
  formError = false;

  constructor(authService, router) {
    this.authService = authService;
    this.router = router;
  }

  async signUp() {
    if (this.password !== '' && this.password === this.repeatPassword && this.userLoginId !== '') {
      const response = await this.authService.signUpRequest(this.userLoginId, this.password, this.repeatPassword);
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
